require("sugar-date")
var url = require("url")


module.exports = function(app){
  
  app.get("/microstamp/*", function(req,res){
    
    var str = url.parse(req.url).pathname.slice(1)
    
    if (str.length !== 0 ){
      
      if ( str.search(/[a-z]/) == -1 ) { 
         
         var stamp =  Date.create(str*1000)
          res.json({ "unix": str || null , "natural": stamp.format("{month} {day}, {year}") || null })
      }
      
      str = str.replace(/%20/g," ")
      var stamp = Date.create(str) 
      res.json({ "unix": ( Date.parse(stamp) / 1000).toString() || null  , "natural": stamp.format("{month} {day}, {year}") || null })
    }
 
  })
  
  
  app.get("/microstamp", function(req,res){
  
    res.render("microStamp", { title : "Fcc | Microstamp"})
  
  })

}