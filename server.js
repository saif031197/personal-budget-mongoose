const express = require('express');
const mongoose = require("mongoose");
const model = require("./models/budget_model");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;


app.use('/', express.static('public'))
app.use(cors());
app.use(bodyParser.json());


let url = 'mongodb://localhost:27017/personal_budget';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>{
            console.log("Connected to the database");
        })
        .catch((connectionError)=>{
            console.log(connectionError)
        });

app.get('/hello',(req,resp)=>{
    resp.send('Hello World!')
});

app.get('/budget',async (req,resp)=>{
    try{
        const budget = await model.find();
        resp.send(budget);
    }
    catch(exception){
        console.log(exception);
    }

});

app.post('/insertData', async (req, res) => {
    try{
        console.log(res);
        const data = new model({title: req.body.title, budget: req.body.budget, color: req.body.color}); 
        const result = await data.save();
        res.send(result);
    }
    catch(exception){
        console.log(exception);
    }
});

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`);
});