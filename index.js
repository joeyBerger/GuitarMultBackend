const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const UserData = require('./UserData')
// const connection = "mongodb+srv://joeyBerger:CrowdControl1!@cluster0.sxuu9.mongodb.net/database?retryWrites=true&w=majority";
//mongoDBGuitarMultPass
const connection = "mongodb+srv://joeybergermusic:mongoDBGuitarMultPass@cluster0.p26xi.mongodb.net/database?retryWrites=true&w=majority";

mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => {
        console.log("Database Connected Successfully");
    })
    .catch(err => {
        console.log(err)
        useMongoDB = false;
    });


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
    .post('/updateUserData', (req,res) => {
        console.log(req.body)
        
    
        
        UserData.updateMany({
            "id": req.body.id
        },
            {$set:
                {
                    "scaleLevel": req.body.scaleLevel,
                    "arpeggioLevel" : req.body.arpeggioLevel,
                    "intervalLevel" : req.body.intervalLevel,
                    "et_scales" : req.body.et_scales,
                    "et_chords" : req.body.et_chords,
                    "appUnlocked" : req.body.appUnlocked,
                },
            },
        )
        .then((returnObj) => {
            // console.log('done',returnObj)
            res.send(req.body)
        })
        .catch((err) => console.log(err))



        // UserData.create(req.body)
        // .then((database) => {
        //     res.statusCode = 200;
        //     res.setHeader('Content-Type', 'application/json');
        //     // res.json(database);
        //     res.send(req.body)
        // }, (err) => console.log(err))
        // .catch((err) => {console.log(err)});


    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))





