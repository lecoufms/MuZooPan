
module.exports = {
 	le_experiment :function() {
	    var resposta;

	    var fs = require('fs'),
	    path = require('path'),
	    dir = '../files/config',
	    dirFilePath = path.join( dir, 'obj.json' );
	    // filePath = path.join(__dirname+'/json', 'experiment.json' );
	    console.log(__dirname);
	    try {
	    	if (!fs.existsSync(dir)){
			    fs.mkdirSync(dir);
			}
	      	var fsResposta = fs.readFileSync(dirFilePath)
	     	var resposta = JSON.parse(fsResposta);
	    } catch (error) {
	    	console.log(error);
	    }
	    console.log(resposta);
	}
}