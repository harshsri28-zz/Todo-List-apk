const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

const app = express();

const items = ["cook food", "eat food", "hungry"];

const workitems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {

const day = date.getDate();

  res.render("list", {
    listTitle: day,
    newListItems: items
  });

});

app.post("/", function(req, res) {
  let item = req.body.newItem;
  if (req.body.list === 'Work List') {
    workitems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workitems
  });
})

app.post("/work", function(req, res) {
  const item = req.body.newItem;

  workitems.push(item);
  res.redirect("/work");

})

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("server is running at 3000 port  ");
});
