//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "This is one of my first EJS-based projects...";
const aboutContent = "I'm Arushi, an 18 year old who's had too much leisure time during the lockdown, resulting in the discovery and cultivation of numerous coding-based hobbies.";
const contactContent = "Just hit me up on +91 9152411265 or arushisr24@gmail.com, and we can be besties :)";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res) {
  res.render('home',{
    homeStartingContent : homeStartingContent,
    posts: posts
  });
});
app.get("/about", function(req, res) {
  res.render('about',{
    aboutContent : aboutContent
  });
});
app.get("/contact", function(req, res) {
  res.render("contact",{
    contactContent : contactContent
  });
});
app.get("/compose", function(req, res) {
  res.render("compose");
});

app.get('/posts/:parameter', function(req, res)  {
  for(var i = 0 ; i < posts.length ; i ++){
    let postsTitle = _.lowerCase(posts[i].title);
    let paramTitle = _.lowerCase(req.params.parameter);
    if (postsTitle == paramTitle){
      console.log("Match FOUND!");
      res.render("post",{
        title: posts[i].title,
        body: posts[i].body
      });

    } else {
      console.log("Not a match!");
    }
  }

});

app.post("/compose", function(req, res){
  let post = {
    title: req.body.newEntryTitle,
    body: req.body.newEntryBody
  };
  posts.push(post);
  res.render("home",{
    homeStartingContent: homeStartingContent,
    posts: posts
  });

})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
