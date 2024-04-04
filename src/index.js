const express =  require('express');
require('dotenv').config();
const path = require('path');
const app  = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(process.cwd(), 'public')));
var mongoose = require('mongoose');

app.get('/', (req, res) => {
    res.send('hello express');
});

app.get('/api', (req, res) => {
    res.send('backend server');
});

// const PORT = 3000;

// app.listen(PORT, () => {
//     console.log(`server listen ${PORT}`);
// })
// console.log(process.env.MONGO_DB_URI);  
const MONGO_URI = process.env.MONGO_DB_URI;
mongoose.connect(MONGO_URI)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log(' Connected to MongoDB')
})
app.listen(port, () => console.log(`Server listening on port ${port}`));

module.exports = app;
