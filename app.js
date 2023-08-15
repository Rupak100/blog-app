const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const app = express();
const server = require("http").createServer(app);

//for mongoose :
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/EJS-CHALLENGE");

//mongoose schema :
const List = mongoose.model("List", {
  title: String,
  post: String,
});

// const defaultItems=[ltem1,ltem2];

//////////-----ending of mongoose -----////////////

//using body Parser for parsing the data
app.use(bodyParser.urlencoded({ extended: true }));
//to use the css in our project public folder is needed
app.use(express.static("public"));
//using ejs
app.set("view engine", "ejs");

app.get("/posts/:postid", function (req, res) {
  // storing the post id into the constant
  const postID = req.params.postid;
  //  finding the query in the local dbms with id 
  List.findOne({ _id: postID })
    .then((docs) => {
      console.log("Matched");
      res.render("post", {
        title: docs.title,
        posti: docs.post,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/", (req, res) => {
  List.find({})
    .then(function (lists) {
      res.render("home", { a: lists });
    })
    .catch(function (err) {
      console.log(err);
    });
});
app.get("/about", (req, res) => {
  res.render("about", { b: aboutContent });
});
app.get("/contact", (req, res) => {
  res.render("contact", { c: contactContent });
});
app.get("/compose", (req, res) => {
  res.render("compose");
});
app.post("/compose", (req, res) => {
  // the below lines of code will store the information into the database names List
  const postContent = new List({
    title: req.body.postTitle,
    post: req.body.postName,
  });
  postContent.save();

  res.redirect("/");
});

app.listen(process.env.PORT||3000, () => {
  console.log("port started on port 3000");
});
