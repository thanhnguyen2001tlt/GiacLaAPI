const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const db = require("./config/key").mogoURI;
mongoose.set('strictQuery', false);
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, }).then(() => console.log("MongoDB Connected....")).catch((err) => console.log(err));

app.use("/api/", require("./router/customerRouter"));
app.use("/api/", require("./router/employeeRouter"));
app.use("/api/", require("./router/ingredientRouter"));
app.use("/api/", require("./router/serviceRouter"));
app.use("/api/", require("./router/orderRouter"));
app.use("/api/", require("./router/orderDetailRouter"));


const PORT = process.env.PORT || 8080;
app.listen(PORT) 

