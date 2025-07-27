const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

app.post('/api/contact', (req, res) => {
  const { name, email, phone, service, message } = req.body;
  const query = 'INSERT INTO contact_requests (name, email, phone, service, message) VALUES (?, ?, ?, ?, ?)';
  
  db.query(query, [name, email, phone, service, message], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Database error: ' + error.message });
    }
    res.status(200).json({ message: 'Message sent successfully!' });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
