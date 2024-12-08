require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dmc7y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const database = client.db('CrowdCube');
    const equipmentCollection = database.collection('equipment');
    const userCollection = client.db('CrowdCube').collection('users');


    app.get('/equipment', async (req, res) => {
      const cursor = equipmentCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get('/equipment/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await equipmentCollection.findOne(query);
      res.send(result);
    });

    app.post('/equipment', async (req, res) => {
      const newEquipment = req.body;
      console.log('Adding new equipment', newEquipment)

      try {
        const result = await equipmentCollection.insertOne(newEquipment);
        res.status(201).send({ message: "Equipment added successfully", result });
      } catch (error) {
        console.error('Error adding equipment:', error);
        res.status(500).send({ message: "Error adding equipment" });
      }
    });

    app.put('/equipment/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: req.body
      }

      const result = await equipmentCollection.updateOne(filter, updatedDoc, options)

      res.send(result);
    })

    app.delete('/equipment/:id', async (req, res) => {
      console.log('going to delete', req.params.id);
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }

      try {
        const result = await equipmentCollection.deleteOne(query);
        res.send(result);
      } catch (error) {
        console.error('Error deleting equipment:', error);
        res.status(500).send({ message: "Error deleting equipment" });
      }
    })


    app.get('/users', async (req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.post('/users', async (req, res) => {
      const newUser = req.body;
      console.log('creating new user', newUser);

      try {
        const result = await userCollection.insertOne(newUser);
        res.status(201).send(result);
      } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send({ message: "Error creating user" });
      }
    });

    app.patch('/users', async (req, res) => {
      const email = req.body.email;
      const filter = { email };
      const updatedDoc = {
        $set: {
          lastSignInTime: req.body?.lastSignInTime
        }
      }

      try {
        const result = await userCollection.updateOne(filter, updatedDoc);
        res.send(result);
      } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send({ message: "Error updating user" });
      }
    })

    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      
      try {
        const result = await userCollection.deleteOne(query);
        res.send(result);
      } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send({ message: "Error deleting user" });
      }
    });

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('EquiSports server is running')
})

app.listen(port, () => {
  console.log(`EquiSports server is running in port: ${port}`)
})