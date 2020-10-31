const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')

express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
    .get('/', (req, res) => {
        res.send(JSON.stringify({'Hello World!' : "test"}))
    })
    .post('/test', (req,res) => {
        console.log(req.body)
        // res.send(req.body)
        res.send(JSON.stringify({'test':'test'}))
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))