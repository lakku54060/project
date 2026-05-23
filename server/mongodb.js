import { MongoClient, ObjectId } from 'mongodb';
const uri = ('mongodb://localhost:27017/')
const dbName='mytestdb'
const collectionName='student'

async function InsertStudentRecord(n,b,f)
{
    const client = new MongoClient(uri);
    try
    {
        await client.connect();
        const db=client.db(dbName);
        const collection=db.collection(collectionName)
        const result=await collection.insertOne({name:n,branch:b,fees:f});
        console.log('Inserted',result.insertedId);
    }
    catch(err)
    {
        console.log('err')
    }
}

async function ViewStudentRecord()
{
    const client = new MongoClient(uri);
    try
    {
        await client.connect();
        const db=client.db(dbName);
        const collection=db.collection(collectionName)
        const result=await collection.find({}).toArray();
        for(var r of result)
        {
            console.log(r.name,r.branch,r.fees)
        }
        console.log('View',result.insertedId);
    }
    catch(err)
    {
        console.log('err')
    }
}

async function UpdateStudentRecord(i,n,b,f)
{
    const client = new MongoClient(uri);
    try
    {
        await client.connect();
        const db=client.db(dbName);
        const collection=db.collection(collectionName)
        const result=await collection.updateOne({'_id':new ObjectId(i)},{$set:{name:n,branch:b,fees:f}});
        for(var r of result)
        {
            console.log(r.name,r.branch,r.fees)
        }
        console.log('Updated',result.insertedId);
    }
    catch(err)
    {
        console.log('err')
    }
}

async function DeleteStudentRecord(i)
{
    const client = new MongoClient(uri);
    try
    {
        await client.connect();
        const db=client.db(dbName);
        const collection=db.collection(collectionName)
        const result=await collection.deleteOne({'_id':new ObjectId(i)});
        for(var r of result)
        {
            console.log(r.name,r.branch,r.fees)
        }
        console.log('Deleted',result.insertedId);
    }
    catch(err)
    {
        console.log('err')
    }
}

//await InsertStudentRecord('Ravi bhai','CS',25000)
await ViewStudentRecord()
//await UpdateStudentRecord('69b3e7effb925ea9d5f54267','Ravi bhai','CS',25000)
await DeleteStudentRecord('69b3e7effb925ea9d5f54267')