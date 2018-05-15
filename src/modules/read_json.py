
import json, codecs

def parseJson(name,dir=''):
    try:
        with codecs.open(str(dir+name+'.json'),'r',encoding='utf8',errors='ignore') as json_data:
            d = json.load(json_data)
            try:
            	return d[0]
            except:
	            return d
    except Exception as e:
        print(e)
        return {'habitat': '', 'nome do animal': '', 'reproducao':'', 'caracteristicas':'','curiosidades':''}

