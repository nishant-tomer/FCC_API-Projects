
var valid = require("valid-url")


module.exports  =   function(app){ 
                                    
        app.get("/urlshortener" , function(req, res){
            res.render("urlShortener" ,{ title : "FCC | URL Shortener", msg : "" }) 
        })
        
        app.get("/urlshortener/*", function(req, res) {
            
            if (valid.isHttpUri(req.url.slice(14)) || valid.isHttpsUri(req.url.slice(14)) ) { 
              var rand = Math.round( Math.random()*100000 )
              init(app,rand,req.url);
              res.json( { "original_url": req.url.slice(18), "short_url":"https://fccimagesearch-nishant-tomer.c9users.io/us/" + rand } )
              
        
              
            } else {
                
               res.render("urlShortener" ,{ title : "FCC | URL Shortener", msg : "Not a valid url! Read instructions carefully." })
            }
            
        })
        
        function init(app,rand,orig){
            app.get('/us/'+rand, function(req,res) {
                res.redirect(orig.slice(14));
            })
        }
    
    }