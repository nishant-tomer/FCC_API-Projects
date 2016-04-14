function hndlr(data) {
                   
              for (var i = 0; i < data.length; i++) {
                var item = "" 
                item += "<strong> Search Number" + i + " : </strong>"+data[i]
                document.getElementById("content").innerHTML += "<br/><br/>" + item
              }
            }
            

