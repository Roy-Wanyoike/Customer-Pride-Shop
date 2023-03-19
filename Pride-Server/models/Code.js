const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const codeSchema = new Schema({
    skincode : {
        type:String,
        required: true
    },
    products : {
        type:Array,
        required:true
    },
    description : {
        type:String,
        default: "No description"
    },  

    
});
module.exports=mongoose.model('Code', codeSchema);