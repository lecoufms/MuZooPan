import os, glob
from kivy.lang import Builder
from kivy.uix.image import Image
from kivy.uix.button import Button
from kivy.uix.widget import Widget
from kivy.uix.label import Label
from kivy.uix.carousel import Carousel
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.screenmanager import Screen
from kivy.graphics import Rectangle, Color
from kivy.uix.scrollview import ScrollView
from src.modules import read_json, text_functions
Builder.load_string("""
<AnimalScreen>:
    canvas.before:
        Color:
            rgba: 1, 1, 1, 1
        Rectangle:
            pos: self.pos
            size: self.size
""")

class ScrollableScreen(ScrollView, Screen):
    """Janela rolável que herda as características de uma janela e um widget rolável.
       As características genêricas desta janela estão inclusas e descritas no arquivo '.kv'."""

    def __init__(self, **kwargs):
        super(ScrollableScreen, self).__init__(**kwargs)  # Garante que a herança das características seja feita.

    def _add_widget(self, widget):
        """Este método insere um widget passado como parâmetro para o BoxLayout dentro desta janela."""
        self.ids['box'].add_widget(widget)


class AnimalScreen(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(MetaSingleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]

class jaguatirica(Screen):
    """Tela que contém as informações de um animal."""

    def __init__(self, **kwargs):
        super(jaguatirica, self).__init__(**kwargs)
        self.name = 'jaguatirica'
        self.__build()

    def __build(self):
        """Método que constroe a interface da tela do animal."""
        try:
            mypath = str('files/animals/' + self.name + '/')  # Diretório base
            layout = BoxLayout()
            j_info = read_json.parseJson(self.name, dir=str(mypath + 'info/'))  # Função que formata o Json
            layout.add_widget(Label(text=j_info['nome do animal']))
            layout.add_widget(self.__load_images(mypath))
            layout.add_widget(Label(text=text_functions.parseText(j_info['Reino'])))
            layout.add_widget(Label(text=j_info['texto'], halign='right', valign='middle'))
            self.add_widget(layout)
        except Exception as e:
            print(e)
            self.add_widget(Label(text="Não deu"))

    def __load_images(self, mypath):
        """Método que carrega as imagens e retorna um objeto Carrossel com as imagens encontradas."""
        carousel = Carousel()
        for diretorio in glob.glob(os.path.join(mypath, 'images/', '*')):
            image = Image(source=diretorio)
            carousel.add_widget(image)
        return carousel

class piranha(Screen):

    def __init__(self, **kwargs):
        super(piranha, self).__init__(**kwargs)
        self.name = 'piranha'
        btn = Button(text='click')
        btn.bind(on_press=self.printOn)
        self.add_widget(btn)

    def printOn(self,instance):
        print('foi')