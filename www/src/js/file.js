class File{
	static readFile(file, successFunction){
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        var context
        rawFile.onreadystatechange =  function (){
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    try{
                    	context = rawFile.responseText
                    }catch (e)  {
                        console.log(e);
                    }
                }
            }
        }
        rawFile.send(null);
        return successFunction(context)
    }

    selectContext(c) {
        app.context=JSON.parse(c)
	    for(let i=0; i<app.context.length; i++){
	        if(app.context[i].key == window.localStorage.getItem("qrcodeInput")){
	            return app.context[i]
	        }
	    }
	    window.localStorage.setItem("config", "Error");
	    return {"idtemplate":"error","key":"error","mensagem":"Ocorreu um erro inesperado.<br> Retorne e tente novamente.", "anterior" : JSON.parse(window.localStorage.getItem('anterior'))};
	}

    async getDir(name, crear, successFunction, errorFunction){
        var dir
        var dir = name.split("/")
        await window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
            let i = 0
            let dirSubdir=''
            while(i+1 < dir.length){
                dirSubdir = dirSubdir+dir[i]+"/"
                fs.root.getDirectory(dirSubdir, { create: crear}, function (dirEntry) {
                    if (i == 0) {
                        app.dirRoot=dirEntry
                    }
                }, errorFunction)
                i++    
            }
            fs.root.getDirectory(name, { create: crear}, function (dirEntry) {
                app.setDirEntry(dirEntry)
                successFunction(dirEntry)
            }, errorFunction)
        }, errorFunction)     
    }

    fail(evt) {
        console.log("fail "+evt);
    }

    getFile(fileSystemDir, name, crear, successFunction, errorFunction){
    	var file
    	fileSystemDir.getFile(name, { create: crear}, function(fileEntry){
            successFunction(fileEntry,name)
    	}, errorFunction)
    }

    writeFile(criarWriter, dados, successFunction){
    	criarWriter.createWriter(function(escrever){
            escrever.onwriteend= function(evt) {
                escrever.seek(0);
                escrever.onwriteend = successFunction;
                let guarda = JSON.stringify(dados)
                escrever.write(new Blob([guarda]));
            }
            escrever.truncate(0);
    	},File.prototype.fail)
    }

    // readFile(fileEntry, successFunction){
    //     var resultado
    //     fileEntry.file(function(file){
    //         var text
    //         var reader = new FileReader();
    //         reader.onloadend = function() {
    //             console.log(this.result);
    //             console.log(JSON.parse(this.result));
    //             successFunction(this.result)
    //         };
    //         reader.readAsText(file);
    //         console.log(text)
    //         console.log(resultado)
    //     },File.prototype.fail);
    //     return resultado
    // }
}