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
    .get('/', (req, res) => {
        res.send(JSON.stringify({'Hello World!' : "test"}))
    })
    .post('/postInitialData', (req,res) => {
        console.log('posting initial',req.body)
        UserData.create(req.body)
        .then((newDB) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            // res.json(database);
            res.send(req.body)
        }, (err) => console.log(err))
        .catch((err) => {console.log(err)});
    })
    .post('/updateUserData', (req,res) => {
        console.log(req.body);
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
                    "currentAppVersion" : req.body.currentAppVersion,
                },
            },
        )
        .then((returnObj) => {
            console.log('done',returnObj)
            res.send(req.body)
        })
        .catch((err) => console.log(err))
    })
    .get('/requestLevelUpdate', (req, res) => {
        console.log('requesting level update',req.body)

        reponseObj = {
            // updateLevels : true,
            // scaleLevel : "15.0",
            // appUnlocked : "1.0",
        }
        res.send(JSON.stringify(reponseObj))
    })
    .post('/setUserValues', (req,res) => {
        console.log(req.body.auth);
        let reponseObj = {
            success : false,
            dataUpdated : false,
        }
        res.send(JSON.stringify(reponseObj))
        return
        if (req.body.auth && req.body.auth === "test") {
            console.log('valid request')
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
                res.send(req.body)
            })
            .catch((err) => console.log(err))
            //"arpeggioLevel": 1.2, "appUnlocked": 0, "et_scales": 0.0, "et_chords": 0.0, "scaleLevel": 0.0, "intervalLevel": 0.0, "id": 54050868-48A9-4C24-A9DE-2294A37771B7
        } else {
            console.log('sending response')
            res.send(JSON.stringify(reponseObj))
        }
    })
    .delete('/deleteDB', (req,res) => {
        let reponseObj = {requestSuccess : false}
        if (req.body.auth && req.body.auth === 'borninlasvegasin1984') {
            UserData.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                reponseObj.requestSuccess = true;
                res.send(JSON.stringify(reponseObj));
            }, (err) => next(err))
            .catch((err) => next(err));    
        } else {
            res.send(JSON.stringify(reponseObj));
        }
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))