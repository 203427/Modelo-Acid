const { Client } = require('pg');

const client = new Client({
  user: 'admin',
  host: 'localhost',
  database: 'lorapemo',
  password: 'safe-pass-123',
  port: 5432, 
});

await client.connect();

await client.query('BEGIN');

try {
  await client.query('INSERT INTO usuarios (nombre, correo) VALUES ($1, $2)', ['Juan', 'juan@ejemplo.com']);
  await client.query('UPDATE productos SET stock = stock - $1 WHERE id = $2', [1, 10]);

  await client.query('COMMIT');
} catch (error) {
  await client.query('ROLLBACK');
  console.error('Ha ocurrido un error:', error);
} finally {
  await client.end();
}