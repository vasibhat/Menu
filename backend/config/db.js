const mongoose =require("mongoose");

const url ="mongodb+srv://vasi:vasi2001@cluster0.kieexzv.mongodb.net/";

mongoose.set("strrictQuery", true);
mongoose.connect(url, {


}).then(() =>
{
    console.log("Connection Successfully")
}).catch((err)=>{
    console.log("no connection")
})

