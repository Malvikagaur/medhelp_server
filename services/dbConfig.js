const mongoose = require("mongoose");
 
const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb+srv://Malvikagaur:Km0XCHcyTD2FFwUI@cluster0.jlkmle1.mongodb.net/appoint?retryWrites=true&w=majority", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
 
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(`Error in connecting to mongoDB ${error}`);
  }
};
 
module.exports = dbConnect;