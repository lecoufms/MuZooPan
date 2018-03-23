
# -*- encoding : utf-8 -*-
import kivy, os, glob
from kivy.app import App
from kivy.uix.carousel import Carousel
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button
from kivy.uix.image import Image

class MainApp(App):
    def build(self):
        c = Carousel()
        mypath = 'files/animals/jaguatirica/images/'
        for f in glob.glob(os.path.join(mypath,'*')):
            pic = Image(source=f)
            c.add_widget(pic)
        layout = BoxLayout(orientation='vertical')
        layout.add_widget(c)
        layout.add_widget(Button(text="next"))
        return layout

MainApp().run()
