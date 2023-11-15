const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 5001;
mongoose.connect(
    "mongodb+srv://rehmnshs27:Norc4fZixqnKp5FN@cluster1.n5blfjm.mongodb.net/post?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  const db = mongoose.connection;
  
db.on("error", (error) => {
    console.error("Error connecting to the database:", error);
  });
  
  
db.once("open", () => {
    console.log("Connected to the postDB");
  });
const UserSchema = new mongoose.Schema({
    username: String,
    data: [String],
   
  
  });
  const User = mongoose.model("post", UserSchema);


  app.use(express.json());
  app.use(cors());
  app.post("/register", async (req, res) => {
    const username = req.body.username;
    const data = req.body.title;
  
    try {
      
      
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
     
        
          existingUser.data.push(data);
          
          await existingUser.save();
          console.log("Post added to the user's data");
          res.status(200).json(existingUser);
        
      } else {
        // If the username doesn't exist, create a new user and save
        const newUser = new User({ username, data });
        await newUser.save();
        console.log("User created successfully");
        res.status(201).json(newUser); // You might want to send a success response here
      }
      // Check if the username already exists in the database
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error"); // Handle errors gracefully
    }
  });
  app.get("/getone", async (req, res) => {
    try {
      // Use your Mongoose model to fetch all data
      const username = "rehman";
      const allData =await User.findOne({ username });
  
      // Send the data as a JSON response
      res.json(allData);
      console.log(allData);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
  app.delete("/delete", async (req, res) => {
    
      const data = req.body.book;
      console.log(data); 
           const username = "rehman";
      
      // Find the user by username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      try {
      user.data = user.data.filter((id) => id !== data);
      await user.save();
      console.log("Deleted " + data);
      return res.json({ message: "ID deleted successfully" });}
      catch(error){
        console.log(error);
      }});
   
   
    
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });