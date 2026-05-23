const express=require('express')
const { MongoClient,Collection,ObjectId}=require('mongodb')
var cors=require('cors')
const Connection_url='mongodb://localhost:27017/'
const dbName='mytestdb'
const app=express();
app.use(cors());
app.use(express.json())
var db, collection;
app.listen(3000,()=>{
    const client=new MongoClient(Connection_url)
    client.connect();
    db=client.db(dbName);
    collection=db.collection('student')
    console.log('Connected to databse');
    console.log('http://localhost:3000')
})
app.get('/stu', async(req,res)=>{
    var result= await collection.find({}).toArray();
    res.send(result)
});

app.post('/stu', async(req,res)=>{
    var result= await collection.insertOne(req.body)
    return res.send(result)
});

app.put('/stu/:id', async(req,res)=>{
    var result= await collection.updateOne({'_id': new ObjectId(req.params.id)},{$set:req})
    return res.send(result)
});

app.delete('/stu/:id', async(req,res)=>{
    var result= await collection.deleteOne({'_id': new ObjectId(req.params.id)})
    return res.send(result)
});

app.post('/reg', async(req,res)=>{
    var result= await collection.insertOne(req.body)
    return res.send(result)
});

app.post('/login', async(req,res)=>{
    var result= await collection.findOne({'email':req.body.email,'password':req.body.password})
    if(result!==null)
    {
        res.send({'status':1})
    }
    else{
        res.send({'status':0})
    }
    return res.send(result)
});