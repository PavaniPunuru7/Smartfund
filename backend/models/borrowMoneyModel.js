const mongoose=require("mongoose");

const borrowSchema=new mongoose.Schema({
    amount:{type:String,required:true},
    business:{type:String,required:true},
    period:{type:String,required:true},
    borrower:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"User"},
    

},{timestamps:true});

module.exports=mongoose.model("borrowMoney",borrowSchema);