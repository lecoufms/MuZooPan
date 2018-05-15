<<<<<<< HEAD
=======

>>>>>>> e8483d6ab3f7ff442f35f384c19648894864e04a
#-*- encoding:utf-8 -*-
from kivy.app import App
import os, glob,json#, camera
from kivy.lang import Builder
from kivy.logger import Logger
from src.screens import Screens
from kivy.uix.label import Label
from kivy.factory import Factory
from kivy.uix.image import Image
from kivy.core.window import Window
from kivy.config import ConfigParser
from kivy.properties import NumericProperty
from kivy.uix.settings import SettingsWithTabbedPanel
from kivy.uix.screenmanager import ScreenManager, Screen, FadeTransition
from kivy.uix.behaviors import ButtonBehavior
from src.modules import read_json, text_functions

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
        "key": "game_volume"
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
    #detector = camera.ZbarQrcodeDetector()

    def __init__(self, **kwargs):
        super(MainApp, self).__init__(**kwargs)
        Window.bind(on_keyboard=self._onBackBtn)
        initClasses()
        self.lastScreen = []
        self._ScreenFactory('MainScreen')

    def on_stop(self):
        return True

    def on_pause(self):
        self.on_stop()
        return True

    def arquivo_pontuacao(self):
<<<<<<< HEAD
        os.remove(os.path.join(os.path.dirname('__file__'),'files','quiz','tela_final','pontuacao.json'))
=======
        try:
            f = open(os.path.join('files','quiz','tela_final','pontos.json'), 'w')
            tes=read_json.parseJson('pontuacao',dir=os.path.join('files','quiz','tela_final',''))
	    print(tes)
	    pontos=[]
	    pontos.append(tes)
	    print(pontos)
	    f.write(json.dumps(pontos, ensure_ascii=False, indent=2))
            f.close()
        except Exception as t:
            print(t,'b1.1')
            os.remove(os.path.join(os.path.dirname('__file__'),'files','quiz','tela_final','pontuacao.json'))
>>>>>>> e8483d6ab3f7ff442f35f384c19648894864e04a


    def _onBackBtn(self, window, key, *args):
        if key == 27:
            try:
                #TODO
                if self.sm.current == "quizScreen":
                    return True

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
    def _ScreenFactory(self, name, animal=''):
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

    def build_config(self, config):
        """
        Set the default values for the configs sections.
        """
        config.setdefaults("AppConfig", {
                'font_size': "text",
                'font_size': 20,
                'bg_color': "#FFFFFF",
                'game_volume': 20
            })

    def build_settings(self, settings):
        """
        Add our custom section to the default configuration object.
        """
        # We use the string defined above for our JSON, but it could also be
        # loaded from a file as follows:
        #settings.add_json_panel('My Label', self.config, 'settings.json')
        settings.add_json_panel('Acessibilidade', self.config, data=json)

    def on_config_change(self, config, section, key, value, instance):
        """self.animal
        Respond to changes in the configuration.
        """
        Logger.info("main.py: App.on_config_change: {0}, {1}, {2}, {3}, {4}".format(
            instance, config, section, key, value))

        if config is self.config:
            token = (section, key)
            if token == ('bg_color', 'FFFFFF'):
                print('Our key1 has been changed to', value)
            elif token == ('font_size', 'font_size'):
                print('Our key2 has been changed to', value)

    def close_settings(self, settings=None):
        """
        The settings panel has been closed.
        """
        Logger.info("main.py: App.close_settings: {0}".format(settings))
        super(MainApp, self).close_settings(settings)
if __name__ == '__main__':
    MainApp().run()
