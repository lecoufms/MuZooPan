import os, glob
from kivy.app import App
from kivy.lang import Builder
from src.screens import Screens
from kivy.uix.label import Label
from kivy.factory import Factory
from kivy.uix.image import Image
from kivy.core.window import Window

from kivy.uix.behaviors import ButtonBehavior
from kivy.uix.screenmanager import ScreenManager, Screen, FadeTransition


Builder.load_file("src/kv_files/main.kv")
Builder.load_file("src/kv_files/scrollv.kv")

def initClasses():
    classes = dict([(name, cls) for name, cls in Screens.__dict__.items() if isinstance(cls, type)])
    for name, cls in classes.items():
        Factory.register(name,cls=cls)
        _class = str('Factory.'+name)
        eval(_class)()


# TODO
class QuizScreen(Screen):
    """Janela onde o Quiz é executado."""
    def __init__(self, **kwargs):
        super(QuizScreen, self).__init__(**kwargs)
        self.__build()

    def __build(self):
        """Método que constroe a interface do quiz."""
        # TODO
        for x in range(10):
            self.add_widget(Label(text="Teste", font_size=30, size_hint_y=None, height=200))


# TODO
class ErrorLabel(Label):
    """Janela Genêrica que aparece quando ocorre um erro na construção de outra janela."""
    pass


class MainScreen(Screen):
    """Classe que indica a tela principal. definida no arquivo 'main.kv'."""
    pass

class AnimalScreen(Screen):
    pass

class MyButton(ButtonBehavior, Image):
    """Classe que garante as características de um botão para uma imagem."""

    def __init__(self, **kwargs):
        super(MyButton, self).__init__(**kwargs)

#Gostaria de avisar que eu avisei!

class MainApp(App):
    """Aplicação principal."""
    screens = ['main', 'animal', 'quiz']

    sm = ScreenManager()
    sm.transition = FadeTransition()
    sm.add_widget(MainScreen(name=screens[0]))
    sm.add_widget(AnimalScreen(name=screens[1]))
    sm.add_widget(QuizScreen(name=screens[2]))

    def __init__(self, **kwargs):
        super(MainApp, self).__init__(**kwargs)
        Window.bind(on_keyboard=self._onBackBtn)
        self.lastScreen = []

    def on_stop(self):
        return True

    def _onBackBtn(self, window, key, *args):
        if key == 27:
            try:
                #TODO
                self.sm.current = self.lastScreen.pop()
                return True
            except Exception:
                self.stop()
        return False

    #TODO?
    def _ScreenFactory(self, name):
        _class = str('Factory.'+name)
        self.sm.add_widget(eval(_class)())
        self._nextScreen(name)

    def _nextScreen(self, name=''):
        if name:
            self.sm.current = name

    def build(self):
        Window.size = (520, 740)
        initClasses()
        return self.sm


if __name__ == '__main__':
    MainApp().run()
