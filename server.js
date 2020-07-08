const express = require('express');
const connectDB = require('./config/db');
const app = express();


//connect database
connectDB();

//init Middleware
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => res.json({ msg: 'welcome to the contact keeper' }));

//Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
