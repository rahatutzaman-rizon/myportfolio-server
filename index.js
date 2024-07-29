const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const uri = "mongodb://rizonrahat199:gpeYJ3jTyAALnHAr@ac-jif2aos-shard-00-00.u9sh80h.mongodb.net:27017,ac-jif2aos-shard-00-01.u9sh80h.mongodb.net:27017,ac-jif2aos-shard-00-02.u9sh80h.mongodb.net:27017/?ssl=true&replicaSet=atlas-rzyffr-shard-0&authSource=admin&retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // await client.connect();

    const blogCollection = client.db("blog").collection("blogs");
    const projectCollection = client.db("projects").collection("project");
    
    
    app.get("/blog", async (req, res) => {
      
        const result = await blogCollection.find().toArray();
        res.send(result);
      
    });

    app.get("/blog/:id", async (req, res) => {
     
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await blogCollection.findOne(query);
      
          res.send(result);
       
    });

    app.get("/project", async (req, res) => {
      
      const result = await projectCollection.find().toArray();
      res.send(result);
    
  });

  app.get("/project/:id", async (req, res) => {
   
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await projectCollection.findOne(query);
    
        res.send(result);
     
  });


  } finally {
    // Ensuring the client will close when you finish/error
    // Not closing the client here for continuous server running.
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send(" portfolio server");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
