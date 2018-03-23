#coding: utf-8

from kivy.lang import Builder
from kivy.uix.image import Image
from kivy.uix.carousel import Carousel
from kivy.uix.screenmanager import Screen
from kivy.uix.scrollview import ScrollView

Builder.load_file("src/kv_files/animalscreen.kv")

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

    def __build(self, name='jaguatirica'):
        """Método que constroe a interface da tela do animal."""
        try:
            mypath = str('files/animals/' + name + '/')  # Diretório base
            j_info = read_json.parseJson(name, dir=str(mypath + 'info/'))  # Função que formata o Json
            self._add_widget(Label(text=j_info['nome do animal']))
            self._add_widget(self.__load_images(mypath))
            self._add_widget(Label(text=text_functions.parseText(j_info['Reino'])))
            self._add_widget(Label(text=j_info['texto'], halign='right', valign='middle'))
        except Exception:
            self._add_widget(Label(text="Não deu"))

    def __load_images(self, mypath):
        """Método que carrega as imagens e retorna um objeto Carrossel com as imagens encontradas."""
        carousel = Carousel()
        for diretorio in glob.glob(os.path.join(mypath, 'images/', '*')):
            image = Image(source=diretorio)
            carousel.add_widget(image)
        return carousel

