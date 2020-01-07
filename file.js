var remote = require('remote'); 
var dialog = remote.require('dialog');
var fs = require('fs');

module.exports= {

    readFile : function (filepath) {
        fs.readFile(filepath, 'utf-8', function (err, data) {
            if(err){
                alert("An error ocurred reading the file :" + err.message);
                return;
            }
            
            document.getElementById("content-editor").value = data;
        });
    },
    
    deleteFile : function (filepath){
        fs.exists(filepath, function(exists) {
            if(exists) {
                // File exists deletings
                fs.unlink(filepath,function(err){
                    if(err){
                        alert("An error ocurred updating the file"+ err.message);
                        console.log(err);
                        return;
                    }
                });
            } else {
                alert("This file doesn't exist, cannot delete");
            }
        });
    },
    
    saveChanges : function (filepath,content){
        fs.writeFile(filepath, content, function (err) {
            if(err){
                alert("An error ocurred updating the file"+ err.message);
                console.log(err);
                return;
            }
            
            alert("The file has been succesfully saved");
        }); 
    }

}