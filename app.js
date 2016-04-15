var express = require("express")
var app = express()
var Mongo = require('mongodb').MongoClient

process.env.PWD = process.cwd()
var assets = require("path").join(process.env.PWD,"/client")
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
  res.render("index", {msg: "That was not a valid url. Read instructions carefully."})
})

app.listen(process.env.PORT)