const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("../src/db/conn");

const MensRanking = require("../src/models/mens");
app.use(express.json());
//handle post req
app.post('/mens', async (req, res) => {
    try{
        const addingMensRecords = new MensRanking(req.body)
        console.log(req.body);
        const insertMens = await addingMensRecords.save();
        res.status(201).send(insertMens);
    }catch(e){
            res.status(400).send(e);
    }
});
 
//handle get req
app.get('/mens', async (req, res) => {
    try{
        const getMens = await MensRanking.find({});
        res.send(getMens);
        console.log(res.send);
    }catch(e){
            res.status(400).send(e);
    }
});

//get req for indivisual

app.get('/mens/:id', async (req, res) => {
    try{
        const _id = req.params.id;
        const getMen = await MensRanking.findById({_id});
        res.send(getMen);
        console.log(res.send);
    }catch(e){
            res.status(400).send(e);
    }
});

//handel updat req
app.patch('/mens/:id', async (req, res) => {
    try{
        const _id = req.params.id;
        const getMen = await MensRanking.findByIdAndUpdate(_id, req.body, {
            new:true
        });
        res.send(getMen);
        console.log(res.send);
    }catch(e){
            res.status(500).send(e);
    }
});
//handel delete req
app.delete('/mens/:id', async (req, res) => {
    try{
         
        const getMen = await MensRanking.findByIdAndDelete(req.params.id);
        res.send(getMen);
         
    }catch(e){
            res.status(500).send(e);
    }
});

//app.get("/", async(req,res)=>{
  //  res.send("welcome to my page");
//});

app.listen(port, () =>{
    console.log(`connection is live at port no. ${port}`);
});