const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mySql = require("mysql");

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// server listenning
app.listen(6666, function() {
  console.log("server start is port: 6666");
});

const connection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "chommatt-2018",
  database: "getnumerdata",
  multipleStatements: true,
});

//connect to database
connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database Connect");
  }
});

//ดึงข้อมูลtablefordataทั้งหมด
app.get("/get/service/numerlist", (req, res) => {
  connection.query("SELECT * FROM tablefordata", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

//เก็บเข้าtablefordata
app.post("/post/service/inputnumer", (req, res) => {
  const numerdata = req.body;
  let command = "INSERT INTO tablefordata SET ?";
  connection.query(command, numerdata, (error, results) => {
    if (!error) {
      console.log(numerdata);
      res.send(numerdata);
    } else {
      console.log(error);
      throw error;
    }
  });
});

//เก็บข้อมูลจากหน้าเว็บ
app.post("/post/service/inputnumer2", (req, res) => {
  const Eq = req.body.Eq;
  const XL = req.body.XL;
  const XR = req.body.XR;
  const email = req.body.email;

  let command = "INSERT INTO numer SET ?";
  connection.query(command, Eq, XL, XR, email, (error, results) => {
    if (!error) {
      console.log(results);
      res.send(results);
    } else {
      console.log(error);
      throw error;
    }
  });
});

//ดึงข้อมูลตัวล่าสุดที่inputมา
app.get("/get/service/numerlast", (req, res) => {
  connection.query(
    "SELECT * FROM tablefordata ORDER BY id_data DESC LIMIT 1",
    (error, results) => {
      if (error) throw error;
      res.send(results);
    }
  );
});
