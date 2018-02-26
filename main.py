import os

from kivy.app import App
from kivy.lang import Builder
from kivy.uix.image import Image
from kivy.uix.label import Label
from kivy.core.window import Window
from kivy.uix.scrollview import ScrollView
from kivy.uix.behaviors import ButtonBehavior
from kivy.uix.screenmanager import ScreenManager, Screen, FadeTransition

Builder.load_file("src/kv_files/main.kv")
Builder.load_file("src/kv_files/scrollv.kv")
Builder.load_file("src/kv_files/animalscreen.kv")

class ScrollableScreen(Screen, ScrollView):
    """Responsible class to make all the other screens classes scrollable."""

    def __init__(self, **kwargs):
        """The method below just ensures the inheritance.
        :param kwargs: instance(required param)
        """
        super(ScrollableScreen, self).__init__(**kwargs)

    def _add_widget(self, widget):
        """
        Method to add a widget to the box layout inside the ScrollableView inheritance.
        :param widget: Widget to be included in the scrollable layout.
        :return: None
        """
        self.ids.box.add_widget(widget)


class QuizScreen(ScrollableScreen):
    """Classe que representa a tela de quiz. Ainda não está implementada, pois aguarda a conclusão da modelagem deste
    quiz. """

    def __init__(self, **kwargs):
        """
        Método responsável por inicializar a tela de quiz.
        :param kwargs: Parâmetros obrigatórios que indicam a instância da aplicação.
        """
        super(QuizScreen, self).__init__(**kwargs)
        self.build()  # Constroe a interface

    def build(self):
        """
        Teste de inserção de widgets na tela rolável a qual esta classe herda as características.
        :return: None
        """
        for x in range(10): self._add_widget(Label(text="Teste", font_size=30, size_hint_y=None, height=200))

class ErrorLabel(Label):
    pass


class AnimalScreen(Screen):
    """Classe que representa a tela que contém as informações de um animal."""
    def __init__(self, name, **kwargs):
        """
        :param name: Animal a ser exibido, que vêm do QrCode;
        :param kwargs: Parâmetro obrigatório referente à instância da aplicação.
        """
        super(AnimalScreen, self).__init__(**kwargs)
        self.name = name
        self.build()
    def build(self):
        try:
            if os.path.exists('files/animals/'+self.name+'/icons/'):
                self.ids.sv.box.Label.text = name
            else:
                pass

        except:
            self.ids._text = "Não deu"


class MainScreen(Screen):
    """
    Classe que indica a tela principal. Como não há movimento (a priori) foi inteiramente definida no arquivo 'main.kv'.
    """
    pass


class MyButton(ButtonBehavior, Image):
    """
    Classe que garante as características de um botão para uma imagem.
    """

    def __init__(self, **kwargs):
        super(MyButton, self).__init__(**kwargs)


class MainApp(App):
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

    def onBackBtn(self, window, key, *args):
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

    def Nextscreen(self):
        if self.nextScreen < len(self.screens):
            self.sm.current = self.screens[self.nextScreen]
            self.nextScreen += 1
        else:
            self.nextScreen = 1
            self.lastScreen = 0
            self.sm.current = self.screens[0]

    def build(self):
        Window.size = (520, 740)
        return self.sm


if __name__ == '__main__':
    MainApp().run()
