var fs = require('fs');

var walk = function(dir, done) {
	var results = [];
	var key = '';
	fs.readdir(dir, function(err, list) {

	//console.log(list);

		if (err) return done(err);
		var i = 0;
		(function next() {
			var file = list[i++];
			//console.log(file);
			if (!file) return done(null, results);
			file = dir + '/' + file;
			fs.stat(file, function(err, stat) {
				if (stat && stat.isDirectory()) {
					walk(file, function(err, res) {
						key = file.split("/")[2];
						results[key] = results.concat(res);
						next();
					});
				} else {
					file = file.split("public")[1];
					//console.log(file.search("DS_Store"));
					if(file.search("DS_Store") == -1)results.push(file);
					next();
				}
			});
		})();
	});

	return results;
};

module.exports = walk;
