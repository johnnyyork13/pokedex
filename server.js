const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/public', express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.post('/', (req, res) => {
    res.render('index.ejs', {isEnglish: false});
})



const cld = require('cld');
cld.detect('This is a language recognition example').then((result) => {
    console.log(result);
});


app.listen(3000);