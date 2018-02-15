from kivy.app import App
from kivy.lang import Builder
from kivy.uix.image import Image
from kivy.core.window import Window
from kivy.uix.widget import Widget
from kivy.properties import StringProperty
from kivy.uix.gridlayout import GridLayout
from kivy.uix.scrollview import ScrollView
from kivy.uix.behaviors import ButtonBehavior
from kivy.uix.screenmanager import ScreenManager, Screen, FadeTransition

Builder.load_file('main.kv')


class ScrollableScreen(Screen, ScrollView):
    pass


class VideoScreen(ScrollableScreen):
    pass


class QuizScreen(ScrollableScreen):
    pass


class AnimalScreen(ScrollableScreen, Widget, animal=''):
    r = StringProperty()

    def __init__(self, **kwargs):
        super(AnimalScreen, self).__init__(**kwargs)
        self.name = 'animal'
        _animal = animal
        layout = GridLayout(cols=1, spacing=10, size_hint_y=None)
        layout.bind(minimum_height=layout.setter('height'))
        self.size_hint=(1, None)
        self.size=(Window.width, Window.height)
        self.add_widget(layout)

    def build(self, json_object):
        #PlaceHolder
        x = json_object
        return x
        #/PlaceHolder

class MainScreen(Screen):
    pass

class MyButton(ButtonBehavior, Image):
    def __init__(self, **kwargs):
        super(MyButton, self).__init__(**kwargs)

class ScreenManagement(ScreenManager):
    pass


class MainApp(App):
    lastScreen = 0
    nextScreen = 1
    screens = ['main', 'animal', 'quiz']

    sm = ScreenManagement()
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
