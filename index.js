const express = require('express');
const cors = require('cors');
const app=express()
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();

app.use(cors())
app.use(express.json())
const port=process.env.PORT || 5000;






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vhndb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run=async()=>{

  try{
   await client.connect()
   const furnitureCollection=client.db('furnituresLink').collection('furniture')
   
   app.get('/furniture',async(req,res)=>{
     const query=req.body;
    const cursor = furnitureCollection.find(query);
    const furnitures=await cursor.toArray();
    res.send(furnitures);
   })
   app.post('/furniture', async(req,res)=>{
    const products=req.body;
    const result = await furnitureCollection.insertOne(products);
    res.send(result);
   })
  }
  finally{

  }

}
run().catch(console.dir)

app.listen(port, ()=>{
    console.log('successfully run server', port)
})