# -*- coding: utf-8 -*-

import json 

def passePontos(name, dir=''):
	try:
		with open(str(dir+name+'.json')) as json_date:
			d = json.load(json_date)	
			return d[0]

	except Exception as e:
		print(e)
		return {'Pontos: ':'', 'Acertos: ': '','Bônus: ': '', 'Revisoes': ''}


	