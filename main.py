import os, glob
from src.modules import read_json

from kivy.app import App
from kivy.lang import Builder
from kivy.uix.image import Image
from kivy.uix.label import Label
from kivy.core.window import Window
from kivy.uix.scrollview import ScrollView
from kivy.uix.behaviors import ButtonBehavior
from kivy.uix.carousel import Carousel
from kivy.uix.screenmanager import ScreenManager, Screen, FadeTransition

Builder.load_file("src/kv_files/main.kv")
Builder.load_file("src/kv_files/scrollv.kv")
Builder.load_file("src/kv_files/animalscreen.kv")


class ScrollableScreen(Screen, ScrollView):
    """Janela rolável que herda as características de uma janela e um widget rolável.
       As características genêricas desta janela estão inclusas e descritas no arquivo '.kv'."""

    def __init__(self, **kwargs):
        super(ScrollableScreen, self).__init__(**kwargs) #Garante que a herança das características seja feita.

    def _add_widget(self, widget):
        """Este método insere um widget passado como parâmetro para o BoxLayout dentro desta janela."""
        self.ids.box.add_widget(widget)

#TODO
class QuizScreen(ScrollableScreen):
    """Janela onde o Quiz é executado."""

    def __init__(self, **kwargs):
        super(QuizScreen, self).__init__(**kwargs)
        self.__build()

    def __build(self):
        """Método que constroe a interface do quiz."""
        #TODO
        for x in range(10):
            self._add_widget(Label(text="Teste", font_size=30, size_hint_y=None, height=200))

#TODO
class ErrorLabel(Label):
    """Janela Genêrica que aparece quando ocorre um erro na construção de outra janela."""
    pass

class AnimalScreen(ScrollableScreen):
    """Tela que contém as informações de um animal."""

    def __init__(self, **kwargs):
        super(AnimalScreen, self).__init__(**kwargs)
        self.__build()

    def __build(self, name='jaguatirica'):
        """Método que constroe a interface da tela do animal."""
        try:
            mypath=str('files/animals/'+name+'/') #Diretório base
            j_info=read_json.parseJson(name, dir=str(mypath+'info/')) #Função que formata o Json
            self._add_widget(Label(text=j_info['Qual o nome do animal?']))
            self._add_widget(self.__load_images(mypath))
            self._add_widget(Label(text=j_info['alternativa e']))
            self._add_widget(Label(text=j_info['Insira o texto para pergunta']))
        finally:
            self._add_widget(Label(text="Não deu"))

    def __load_images(self, mypath):
        """Método que carrega as imagens e retorna um objeto Carrossel com as imagens encontradas."""
        carousel = Carousel()
        for diretorio in glob.glob(os.path.join(mypath, 'images/', '*')):
            image = Image(source=diretorio)
            carousel.add_widget(image)
        return carousel

class MainScreen(Screen):
    """Classe que indica a tela principal. definida no arquivo 'main.kv'."""
    pass


class MyButton(ButtonBehavior, Image):
    """Classe que garante as características de um botão para uma imagem."""

    def __init__(self, **kwargs):
        super(MyButton, self).__init__(**kwargs)


class MainApp(App):
    """Aplicação principal."""
    lastScreen = 0
    nextScreen = 1
    screens = ['main', 'animal', 'quiz']

    sm = ScreenManager()
    sm.transition = FadeTransition()
    sm.add_widget(MainScreen(name=screens[0]))
    sm.add_widget(AnimalScreen(name=screens[1]))
    sm.add_widget(QuizScreen(name=screens[2]))

    def __init__(self, **kwargs):
        super(MainApp, self).__init__(**kwargs)
        Window.bind(on_keyboard=self.onBackBtn)

    def on_stop(self):
        return True

    def _onBackBtn(self, window, key, *args):
        """ To be called whenever user presses Back/Esc Key """
        # If user presses Back/Esc Key
        if key == 27:
            if self.lastScreen != 0:
                self.lastScreen = 0
                self.sm.current = self.screens[self.lastScreen]
                self.nextScreen = 1
            else:
                self.stop()
            return True
        return False

    def _nextScreen(self, name=''):
        if name:
            self.sm.current = 'animal'
        else:
            self.sm.current = 'quiz'

    def build(self):
        Window.size = (520, 740)
        return self.sm

if __name__ == '__main__':
    MainApp().run()
