const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./Models/Todo.js');
// const Parser = require('bod')

//default
mongoose.set('strictQuery',false);

app.use(express.json());
app.use(cors()); 
const db ='mongodb+srv://hussainsk:hussain786@cluster0.srn1j9w.mongodb.net/devtown?retryWrites=true&w=majority'

mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("db is connected")
}).catch(console.error);


//start

app.get('/todos',async(req,res)=>{
    const todo =await Todo.find();
     res.status(303).json(todo);
    // res.send("app is been perfectly setup")
});
// post 
app.post('/todo/new',(req,res)=>{
    const todo = new Todo({
        text:req.body.text
    })
    todo.save();
    res.json(todo);
})
// delete

 app.delete('/todo/delete/:id',async(req,res)=>{
    const result= await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
 });
// complete
 app.put('/todo/complete/:id',async(req,res)=>{
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);
 })
 app.get('/todo/complete/:id',async(req,res)=>{
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);
 })
app.listen(3005,()=>console.log("server is running at 4000"));