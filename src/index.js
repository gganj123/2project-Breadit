const express =  require('express');
const path = require('path');

const app  = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(process.cwd(), 'public')));


app.get('/', (req, res) => {
    res.send('hello express');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server listen ${PORT}`);
})