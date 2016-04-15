var multer = require("multer")
var upload = multer({ dest: "uploads/"},{limits : {fieldNameSize : 100, fileSize:500000000 }}).single('payload');
var sys = require('sys')
var exec = require('child_process').exec;

module.exports  =   function(app){

                        function puts(error, stdout, stderr) { sys.puts(stdout) }
                        
                        app.get("/metadata", function(req,res){
                        res.render("metaData", { title : "FCC | File Metadata", msg : "" })
                        })
                        
                        app.post("/metadata", upload, function(req,res){
                        
                        var msg = "File Size is " + req.file.size + " Bytes  || " + req.file.size/1024 + " KBytes  || " + req.file.size/1000/1000 + " MBytes"
                        
                        exec("rm -rf uploads", puts)
                        res.render("metaData", { title : "FCC | File Metadata", msg : msg } )
                        
                        })
                    }