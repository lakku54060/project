const express = require('express')
const app=express();

app.get('/test',(req,res)=>{
    res.send('welcome in http get')
})

app.post('/testpost',(req,res)=>{
    res.send('welcome in http post')
})

app.put('/testput',(req,res)=>{
    res.send('welcome in http put')
})

app.patch('/testpatch',(req,res)=>{
    res.send('welcome in http patch')
})

app.delete('/testdelete',(req,res)=>{
    res.send('welcome in http delete')
})

app.listen(5000,()=>{
    console.log('http://localhost:5000')
})