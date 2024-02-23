const express = require('express');
const app = express();
const port = 3001;

const { MongoClient } = require('mongodb');

// Connection URI for MongoDB
const uri = 'mongodb+srv://Storage:abc%40123@cluster0.4botlhv.mongodb.net/studentDatabase';

// Sample data for student
const sampleStudent = {
  Name: 'LoginPerson',
  Password: '123',
  MisNo: '1121150777',
  DateOfBirth: '2003-04-24',
  EmailId: 'xyzx@gmail.com',
};

// Connect to MongoDB
async function connectToDatabase() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to the database');

    // Create or get the database
    const database = client.db();

    // Create or get the collection
    const collection = database.collection('studentDatabase');

    // Insert a sample student
    const result = await collection.insertOne(sampleStudent);
    console.log(`Inserted studentDocument  document into the collection`);

  } finally {
    await client.close();
    console.log('Connection to the database closed');
  }
}

// Call the function to connect to the database and insert a sample student
connectToDatabase();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
