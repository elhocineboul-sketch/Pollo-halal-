const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// اتصال بقاعدة البيانات
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// API: قراءة جميع المنتجات
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'خطأ في قراءة المنتجات' });
  }
});

// API: إضافة منتج جديد
app.post('/api/products', async (req, res) => {
  const { name, price, description } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({ error: 'الاسم والسعر مطلوبان' });
  }
  
  try {
    const result = await pool.query(
      'INSERT INTO products (name, price, description) VALUES ($1, $2, $3) RETURNING *',
      [name, price, description]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'خطأ في إضافة المنتج' });
  }
});

// API: حذف منتج
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.json({ message: 'تم الحذف بنجاح' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'خطأ في حذف المنتج' });
  }
});

// API: تحديث منتج
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  
  try {
    const result = await pool.query(
      'UPDATE products SET name = $1, price = $2, description = $3 WHERE id = $4 RETURNING *',
      [name, price, description, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'خطأ في تحديث المنتج' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
