import express from 'express';
import pg from 'pg';
import cors from 'cors';

const { Pool } = pg;
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// اتصال بقاعدة البيانات PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// إنشاء الجدول تلقائياً عند بدء السيرفر
const initDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        description TEXT,
        image TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Database initialized successfully');
  } catch (err) {
    console.error('❌ Error initializing database:', err);
  }
};

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error connecting to database:', err.stack);
  } else {
    console.log('✅ Connected to PostgreSQL database');
    release();
  }
});

// تشغيل الإنشاء التلقائي
initDatabase();

// ============ API Routes ============

// GET: قراءة جميع المنتجات
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'خطأ في قراءة المنتجات' });
  }
});

// GET: قراءة منتج واحد
app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'المنتج غير موجود' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'خطأ في قراءة المنتج' });
  }
});

// POST: إضافة منتج جديد
app.post('/api/products', async (req, res) => {
  const { name, price, description, image } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({ error: 'الاسم والسعر مطلوبان' });
  }
  
  try {
    const result = await pool.query(
      'INSERT INTO products (name, price, description, image) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, price, description || null, image || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ error: 'خطأ في إضافة المنتج' });
  }
});

// PUT: تحديث منتج
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image } = req.body;
  
  try {
    const result = await pool.query(
      'UPDATE products SET name = $1, price = $2, description = $3, image = $4 WHERE id = $5 RETURNING *',
      [name, price, description, image, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'المنتج غير موجود' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'خطأ في تحديث المنتج' });
  }
});

// DELETE: حذف منتج
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(
      'DELETE FROM products WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'المنتج غير موجود' });
    }
    
    res.json({ message: 'تم حذف المنتج بنجاح', product: result.rows[0] });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'خطأ في حذف المنتج' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
