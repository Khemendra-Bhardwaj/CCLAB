const express = require('express');
const app = express();
const port = 3001;

const { MongoClient } = require('mongodb');

// Connection URI for MongoDB (student)
// const studentUri = '://localhost:27017/studentDatab';
const studentUri = 'mongodb+srv://Storage:abc%40123@cluster0.4botlhv.mongodb.net/studentDatabase';

// Connection URI for MongoDB (faculty)
const facultyUri = 'mongodb+srv://Storage:abc%40123@cluster0.4botlhv.mongodb.net/facultyDatabase';

// Database and Collection names for student
const studentDbName = 'studentDatabase';
const studentCollectionName = 'studentDatabase';

// Database and Collection names for faculty
const facultyDbName = 'facultyDatabase';
const facultyCollectionName = 'facultyMembers';

// Connect to MongoDB (student)
async function connectToStudentDatabase() {
  const client = new MongoClient(studentUri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to the student database');

    const database = client.db(studentDbName);

    const collection = database.collection(studentCollectionName);

    // Check if student exists in both databases
    const studentName = 'RandomPerson4-4'; // Putting Student Name which is not in student " cant delete it "
    const studentExists = await collection.findOne({ Name: studentName });

    if (studentExists) { // student found in Student Db 
      const facultyClient = new MongoClient(facultyUri, { useNewUrlParser: true, useUnifiedTopology: true });

      try {
        await facultyClient.connect();
        const facultyDatabase = facultyClient.db(facultyDbName);
        const facultyCollection = facultyDatabase.collection(facultyCollectionName);

        const facultyExists = await facultyCollection.findOne({ FacultyName: studentName });

        if (facultyExists) { // if also found in Faculty DB 
          console.log(`Cannot delete ${studentName} because it exists in both databases. Foreign Key Error `);
        } else {
          // Delete the student from the student database
          const deleteResult = await collection.deleteOne({ Name: studentName });
          console.log(`Deleted ${deleteResult.deletedCount} document from the student collection`);
        }
      } finally {
        await facultyClient.close();
      }
    } else {
      console.log(`${studentName} not found in the student database.`); // this cas will HIT 
    }
  } finally {
    await client.close();
    console.log('Connection to the student database closed');
  }
}
connectToStudentDatabase();
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
