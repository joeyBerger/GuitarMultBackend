const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userData = new Schema({
    scaleLevel : {
        type: String,
        required: false,
    },
    arpeggioLevel : {
        type: String,
        required: false
    },
    intervalLevel : {
        type: String,
        required: false
    },
    et_scales : {
        type: String,
        required: false
    },
    et_chords : {
        type: String,
        required: false
    },
    appUnlocked : {
        type: String,
        required: false  
    },
    currentAppVersion : {
        type: String,
        required: false,
        default: '0.0',
    },
    id : {
        type: String,
        required: false
    },
    dataUpdate : {
        type: Boolean,
        required: false,
        default: false,
    }
})

module.exports = mongoose.model("UserData", userData, "userData")