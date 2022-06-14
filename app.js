//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

//express stuff
const app = express();
app.use(express.static("public"));

//ejs part
app.set('view engine', 'ejs');

//body parser stuff
app.use(bodyParser.urlencoded({ extended: true }));


//mongo stuffs
const mongoose = require('mongoose');


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/postDB');
}
const postSchema = new mongoose.Schema({
  name: String,
  news: String
});

const Post = mongoose.model("Post", postSchema);



//home part
app.get("/", (req, res) => {
  Post.find({}, function (err, post) {
    res.render("home", { newItemlist: homeStartingContent, posts: post });
  });

})



app.get("/posts/:postId", (req, res) => {
  // const testingBody = _.lowerCase(req.params.title)
  const requestPostId = req.params.postId;
  // items.forEach((e) => {
  Post.findOne({ _id: requestPostId }, function (err, post) {
    res.render("post", { title: post.name, content: post.news })
  })
  // const storedTitle = _.lowerCase(e.title)
  // if (storedTitle === testingBody) {
  //   res.render('post', { title: e.title, content: e.post })
  // }
})




//about part
app.get("/about", (req, res) => {
  res.render('about', { newItemlist: aboutContent })
})


//contact part
app.get("/contact", (req, res) => {
  res.render('contact', { newItemlist: contactContent })
})





//compose part
app.get("/compose", (req, res) => {
  res.render('compose')
})





app.post("/compose", (req, res) => {
  const post = new Post({
    name: req.body.title,
    news: req.body.compose
  })
  post.save(function (err) {
    if (!err) {
      res.redirect("/")
    }
  })
  // defaultItems.push(publish)
})


//listen prt
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
