#-*- encoding:utf-8 -*-
from kivy.app import App
<<<<<<< HEAD
import os,glob,json#, camera
from kivy.config import ConfigParser
from kivy.core.window import Window
from kivy.event import EventDispatcher
=======
from kivy.config import ConfigParser
from kivy.core.window import Window
import os, glob#, camera
>>>>>>> bc62a547d6156252d3ec173f3542ba62edc79911
from kivy.lang import Builder
from kivy.logger import Logger
from src.screens import Screens
from kivy.uix.label import Label
from kivy.factory import Factory
from kivy.logger import Logger
from kivy.properties import NumericProperty, StringProperty
from kivy.uix.behaviors import ButtonBehavior
from kivy.uix.image import Image
from kivy.utils import get_color_from_hex as hex
from kivy.uix.label import Label
from kivy.uix.screenmanager import ScreenManager, FadeTransition
from kivy.uix.settings import SettingsWithTabbedPanel
from src.screens import Screens

config = ConfigParser()
config.read('main.ini')


class MyButton(ButtonBehavior, Image):
    """Classe que garante as características de um botão para uma imagem."""

    def __init__(self, **kwargs):
        super(MyButton, self).__init__(**kwargs)



def initClasses():
    classes = dict([(name, cls) for name, cls in Screens.__dict__.items() if isinstance(cls, type)])
    for name, cls in classes.items():
        Factory.register(name,cls=cls)
        _class = str('Factory.'+name)
        eval(_class)()

#Gostaria de avisar que eu avisei!
json = '''
[
    {
        "type": "numeric",
        "title": "Tamanho da Fonte",
        "desc": "O tamanho da fonte referente ao texto que será exibido",
        "section": "AppConfig",
        "key": "font_size"
    },
    {  "type": "string",
        "title": "Cor do fundo",
        "desc": "A cor em hexadecimal que será utilizada na aplicação",
        "section": "AppConfig",
        "key": "bg_color"
    },
    {  "type": "numeric",
        "title": "Volume do jogo",
        "section": "AppConfig",
        "key": "volume"
    }
]
'''

class MySettingsWithTabbedPanel(SettingsWithTabbedPanel):
    """
    It is not usually necessary to create subclass of a settings panel. There
    are many built-in types that you can use out of the box
    (SettingsWithSidebar, SettingsWithSpinner etc.).
    You would only want to create a Settings subclass like this if you want to
    change the behavior or appearance of an existing Settings class.
    """
    def on_close(self):
        Logger.info("main.py: MySettingsWithTabbedPanel.on_close")

    def on_config_change(self, config, section, key, value):
        Logger.info(
            "main.py: MySettingsWithTabbedPanel.on_config_change: "
            "{0}, {1}, {2}, {3}".format(config, section, key, value))


class MainApp(App):
    """Aplicação principal."""
    settings_cls = MySettingsWithTabbedPanel
    sm = ScreenManager()
    value = NumericProperty()
    sm.transition = FadeTransition()
<<<<<<< HEAD

=======
>>>>>>> bc62a547d6156252d3ec173f3542ba62edc79911
    caminho = os.path.realpath(os.path.join(os.path.dirname('__ file__'), 'fonts', 'MontserratBold'))+'.ttf'
    fonts_path = {"font_txt": caminho, "font_titulo": os.path.realpath(os.path.join(os.path.dirname('__ file__'), 'fonts', 'ComicaBDBold'))+'.ttf'}
    config_bg = Label()
    config_font_size = Label()
    config_volume = Label()
    config_bg.text=config.get("AppConfig","bg_color")
    config_font_size.text = config.get("AppConfig","font_size")
<<<<<<< HEAD
    config_volume.text = config.get("AppConfig","volume")   
	
=======
    config_volume.text = config.get("AppConfig","volume")
>>>>>>> bc62a547d6156252d3ec173f3542ba62edc79911
    #detector = camera.ZbarQrcodeDetector()

    def __init__(self, **kwargs):
        super(MainApp, self).__init__(**kwargs)
        Window.bind(on_keyboard=self._onBackBtn)
        initClasses()
        self.lastScreen = []
        self._ScreenFactory('MainScreen')

    def on_stop(self):
        return True

    def bg_color_callback(self, instance, value):
        if value:
            self.config_bg.text = "#28A09F"
        else:
            self.config_bg.text =  "#0088B7"

    def font_callback(self, value, instance):
        if value > 0:
            if int(self.config_font_size.text) < 30:
                self.config_font_size.text = str(int(self.config_font_size.text)+value)
        else:
            if int(self.config_font_size.text) > 15:
                self.config_font_size.text = str(int(self.config_font_size.text)+value)

    def on_pause(self):
        self.on_stop()
        return True

    def arquivo_pontuacao(self):
        os.remove(os.path.join(os.path.dirname('__file__'),'files','quiz','tela_final','pontuacao.json'))

    def _onBackBtn(self, window, key, *args):
        if key == 27:
            try:
                #TODO
                if self.sm.current == "QuizScreen2":
                    return True
                if self.sm.current == "AnimalScreen" and self.lastScreen:
                    self.sm.current = "QuizScreen2"
                    return True;

                if self.sm.current == "PremioScrenn":
                    self.sm.current = "About"
                    return False;

                if self.sm.current != 'MainScreen':
                    self.sm.current = 'MainScreen'

                else:
                    raise Exception
                return True
            except Exception:
                if os.path.exists(os.path.join('files','quiz','tela_final','pontuacao.json')):
                    self.arquivo_pontuacao()
                self.stop()
        return False

    #TODO?
    def _ScreenFactory(self, name, animal='',**kwargs):
        try:
            if kwargs['vimDoQuiz']:
                self.lastScreen = True
        except:
            self.lastScreen = False
        _class = str('Factory.'+name)
        if animal:
            _class = eval(_class)(animal)
        else:
            _class = eval(_class)()
        self.sm.add_widget(_class)
        self._nextScreen(name)

    def _nextScreen(self, name=''):
        if name:
            self.sm.current = name

    def build(self):
        return self.sm

	def build(self):
		self.icon = "/files/app/icons/icone.ico"

    def build_config(self, config):
        """
        Set the default values for the configs sections.
        """
        config.setdefaults("AppConfig", {
                'font_size': "text",
                'font_size': 30,
                'bg_color': "#FFFFFF",
                'volume': 20
            })

    def build_settings(self, settings):
        """
        Add our custom section to the default configuration object.
        """
        # We use the string defined above for our JSON, but it could also be
        # loaded from a file as follows:
        #settings.add_json_panel('My Label', self.config, 'settings.json')
        settings.add_json_panel('Acessibilidade', self.config, data=json)

    def on_config_change(self, config, section, key, value):
        """self.animal
        Respond to changes in the configuration.
        """
        Logger.info("main.py: App.on_config_change: {0}, {1}, {2}, {3}".format(config, section, key, value))

        if config is self.config:
            token = (section, key)
            if 'bg_color' in token:
                print('Our key1 has been changed to', value)
                self.config_bg.text = value
            elif 'font_size' in token:
                self.config_font_size.text = value

    def close_settings(self, settings=None):
        """
        The settings panel has been closed.
        """
        Logger.info("main.py: App.close_settings: {0}".format(settings))
        super(MainApp, self).close_settings(settings)

if __name__ == '__main__':
    MainApp().run()
