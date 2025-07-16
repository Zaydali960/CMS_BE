const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://CMS:0907gazette@cluster0.zzywpxt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


const connectToMongoose = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to Mongoose successfully');
  } catch (error) {
    console.error('Error connecting to Mongoose:', error.message);
  }
};


module.exports = connectToMongoose;