class File{
	static readFile(file){
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        var context
        rawFile.onreadystatechange =  function (){
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    try{
                    	app.context = JSON.parse(rawFile.responseText)
                    }catch (e)  {
                        console.log(e);
                    }
                }
            }
        }
        rawFile.send(null);
        return File.prototype.selectContext(app.context)
    }

    selectContext(c) {

	    for(let i=0; i<c.length; i++){
	        if(c[i].key == window.localStorage.getItem("qrcodeInput")){
	            return c[i]
	        }
	    }
	    window.localStorage.setItem("config", "Error");
	    return {"idtemplate":"error","key":"error","mensagem":"Ocorreu um erro inesperado.<br> Retorne e tente novamente.", "anterior" : JSON.parse(window.localStorage.getItem('anterior'))};
	}

	// async getDir(filesystem, name, crear){
 //       var dir 
 //       console.log(name)
 //       console.log(crear)
 //        await filesystem.getDirectory(name, { create: crear}, function (dirEntry) {
 //            dir = dirEntry;
 //        }, File.prototype.fail)

 //        console.log(dir)
 //        return dir
 //    }
    

 //    fail(evt) {
 //        console.log("fail "+evt);
 //    }

 //    getFile(fileSystemDir, name, crear){
 //    	var file
 //    	console.log(name)
 //    	entry.getFile(name, {create: crear, exclusive: true}, function(fileEntry){
 //    		file = fileEntry
 //    	}, File.prototype.fail);
 //    	return file
 //    }
 //    writeFile(criarWriter, dados){
 //    	var dd = dados
 //    	console.log(dados)
 //    	criarWhiter.createWriter(function(escrever){
 //    		escrever.onwrite = function(evt) {
	// 	        console.log("write success");
	// 	    };
	// 	    escrever.write(JSON.stringify(dd));
 //    	},File.prototype.fail)

 //    }

 //    readFile(fileEntry){
 //        var resultado
 //        fileEntry.file(async function(file){
 //            var text
 //            var reader = new FileReader();
 //            reader.onloadend = function() {
 //                console.log("Successful file read: " + this.result);
 //                resultado = this.result
 //                text = this.result
 //                    // if (this.result) {
 //                        // window.localStorage.setItem('anterior', this.result);
 //                        console.log(this.result);
                               
 //                    // }
            
 //            };
 //            reader.readAsText(file);
 //            console.log(text)
 //            console.log(resultado)
 //        },File.prototype.fail);
 //        return resultado
 //    }
}