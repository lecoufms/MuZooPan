import json

def parseJson(name,dir=''):
    try:
        with open(str(dir+name+'.json')) as json_data:
            d = json.load(json_data)
            return d[0]
    except Exception as e:
        print(e)
        return {'alternativa e': '', 'Qual o nome do animal?': '', 'Insira o texto para pergunta':''}