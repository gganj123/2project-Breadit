require('dotenv').config();
const express =  require('express');
const path = require('path');
const mongoose = require('mongoose');
const app  = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(process.cwd(), 'public')));

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_DB_URI;


app.get('/', (req, res) => {
    res.send('hello express');
});

app.get('/api', (req, res) => {
    res.send('backend server');
});


mongoose.connect(MONGO_URI);
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log(' Connected to MongoDB')
})



// app.listen(port, () => console.log(`Server listening on port ${port}`));
app.listen(PORT, () => {
  console.log(`server listen ${PORT}`);
})

module.exports = app;
