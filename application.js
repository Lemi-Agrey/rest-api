const express=require('express');
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

let people={people:[{name:'lemi'}]}
app.get('/people', (req, res)=>{
    res.json(people);
    res.end();
});
app.delete('/people', (req, res)=>{
    res.json(people);
    res.end(); 
});
app.post('/people', (req, res)=>{
    //console.log(req.body.name);
    if(req.body && req.body.name){
        people.people.push({name:req.body.name});
    }
    res.json(people);
    res.end(); 
})
app.listen(4000, function(){
    console.log("The server is running");
});