from kivy.app import App
from kivy.uix.carousel import Carousel
from kivy.uix.image import Image
from kivy.lang import Builder
from kivy.uix.screenmanager import ScreenManager, Screen

Builder.load_string('''
<Teste>:
    FloatLayout:
        Label:
            text: 'teste'
            size_hint:(.3,.3)
            pos_hint: {'top': 0.9, 'center_x':.3}
        Carousel:
            size_hint:(.2,.2)
            pos_hint:{'top': 0.9, 'center_x':.15}
            Image:
                source: 'Images/img1.jpg'
            Image:
                source: 'Images/img2.jpg'
''')

class Teste(Screen):
    pass

class Main(ScreenManager):
    pass
class Livro(App, Carousel):
    def build(self):
        m = Main()
        t = Teste()
        m.add_widget(t)
        return m
Livro().run()
