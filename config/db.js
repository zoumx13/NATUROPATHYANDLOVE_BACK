// Import mongoose
const mongoose = require("mongoose");

// Connect mongoose with MongoDB
mongoose.connect(`mongodb://127.0.0.1:27017/connexion`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("MongoDB is connected");
});
 