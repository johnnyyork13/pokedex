const express = require('express');
const {fetchPokemon, fetchFail} = require('./modules.js');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/public', express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs', {pokeName: 'charmander'});
})

app.post('/', function(req, res){
    let pokeTextBox = req.body.pokeTextBox;
    let pokeData;
    const pokePromise = new Promise((resolve, reject) => {
        pokeData = fetchPokemon(pokeTextBox);

        if (pokeData !== undefined) {
            resolve(pokeData);
        } else {
            reject(err);
        }
    })
    pokePromise.then(res.render('index.ejs', {pokeName: pokeTextBox, 
    pokeImgSrc: pokeData.sprites.front_default})) 
    
    //res.render('index.ejs', {isEnglish: true});
})


// const cld = require('cld');
// cld.detect('This is a language recognition example').then((result) => {
//     console.log(result);
// });


app.listen(3000);