module.exports  =   function(app){

    app.get("/mydata", function(req,res){
      
      if (req.get("User-agent") != undefined ) {
        
        var arr = [];
        var os;
        var agent = req.get("User-agent").slice(req.get("User-agent").indexOf("("),req.get("User-agent").indexOf(")")).split(";")
        
         
          if (check("windows"))
             {
                 os = arr[0];
             } else if(check("mac"))
             {
                 os = arr[0];
             } else if(check("x11"))
             {
                 os = arr[0];
             } else if(check("android"))
             {
                  os = arr[0];
             } else if(check("iphone"))
             {
                  os = arr[0];
             }else{
                 os = "UnKnown, More-Info: "+ agent;
             }
      
      }
      
      res.json({ 
                 "ipaddress" : req.headers['x-forwarded-for'].split(",")[0] || req.connection.remoteAddress, 
                 "Language" : req.get("Accept-language").split(";")[0] || "Not available", 
                 "Software": os.slice(1) || "Not available"
    
              })
      
       function check(str){
          arr = agent.filter(function(el){return el.toLowerCase().indexOf(str) >= 0})
          return arr.length > 0 
        }
        
      
    })
    
}