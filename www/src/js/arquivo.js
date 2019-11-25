
module.exports = {
 	le_experiment :function() {
	    var resposta;

	    const path = require('path'),
	    dir = path.join( __dirname, '../../files/config' ),
	    dirFilePath = path.join( dir, 'obj.json' );
	    // filePath = path.join(__dirname+'/json', 'experiment.json' );

	    const fs = require('fs');
	    
	    console.log(fs);
	    try {
		    fs.access(dirFilePath, error => {
			    if (error) {
			        fs.mkdirSync(dirFilePath);
			    }
			});
	    	
	      	var fsResposta = fs.readFileSync(dirFilePath)
	     	var resposta = JSON.parse(fsResposta);
	    } catch (error) {
	    	console.log(error);
	    }
	    console.log(resposta);
	}
}