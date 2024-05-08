const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());
const PORT = 5038;

const CONNECTION_STRING =
  "mongodb+srv://admin:Yrskrmsr@cluster0.nwljkhx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DATABASE_NAME = "employeedb";
let database;

app.listen(PORT, () => {
  MongoClient.connect(CONNECTION_STRING, (error, client) => {
    if (error) {
      console.error("Error connecting to MongoDB:", error);
      return;
    }
    database = client.db(DATABASE_NAME);
    console.log("MongoDB Connection Successful");
  });
});
app.use(express.json());

app.get("/api/employee/GetInfo", (req, res) => {
  database
    .collection("employeecollection")
    .find({})
    .toArray((error, result) => {
      if (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json(result);
    });
});
app.post("/api/employee/AddEmployees", multer().none(), (req, res) => {
  const { name, salary } = req.body;

  console.log("New employee name:", name);
  console.log("New employee salary:", salary);

  if (!name || !salary) {
    res.status(400).json({ error: "Name and salary are required" });
    return;
  }

  database
    .collection("employeecollection")
    .countDocuments({}, (error, count) => {
      if (error) {
        console.error("Error counting documents:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      const newEmployeeObject = {
        id: (count + 1).toString(),
        name: name,
        salary: salary,
      };
      database
        .collection("employeecollection")
        .insertOne(newEmployeeObject, (error) => {
          if (error) {
            console.error("Error adding employee info:", error);
            res.status(500).json({ error: "Internal server error" });
            return;
          }
          res.json({ message: "Added Successfully" });
        });
    });
});
