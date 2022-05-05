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
    client.connect()
    console.log('db connectd')
  }
  finally{

  }

}
run().catch(console.dir)

app.listen(port, ()=>{
    console.log('successfully run server', port)
})