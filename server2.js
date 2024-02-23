const express = require('express');
const app = express();
const port = 3001;

const { MongoClient } = require('mongodb');

// Connection URI for MongoDB (faculty)
const facultyUri = 'mongodb+srv://Storage:abc%40123@cluster0.4botlhv.mongodb.net/FacultyDatabase';

// Database and Collection names for faculty
const facultyDbName = 'facultyDatabase';
const facultyCollectionName = 'facultyMembers';

// Sample data for faculty
const sampleFacultyMember = {
  FacultyName: 'abcFaculty',
  SubjectName: 'Ece',
  JoiningDate: '2003-04-24',
  Password: '12453', // Include the Password field
};

// Connect to MongoDB (faculty)
async function connectToFacultyDatabase() {
  const client = new MongoClient(facultyUri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to the faculty database');

    // Create or get the faculty database
    const database = client.db(facultyDbName);

    // Create or get the faculty collection
    const collection = database.collection(facultyCollectionName);

    // Insert a sample faculty member
    const result = await collection.insertOne(sampleFacultyMember);
    console.log(`Inserted ${result.insertedCount} document into the faculty collection`);

  } finally {
    await client.close();
    console.log('Connection to the faculty database closed');
  }
}

// Call the function to connect to the faculty database and insert a sample faculty member
connectToFacultyDatabase();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
