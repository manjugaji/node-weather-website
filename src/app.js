const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "weather app",
        name: "Manju Gaji"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Manju "
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "This is a help message",
        title: "Help",
        name: "Manju gaji"
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    } else{
        geocode(req.query.address, (error, {latitude, longitude, location} ={}) => {
            if(error){
                return res.send(error);
            } 
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send(error);
                }
                res.send({
                    forecast: forecastData, 
                    location,
                    address: req.query.address
                });
                
            });
        });
    }

});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Manju Gaji",
        errorMessage: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Manju Gaji",
        errorMessage: "Page not fund"
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port);
});
