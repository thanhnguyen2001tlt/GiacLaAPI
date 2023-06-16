const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const db = require("./config/key").mogoURI;
mongoose.set('strictQuery', false);
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("MongoDB Connected....")).catch((err) => console.log(err));

// Thiết lập tiêu đề CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Cho phép truy cập từ bất kỳ nguồn nào
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization" // Thêm Authorization vào danh sách cho phép
  );
  next();
});


app.use("/api/", require("./router/customerRouter"));
app.use("/api/", require("./router/employeeRouter"));
app.use("/api/", require("./router/ingredientRouter"));
app.use("/api/", require("./router/serviceRouter"));
app.use("/api/", require("./router/orderRouter"));
app.use("/api/", require("./router/orderDetailRouter"));

const PORT = process.env.PORT || 8080;
app.listen(PORT);
