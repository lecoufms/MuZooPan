import kivy
from os import path
from kivy.app import App
from kivy.clock import Clock
from kivy.core.window import Window
from kivy.core.audio import SoundLoader
from kivy.lang import Builder, Parser, ParserException
from kivy.properties import StringProperty
from kivy.uix.label import Label
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.screenmanager import ScreenManager, Screen, FadeTransition
from kivy.uix.widget import Widget
from kivy.uix.scrollview import ScrollView


Builder.load_string("""
<QuizScreen>:
    BoxLayout:
        orientation:'vertical'
        Label:
            text:'Quiz'
        Button:
            text:'inicar'
            on_release: app.Nextscreen()

<AnimalScreen>:
    canvas.before:
        Color:
            rgba: 1, 1, 1, 1
        Rectangle:
            pos: self.pos
            size: self.size
    ScrollView:
    	size_hint: 1, None
        FloatLayout:
            Label:
                size_hint_y: None
                height: self.texture_size[1]
                halign: 'center'
                valign: 'middle'
                text_size: self.width, None
                text: 'O urso-negro (Ursus americanus), também conhecido como baribal, é um urso norte-americano, encontrado do Alasca ao Norte do México. Alcança 2,20 m de comprimento, 1,10 m de altura na cernelha e 360 kg de peso. O urso negro geralmente vive cerca de 15 anos, mas alguns podem alcançar até 40 anos. É um bom nadador e pode correr a até 50 km/h.[3][4] Sua pelagem pode ser de cor negra, marrom, bege ou branca.[5] Algumas subespécies estão ameaçadas de extinção.\\nA aparência do urso-negro é a de um animal grande e feroz, no entanto, 70% de sua dieta consiste de material vegetal - frutos, nozes, gramíneas, raízes e seiva de árvores. Também se alimenta de carne, geralmente de pequenos mamíferos e peixes, raramente se alimenta de grandes animais.[4] Gosta de vasculhar os depósitos de resíduos do homem.\\nDesde pequeno, o urso-negro tem grande habilidade para subir em árvores e montanhas. É principalmente um habitante da floresta, mas sua pelagem espessa permitiu que se dispersasse para o norte até os limites da tundra. No inverno, hiberna em uma toca, geralmente um oco sob uma árvore caída, dentro de um tronco toco ou em uma toca abandonada.\\nO urso-negro costuma se alimentar com frutos silvestres no outono, a fim de acumular gordura para hibernar. Logo ele procura um abrigo adequado à hibernação, durante a qual a temperatura do corpo, os batimentos cardiacos e a taxa respiratoria diminuem para poupar energia.'
                color: 0, 0, 0, 1
	        Carousel:
	            size_hint:(.4,.3)
	            pos_hint:{'top': 1, 'center_x':.15}
	            Image:
	                source: 'Images/urso1.jpg'
	            Image:
	                source: 'Images/urso2.jpg'
	        Label:
	            text: root.r
	            size_hint: (.4,.4)
	            pos_hint: {'top': 1.065, 'center_x':.7}
	            color: 0, 0, 0, 1
	        Button:
	            on_release: app.Nextscreen()
	            size_hint: (.8, .3)
	            pos_hint: {'top': .35, 'center_x':.5}
	            background_color: [100,100,100,0]
	            Image:
	                source: 'Images/ursinho.jpg'
	                size: (200,300)
	                center_x: self.parent.center_x
	                center_y: self.parent.center_y
	                allow_stretch: True
	            Image:
	                source: 'Icons/video.png'
	                size: (50,50)
	                center_x: self.parent.center_x
	                center_y: self.parent.center_y
	                allow_stretch: True
	        ActionButton:
	            pos_hint:{'top':1,'center_x':.4}
	            size_hint:(.08,.08)
	            text: 'Btn0'
	            icon: 'atlas://data/images/defaulttheme/audio-volume-high'
<MainScreen>:
    canvas.before:
        Color:
            rgba: 1, 1, 1, 1
        Rectangle:
            pos: self.pos
            size: self.size
    FloatLayout:
        Label:
            pos_hint: {'top':1.35, 'center_x':.5}
            Image:
                source: 'Images/logot.png'
                size: (300,300)
                center_x: self.parent.center_x
                center_y: self.parent.center_y
                allow_stretch: True
        Button:
            on_release: app.Nextscreen()
            size_hint: (.68,.45)
            pos_hint: {'top':.7, 'center_x':.5}
            background_color: [.46,1.39,.87,.8]
            Image:
                source: 'Icons/cam.png'
                size: (50,50)
                center_x: self.parent.center_x
                center_y: self.parent.center_y
                allow_stretch: True
""")

class VideoScreen(Screen):
    pass

class QuizScreen(Screen):
    pass

class AnimalScreen(Screen, Widget):
    r = StringProperty()
    def __init__(self, **kwargs):
        super(AnimalScreen, self).__init__(**kwargs)
        self.name = 'animal'
        text = []
        for line in [['Animalia', 'Reino'], ['Chordata', 'Filo'], ['Mammalia', 'Classe'], ['Carnivora','Ordem'], ['Ursidae', 'Família'], ['Ursus', 'Gênero'],['Ursus americanus', 'Espécie']]:
            text.append(('{1:.<20}..{0:.>20}'.format(*line)))
        text = '\n'.join(text)
        self.r = str(text)

class MainScreen(Screen):
    pass

class ScreenManagement(ScreenManager):
    pass

class AboutScreen(Screen):
    def __init__(self,**kwargs):
        super(AboutScreen,self).__init__(**kwargs)
        


class MainApp(App):

    lastScreen = 0
    nextScreen = 1
    screens = ['main','animal','quiz']

    sm = ScreenManagement()
    sm.transition = FadeTransition()
    sm.add_widget(MainScreen(name=screens[0]))
    sm.add_widget(AnimalScreen(name=screens[1]))
    sm.add_widget(QuizScreen(name=screens[2]))

    def __init__(self, **kwargs):
        super(MainApp,self).__init__(**kwargs)
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
            self.nextScreen+=1
        else:
            self.nextScreen = 1
            self.lastScreen = 0
            self.sm.current = self.screens[0]
    def build(self):   
        Window.size = (520,740)
        return self.sm

if __name__ == '__main__':
    MainApp().run()