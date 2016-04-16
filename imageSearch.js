
module.exports = function(app,Mongo){

    app.get("/imagesearch", function(req,res){
        res.render("imageSearch", { title : "FCC | Image - Search", msg : "" })
    })

    app.get("/imagesearch/search/*", function(req,res){

        var offset = req.query.offset > 0 ? req.query.offset : 1
        var q = req.path.split("/")[3]
        var ip = req.headers['x-forwarded-for'].split(",")[0] || req.connection.remoteAddress
        var scr = 'https://www.googleapis.com/customsearch/v1?key=##########&cx=########&q='+q+'&num=10&searchType=image&start='+offset+'&callback=hndlr'
        var url = process.env.MONGODB_URI || "mongodb://localhost:27012/test";
        Mongo.connect(url, function(err, db) {
          if (err) throw err
          db.collection("test")
            .insertOne({ip: ip, string: q }, function(err,res){
              if (err) { console.log(err)  }
              console.log(res.result.ok)
              db.close(); } )

        });

        res.render("imageSearchResults", { scr:scr })

    })

    app.get("/imagesearch/recent", function(req,res){

        var ip = req.headers['x-forwarded-for'].split(",")[0] || req.connection.remoteAddress
        var url = process.env.MONGODB_URI || "mongodb://localhost:27012/test";
        var final = []
        Mongo.connect(url, function(err, db) {
          if (err) throw err
          db.collection("test")
            .find( { "ip": ip } ,{string:1, _id:0})
            .toArray( function (err, docs) {
              if(err) throw err
              docs.forEach( function(doc){ final.push(doc.string) })
              db.close()
              res.render("imageRecentSearches", {recent : final})
              return
            })
          })
      })

    }
