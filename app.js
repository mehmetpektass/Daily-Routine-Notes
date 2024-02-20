const sqlite3 = require('sqlite3').verbose();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const db = new sqlite3.Database('posts.db'); 

const homeStartingContent = "Welcome to my digital sanctuary, where I explore the depths of my mind and heart through daily reflections, experiences, and musings. This space serves as a haven for self-expression and growth, inviting you to join me on a journey of introspection and exploration. Through raw, unfiltered entries, I aim to document the highs, lows, and profound realizations that shape my existence. Join me in embracing vulnerability, cultivating gratitude, and celebrating the beauty of life one word at a time.";
const aboutContent = "Welcome to My Daily Journal, where introspection meets expression in the digital realm. Founded on the belief that self-reflection is key to personal growth, this platform serves as a haven for individuals seeking to deepen their understanding of themselves and the world around them. Through daily musings, raw reflections, and heartfelt expressions, we aim to create a space where vulnerability is embraced, and authenticity is celebrated. Our mission is to inspire and empower individuals to embark on their own journey of self-discovery, cultivating gratitude, mindfulness, and compassion along the way. Whether you're a seasoned journaler or new to the practice, we invite you to join our community and explore the transformative power of daily reflection. Together, let's embark on a journey of introspection, growth, and self-discovery.";
const contactContent = "We'd love to hear from you! Whether you have feedback, questions, or simply want to connect, don't hesitate to reach out. You can contact us via email at [email address], and we'll get back to you as soon as possible. Additionally, feel free to follow us on social media [insert social media handles] to stay updated on the latest journaling prompts, community events, and inspirational content. Your voice matters to us, and we're here to support you on your journey of self-discovery. Thank you for being a part of our community, and we look forward to connecting with you soon!";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


let posts = [];

db.serialize(() => {
  
  db.each('SELECT * FROM Posts', (err, row) => {
    if (err) {
      console.error(err.message);
    }
   posts.push(row);
  });
});


app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});


app.post("/compose", function(req, res){

  const post = {
    title: req.body.postTitle,
    body: req.body.postBody
  };

  db.serialize(() => {
    const insertQuery = "INSERT INTO Posts (title, body) VALUES (?, ?)";
    db.run(insertQuery, [post.title,post.body], function(err) {
      if (err) {
        return console.log(err.message);
      }
      posts.push(post);
    });
  });

  res.redirect("/");

});


app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.body
      });
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});