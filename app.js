var express = require("express")
var app = express()
var Mongo = require('mongodb').MongoClient

var cwd = process.cwd() || __dirname
var assets = require("path").join(cwd,"/client")
var views = require("path").join(assets,"/views")


app.use(express.static(assets))
app.set("views", views)
app.set("view engine", "jade")

app.get("/", function (req,res){
  
  res.render("index", {msg: ""})
  
})

require("./imageSearch")(app, Mongo)
require("./metaData")(app)
require("./headerParser")(app)
require("./microStamp")(app)
require("./urlShortener")(app)

app.use(function(req,res){
  res.redirect("/")
})

app.listen(process.env.PORT)