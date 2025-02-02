const mongoose=require("mongoose");

const lendSchema=new mongoose.Schema({
    amount:{type:String,trim:true,required:true},
    interest:{type:String,trim:true,required:true},
    period:{type:String,trim:true,required:true},
    emi:{type:String,trim:true,required:true},
    lender:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
},
    {timestamps:true}
);

module.exports=mongoose.model("lendMoney",lendSchema);