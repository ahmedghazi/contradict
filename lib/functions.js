var Helpers = function(p) {
	var _this = this,
		fs = require('fs'),
		path = require('path');

		//var p = "../"
		
		/*return {
		    walk : function(dir, done)
		 	{
			//var walk = function(dir, done) {
		        var results = [];
				fs.readdir(dir, function(err, list) {
					
				    if (err) return done(err);
				    var pending = list.length;
				    if (!pending) return done(null, results);
				    list.forEach(function(file) {
				    	file = dir + '/' + file;

				      	fs.stat(file, function(err, stat) {
				      		
				      		console.log(stat.isDirectory(), file);

				        	if (stat && stat.isDirectory()) {
				        		//console.log(Helpers);
				          		walk(file, function(err, res) {
				            		results = results.concat(res);
				            		if (!--pending)done(null, results);
				          		});
							} else {
				          		results.push(file);
				          		if (!--pending)done(null, results);
				        	}
				      	});
				    });
				});
		    }
		}
*/

 		/*dirTree: function(filename){
 			var stats = fs.lstatSync(filename),
		        info = {
		            path: filename,
		            name: path.basename(filename)
		        };
		    
		    if (stats.isDirectory()) {
		        info.type = "folder";
		        info.children = fs.readdirSync(filename).map(function(child) {
		            console.log(filename + '/' + child);
		            //return this.dirTree(filename + '/' + child);
		        });
		    } else {
		        // Assuming it's a file. In real life it could be a symlink or
		        // something else!
		        info.type = "file";
		    }
			
			console.log(info)
		    return info;
 		},*/
    
};
module.exports = Helpers;