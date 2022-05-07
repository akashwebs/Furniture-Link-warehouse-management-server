const express = require('express');
const cors = require('cors');
const app=express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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
   
  //  get all product from db
   app.get('/furniture',async(req,res)=>{
     const query={}
    const cursor = furnitureCollection.find(query);
    const furnitures=await cursor.toArray();
    res.send(furnitures);
   })

  //  get data with id
  app.get('/inventory/:id',async(req, res)=>{
  const id=req.params.id
  const query={_id:ObjectId(id)}
  const product=await furnitureCollection.findOne(query);
  res.send(product);

  });

  // add product
   app.post('/furniture', async(req,res)=>{
    const products=req.body;
    const result = await furnitureCollection.insertOne(products);
    res.send(result);
   })
  //  delete products
  app.delete('/ManageProduct/:id',async(req,res)=>{
    const id=req.params.id;
    const query = { _id:ObjectId(id) };
    const result = await furnitureCollection.deleteOne(query);
    res.send(result);
  })

  //  update quantity

  app.put('/updateinventory',async(req,res)=>{
    const id=req.query.id;
    const quantity=req.body.newQuantity;
    console.log(quantity);
    const filter={_id:ObjectId(id)};
    const options = { upsert: true };
    const updateDoc = {$set: {quantity:quantity},};
    const result = await furnitureCollection.updateOne(filter, updateDoc, options);
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