const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const upload = require ("./utils/uploads")
const uploadImage=require ("./controller/image-controller.js")
const multer = require("multer");
const path = require("path");
dotenv.config();
const PORT = process.env.PORT || 4000

// const fs = require("fs");
// const uploadDirectory=path.join(__dirname,'images');
// if (!fs.existsSync(uploadDirectory))
// {
//   fs.mkdirSync(uploadDirectory);
// }

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use("/api/images", express.static(path.join(__dirname, "/api/images")));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 10000,
    
    writeConcern: {
        j: true
    }
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));



app.post("/api/upload", upload.single("file"), uploadImage);

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories",categoryRoute);

app.listen(PORT, () => {
  console.log(`Backend is running on ${PORT}`);
});