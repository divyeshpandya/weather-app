const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const chalk = require('chalk')

const app = express()

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine & views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Divyesh'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About app',
        name: 'Divyesh'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title:'Welcome to the help page',
        name: 'Divyesh'
    })
})

app.get('/Weather', (req,res)=>{
    if(!req.query.location){
        return res.send({
            error: 'Location must be passed for which the weather details are required'
        })
    }

    geocode(req.query.location,(error, {latitude,longitude} = {})=>{
        if(error!==undefined){
            return res.send({
                message: error
            })
        } 
        
        forecast(latitude,longitude, (error, {message, temp, feellike}={}) => {
            if(error!==undefined) {
                return res.send({
                    message: error
                })
            } 
            res.send({
                message,
                temp,
                feellike,
                location: req.query.location
            })
        })
    })
})

// app.get('/help/*', (req,res)=>{
//     res.render('not-found',{
//         title:'404',
//         message: 'Help article not found',
//         name: 'Divyesh'
//     })
// })

app.get('*', (req,res)=>{
    res.render('not-found',{
        title:'404',
        message: 'Page not found',
        name: 'Divyesh'
    })
})


app.listen(3000, ()=> {
    console.log('Server is up & running on the port 3000.')
})