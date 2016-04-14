var express = require("express")
var app = express()
var flash = require("connect-flash")
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var Mongo = require('mongodb').MongoClient;


app.set("views", require("path").join(__dirname+"/client"))
app.set("view engine", "jade")
app.use(express.static(require("path").join(__dirname+"/client")))
app.use(cookieParser());
app.use(session({ secret: '123' }));
app.use(flash());

app.get("/", function(req,res){
    res.render("index", { title : "FCC | Image - Search", msg : req.flash("msg") })
})

app.get("/search/*", function(req,res){
  
    var offset = req.query.offset > 0 ? req.query.offset : 1
    var q = req.path.split("/")[2]
    var ip = req.headers['x-forwarded-for'].split(",")[0] || req.connection.remoteAddress
    var scr = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyAqYB_d-3bFU-4VUAf7c1AT_z1dE84BXuI&cx=014756393560842067446:ruuy1nrcksa&q='+q+'&num=10&searchType=image&start='+offset+'&callback=hndlr'
    var url = "mongodb://localhost:27017/nishant_tomer-fccimagesearch-2955212";
    Mongo.connect(url, function(err, db) {
      if (err) throw err
      db.collection("test")
        .insertOne({ip: ip, string: q }, function(err,res){ 
          if (err) { console.log(err)  } 
          console.log(res.result.ok)  
          db.close(); } )
     
    });
    res.render("results", { scr:scr })

})

app.get("/recent", function(req,res){
  
    var ip = req.headers['x-forwarded-for'].split(",")[0] || req.connection.remoteAddress
    var url = "mongodb://localhost:27017/nishant_tomer-fccimagesearch-2955212";
    var final = []
    Mongo.connect(url, function(err, db) {
      if (err) throw err
      db.collection("test")
        .find( { "ip": ip } ,{string:1, _id:0})
        .toArray( function (err, docs) {
          if(err) throw err
          docs.forEach( function(doc){ final.push(doc.string) })
          db.close()
          res.render("recent", {recent : final})
          return
        })
      })
    });
    

app.use(function(req,res){
  req.flash("msg","This is not a Valid Url!, Read the below given instructions carefully.")
  res.redirect("/")
  
  
  
})

app.listen(process.env.PORT)