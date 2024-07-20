
import { MongoClient } from 'mongodb';
// const uri = "mongodb+srv://<username>:<password>@cluster0.fidm8e1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PW}@cluster0.fidm8e1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const dbName = "admin"
// Create a new MongoClient
const mongoClientOptions = {}
const client = new MongoClient(uri, mongoClientOptions);

async function main() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log(`Connected ${process.env.MONGO_DB_USER} successfully to the server`);

    // Send a ping to confirm a successful connection
    await client.db(dbName).command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
main().catch(console.dir);
