const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
//CREATE CONNECTION
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "goldtree9",
  database: "appointment",
});
//CONNECT
db.connect((err) => {
  if (err) {
    console.log(err.toString());
    throw err;
  }
  console.log("MYSQL CONNECTED");
});

const app = express();
//MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());

//ROUTES
//CREATE TABLE Bookings
app.get("/createtablebookings", (req, res) => {
  let sql =
    "CREATE TABLE Bookings(id int AUTO_INCREMENT,date DATE unique, slot1 bit not null default 0,slot2 bit not null default 0,slot3 bit not null default 0,slot4 bit not null default 0,slot5 bit not null default 0,slot6 bit not null default 0,slot7 bit not null default 0,PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    // res.send(result.toString());
    res.send("Table created");
  });
});
//CREATE TABLE Booking Details
app.get("/createtablebookingdetails", (req, res) => {
  let sql =
    "CREATE TABLE BookingDetails(id int AUTO_INCREMENT,patient_id int,doctor_id int,date DATE,patient_name varchar(255),patient_email varchar(255),guests varchar(255),details varchar(255), start_time TIME,PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    // res.send(result.toString());
    res.send("Table created");
  });
});
//GET ID of DATE
app.get("/getid", (req, res) => {
  let sql = `SELECT id FROM Bookings WHERE date='${req.query.date}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});
//SELECT Slot 1
app.get("/getDates/slot1/:id", (req, res) => {
  let sql = `SELECT slot1 FROM Bookings WHERE id = '${req.params.id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});
//SELECT Slot 2
app.get("/getDates/slot2/:id", (req, res) => {
  let sql = `SELECT slot2 FROM Bookings WHERE id = '${req.params.id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});
//SELECT Slot 3
app.get("/getDates/slot3/:id", (req, res) => {
  let sql = `SELECT slot3 FROM Bookings WHERE id = '${req.params.id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});
//SELECT Slot 4
app.get("/getDates/slot4/:id", (req, res) => {
  let sql = `SELECT slot4 FROM Bookings WHERE id = '${req.params.id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});
//SELECT Slot 5
app.get("/getDates/slot5/:id", (req, res) => {
  let sql = `SELECT slot5 FROM Bookings WHERE id = '${req.params.id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});
//SELECT Slot 6
app.get("/getDates/slot6/:id", (req, res) => {
  let sql = `SELECT slot6 FROM Bookings WHERE id = '${req.params.id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});
//SELECT Slot 7
app.get("/getDates/slot7/:id", (req, res) => {
  let sql = `SELECT slot7 FROM Bookings WHERE id = '${req.params.id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});
//PUT DATA IN DB
app.post("/postData", (req, res) => {
  let sql = "INSERT INTO Bookings SET ?";
  db.query(sql, [req.body], (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});
//UPDATE SLOT
app.put("/updateslot/:id", (req, res) => {
  let sql = `UPDATE Bookings SET ? WHERE id=${req.params.id}`;
  db.query(sql, [req.body], (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});
//GET Data for Full Calendar
app.get("/getDetails", (req, res) => {
  let sql = `SELECT patient_name,date,guests,details,patient_email,start_time from BookingDetails`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});
//POST DETAILS IN BOOKING DETAILS
app.post("/postDataBookingDetails", (req, res) => {
  let sql = "INSERT INTO BookingDetails SET ?";
  db.query(sql, [req.body], (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});
//GET DATES for FULL SLOTS
app.get("/getfullslots", (req, res) => {
  let sql =
    "SELECT date FROM Bookings WHERE slot1=1 AND slot2=1 AND slot3=1 AND slot4=1 AND slot5=1 AND slot5=1 AND slot6=1 And slot7=1";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});
//GET DATES for FULL SLOTS SATURDAY
app.get("/getfullslotssaturday", (req, res) => {
  let sql =
    "SELECT date FROM Bookings WHERE slot1=1 AND slot2=1 AND slot3=1 AND slot4=1";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});
app.listen("8000", () => {
  console.log("DB CONNECTED AT PORT 8000");
});
