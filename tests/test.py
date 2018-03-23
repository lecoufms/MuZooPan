import kivy, os, glob, json
from kivy.app import App
from kivy.uix.carousel import Carousel
from kivy.uix.gridlayout import GridLayout
from kivy.uix.button import Button
from kivy.uix.image import Image
import os, glob
from src.modules import read_json, text_functions

from kivy.app import App
from kivy.lang import Builder
from kivy.uix.image import Image
from kivy.uix.label import Label
from kivy.core.window import Window
from kivy.uix.scrollview import ScrollView
from kivy.uix.behaviors import ButtonBehavior
from kivy.uix.carousel import Carousel
from kivy.uix.screenmanager import ScreenManager, Screen, FadeTransition

def parseJson(name,dir=''):
    try:
        with open(str(dir+name+'.json')) as json_data:
            d = json.load(json_data)
            return d[0]
    except Exception as e:
        print(e)
        return {'alternativa e': '', 'Qual o nome do animal?': '', 'Insira o texto para pergunta':''}

class MainApp(App):
    def build(self, name='jaguatirica'):
        c = Carousel()
        mypath = 'files/animals/jaguatirica/images/'
        for f in glob.glob(os.path.join(mypath,'*')):
            pic = Image(source=f)
            c.add_widget(pic)
        layout = GridLayout(cols=1, spacing=10, size_hint_y=None)
        layout.bind(minimum_height=layout.setter('height'))
        mypath = str('files/animals/' + name + '/')  # Diretório base
        layout.add_widget(Label(text=text_functions.parseText(j_info['Reino'])))
        layout.add_widget(Label(text=j_info['texto'], halign='right', valign='middle'))
        layout.add_widget(c)
        layout.add_widget(Button(text="next"))
        return layout

MainApp().run()
