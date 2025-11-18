-- إنشاء الجدول إذا لم يكن موجوداً
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  description TEXT,
  image TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- إضافة عمود image إذا لم يكن موجوداً
ALTER TABLE products ADD COLUMN IF NOT EXISTS image TEXT;
