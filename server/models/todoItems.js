//import mongoose to creae new Schema
const mongoose=require('mongoose');

//create Schema
const Schema=mongoose.Schema({
    item:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('Todo',Schema)