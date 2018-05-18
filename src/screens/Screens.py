#-*- coding: utf-8 -*-
import os,glob,json
from kivy.lang import Builder
from kivy.uix.image import Image
from kivy.uix.button import Button
from kivy.uix.widget import Widget
from kivy.uix.label import Label
from kivy.uix.carousel import Carousel
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.floatlayout import FloatLayout
from kivy.uix.gridlayout import GridLayout
from kivy.uix.screenmanager import Screen
from kivy.graphics import Rectangle, Color
from kivy.uix.scrollview import ScrollView
from src.modules import read_json, text_functions
from kivy.properties import StringProperty, NumericProperty,ObjectProperty
from kivy.uix.relativelayout import RelativeLayout
from kivy.utils import get_color_from_hex
from kivy.core.audio import SoundLoader
from kivy.uix.slider import Slider
from kivy.clock import Clock

Builder.load_file("src/kv_files/main.kv")
Builder.load_file("src/kv_files/scrollv.kv")
Builder.load_file("src/kv_files/animalscreen.kv")
Builder.load_file("src/kv_files/quizscreen.kv")
Builder.load_file("src/kv_files/mainpremiacao.kv")
Builder.load_file("src/kv_files/sobre.kv")

def menu_decorator(func):
    def wrapper(instance, main_panel, *args):
        from kivy.uix.boxlayout import BoxLayout
        from kivy.uix.label import Label
        from kivy.uix.button import Button
        from kivy.uix.popup import Popup
        from src.modules.navigationdrawer import NavigationDrawer
        from kivy.app import App
        from functools import partial
        from kivy.uix.switch import Switch
        nvdrawer = NavigationDrawer()
        side_panel = BoxLayout(orientation='vertical',padding=6)
        side_panel.add_widget(Label(text='Opções',font_size=30,font_name= App.get_running_app().fonts_path['font_titulo']))

        grid = GridLayout(cols=2)
        btnPlus = Button(text="A+")
        btnPlus.bind(on_release=partial(App.get_running_app().font_callback,5))
        btnLess = Button(text="A-")
        btnLess.bind(on_release=partial(App.get_running_app().font_callback,-5))
        grid.add_widget(btnPlus)
        grid.add_widget(btnLess)
        side_panel.add_widget(grid)

        gridAltocontraste = GridLayout(cols=2)
        gridAltocontraste.add_widget(Label(text="Alto Contraste: "))
        switchContraste = Switch(active=False)
        switchContraste.bind(active=App.get_running_app().bg_color_callback)
        gridAltocontraste.add_widget(switchContraste)
        side_panel.add_widget(gridAltocontraste)

        nvdrawer.add_widget(side_panel)
        img = Button(size_hint=(.5, .07), pos_hint={"right": .1, "center_y": .97})
        img.background_color = (1, 12, 14, 1)
        img.bind(on_press=nvdrawer.toggle_state)
        main_panel.add_widget(img)
        nvdrawer.add_widget(main_panel)
        nvdrawer.anim_type = "slide_above_anim"

        return nvdrawer

    return wrapper

class ScrollableScreen(ScrollView, Screen):
    """Janela rolável que herda as características de uma janela e um widget rolável.
       As características genêricas desta janela estão inclusas e descritas no arquivo '.kv'."""

    def __init__(self, **kwargs):
        super(ScrollableScreen, self).__init__(**kwargs)  # Garante que a herança das características seja feita.

    def _add_widget(self, widget):
        """Este método insere um widget passado como parâmetro para o BoxLayout dentro desta janela."""
        self.ids['box'].add_widget(widget)

class Animal(FloatLayout):
    path=os.path.realpath (os.path.join (os.path.dirname ('__ file__'), 'files','animals','sounds'))

    sound = ObjectProperty(None)
    position_slider_sound=NumericProperty(0)
    slider=ObjectProperty(None)
    sounds= ObjectProperty(None, allownone=True)
    button=ObjectProperty(None)
    event=ObjectProperty(None)
    name = StringProperty('')

    habitat = StringProperty('')
    curiosidades = StringProperty('')
    reproducao = StringProperty('')
    caracteristicas = StringProperty('')

    def __init__(self,name='', **kwargs):
        super(Animal, self).__init__(**kwargs)
        if not name:
            return
        self.add_widget(self.load_widgets(name))

    def play(self):
        if self.sound :
            if self.sound.state == 'stop':
                self.sound.play()
            else:
                self.sound.stop()

    def up_sound(self,there, name):
        mypath=os.path.join (self.path, there,'')
        self.sound=SoundLoader.load(mypath+name+'.wav')

    def altera_tabbed_panel(self, *args):
    	print(args, '1')
    	if args != None:
            if self.sounds != None:
                self.sounds.stop()
                self.button.background_normal = os.path.realpath (os.path.join (os.path.dirname ('__ file__'), 'files','app','icons','play'))+'.png'
                self.stoop(self.button)



    def stoop(self,args):
        print(args)
        if abs(self.slider.value - self.slider.max) <0.99 or args == self.button:
            self.sounds=None
            Clock.unschedule(self.event)
            self.slider.value=0
            self.position_slider_sound=0
            self.button.background_normal = os.path.realpath (os.path.join (os.path.dirname ('__ file__'), 'files','app','icons','play'))+'.png'
            if self.sounds == None:
                print('None')
            print('merda')
        else:
            print('nope')



    def sounds_change(self,sounds, value): #, instance, value):
        if value > 0:
            sounds.seek(value)

    def slider_change(self,dt):
        print(self.slider.value)
        if  abs(self.sounds.get_pos()- self.slider.value) < 0.1:
            if self.position_slider_sound == 0 and self.sounds.state == 'stop':
                self.slider.value=self.position_slider_sound
            elif self.position_slider_sound > 0 and self.sounds.state == 'stop':
                self.slider.value=self.position_slider_sound
            else:
                self.slider.value += dt
        else:
            print( 'value:',self.slider.value, 'sounds:',self.sounds.get_pos())
            self.sounds_change(self.sounds,self.slider.value)

    def up_sounds(self, button, slider,there,name,panel,tabbed_panel):
        if self.sounds == None:
            self.button=button
            cname=panel.lower()+'_'+name.lower()
            mypath=os.path.join(self.path, there,'')
            self.sounds = None
            self.sounds = SoundLoader.load(mypath+cname+'.mp3')
            self.sounds.bind(on_stop=self.stoop)
            self.slider = slider
            self.slider.max= self.sounds.length
            self.slider.value = 0
            tabbed_panel.bind(current_tab=self.altera_tabbed_panel)
            self.event=Clock.schedule_interval(self.slider_change, 0.1)

    def plays(self):
        if self.sounds.state == 'stop' and self.position_slider_sound > 0:
            self.sounds.play()
            self.sounds_change(self.sounds,self.position_slider_sound)
            self.event()
            self.button.background_normal = os.path.realpath (os.path.join (os.path.dirname ('__ file__'), 'files','app','icons','pause'))+'.png'
        elif self.sounds.state == 'stop':
            self.sounds.play()
            self.event()
            self.button.background_normal = os.path.realpath (os.path.join (os.path.dirname ('__ file__'), 'files','app','icons','pause'))+'.png'
        elif self.sounds.state == 'play':
            self.position_slider_sound=self.sounds.get_pos()
            self.sounds.stop()
            Clock.unschedule(self.event)
            self.button.background_normal = os.path.realpath (os.path.join (os.path.dirname ('__ file__'), 'files','app','icons','play'))+'.png'


    def load_widgets(self, name, *args):
        from kivy.graphics import Color, Rectangle
        try:
            mypath = str('files/animals/' + name + '/')  # Diretório base
            layout = RelativeLayout()
            j_info = read_json.parseJson(name, dir=str(mypath + 'info/'))  # Função que formata o Json

            self.name = j_info['nome do animal']
            #layout.add_widget(Label(text=j_info['nome do animal'], pos_hint={"right": 1, "center_y": .9})) Com problema

            self.up_sound('animals',name)

            self.change_text(j_info)
            layout.add_widget(self.__load_images(mypath))
            return layout
        except Exception as e:
            print(e,'b1')
            return Label(text=" Deu Ruim! ")

    def change_text(self,j):

        self.habitat = j['habitat']
        self.curiosidades = j['curiosidades']
        self.reproducao = j['reproducao']
        self.caracteristicas = j['caracteristicas']

    def __load_images(self, mypath):
        """Método que carrega as imagens e retorna um objeto Carrossel com as imagens encontradas."""
        carousel = Carousel(pos_hint={"center_x": .5, "center_y": .7},size_hint=(.8, None))
        for diretorio in glob.glob(os.path.join(mypath, 'images/', '*')):
            image = Image(source=diretorio)
            carousel.add_widget(image)
        return carousel


# TODO
class ErrorLabel(FloatLayout ):
    """Janela Genêrica que aparece quando ocorre um erro na construção de outra janela."""
    pass

class mainScreen(FloatLayout):
    pass


class PremioScrenn(Screen):

    t_score = NumericProperty(.2)
    t_score2 = StringProperty()
    t_correct = StringProperty()
    t_bonus = StringProperty()
    t_cons = StringProperty()
    t_cons2 = NumericProperty()
    t_total_porcetagem = NumericProperty()
    t_score0 = NumericProperty()
    questions = NumericProperty()
    text_prop = NumericProperty()
    resultado = NumericProperty(.2)
    CACHE_FOLDER_NAME = os.path.realpath (os.path.join (os.path.dirname ('__ file__'), 'files','quiz' ))
    path=os.path.join(CACHE_FOLDER_NAME,'')
    path2=os.path.join(path,'tela_final','')
    
    def __init__(self,**kwargs):
        super(PremioScrenn, self).__init__(**kwargs)
        self.name = "PremioScrenn"
        self.__getpontuacao()

    def __getpontuacao(self, name = ''):

        try:
            if os.path.exists(os.path.join('files','quiz','tela_final','pontuacao.json')):
                score = os.path.join(self.path2,'pontuacao') #Diretório base
                j_info_score = read_json.parseJson(name, dir=score) #Função que formata o Json
                # retorno try dicionario se nao conseguir uma lista que contem na primeira posicao um dicionario
                self.t_score2 = str(j_info_score['pontos'])
                if(j_info_score['acertos'] != 0):
                    self.t_correct = str(j_info_score['acertos'])
                else:
                    self.t_correct = "0"

                if(j_info_score['bonus'] != 0):
                    self.t_bonus = str(j_info_score['bonus'])
                else:
                    self.t_bonus = "0"

                if (j_info_score['revisao'] != 0):
                    self.t_cons = str(j_info_score['revisao'])
		    self.t_cons2 = j_info_score['revisao']
                else:
                    self.t_cons = "0"

                self.questions = j_info_score['total_question']
                self.score0 = j_info_score['pontos']
                self.t_total_porcetagem = (self.questions - 3) * 150 + (3 * 100)
                self.resultado = (self.score0 * 100)
                self.resultado = (self.resultado/self.t_total_porcetagem)
                self.t_score = self.resultado
		self.text_prop = 28
                self.sounds('premiacao')
        except Exception as d:
            print(d,'b2')


    def sounds(self,name):
        name='files/app/sounds/'+name+'.wav'
        som=SoundLoader.load(name)
        if som and self.questions > 0:
            som.play()

class MainScreen(Screen):
    """Classe que indica a tela principal. definida no arquivo 'main.kv'."""
    def __init__(self,**kwargs):
        super(MainScreen, self).__init__(**kwargs)
        self.name = "MainScreen"
        self.add_widget(self.build(mainScreen()))

    @menu_decorator
    def build(self, widget):
        return widget

#Modelo de uso! Em breve estará documentado.
class AnimalScreen(Screen):
    """Tela que contém as informações de um animal."""

    def __init__(self, name='', **kwargs):
        super(AnimalScreen, self).__init__(**kwargs)
        if not name:
            return
        self.name = "AnimalScreen"
        widget = self.build(
            Animal(name)
            )
        self.add_widget(widget)

    @menu_decorator
    def build(self, widget):
        return widget

    @staticmethod
    def getKvMarkup():
        x = """

        """
        return x

class quizScreen(FloatLayout):
    """Tela QuizScreen."""
    list_dir={}
    list_file=[]
    pontos={}
    total=NumericProperty(0)
    falta=NumericProperty(0)
    Obonus=NumericProperty(0)
    momento= ObjectProperty(None, allownone=True)
    resposta = ObjectProperty(None, allownone=True)
    im1 = ObjectProperty(None, allownone=True)
    im2 = ObjectProperty(None, allownone=True)
    path = os.path.realpath (os.path.join (os.path.dirname ('__ file__'), 'files','quiz'))
    path=os.path.join (path,'')
    path2=os.path.join(path,'tela_final','')
    pathIm=StringProperty(os.path.realpath (os.path.join (os.path.dirname ('__ file__'), 'files','app', 'icons','bar_0'))+'.png')
    def __init__(self, **kwargs):
        super(quizScreen, self).__init__(**kwargs)
        self.setpontuacao()
        self.load_file()
        self.arrumatudo()

    def setpontuacao(self):
        try:
            if os.path.exists(os.path.join(self.path2,'pontuacao.json')):
                try:
                    self.pontos=read_json.parseJson('pontuacao',dir=os.path.join(self.path2,''))
                except Exception as e:
                    print(e)
            else:
                self.pontos['pontos']=0
                self.pontos['acertos']=0
                self.pontos['revisao']=0
                self.pontos['bonus']=0
                self.pontos['total_question']=0
                self.saveN()
        except Exception as t:
            print(t)

    def list_json(self):
        for i,el in enumerate(self.list_file):
            if not el.endswith(".json"):
                self.list_file.pop(i)
        self.list_file = [el.replace(".json","") for el in self.list_file]

    def load_file(self):
        try:
            self.list_file= [f for f in os.listdir(self.path) if os.path.isfile(os.path.join(self.path, f))]
            self.list_json()
            for x in self.list_file:
                self.list_dir[x]=((read_json.parseJson(x,dir=self.path)))
        except Exception as t:
            print(t,'b3')

        try:
            self.total=len(self.list_file)
            self.pontos['total_question']=self.total
        except Exception as t:
            print(t,'b4')

    def define_quem_e_o_cara(self):
        import random
        random.shuffle(self.list_file)
        if self.list_file:
            testete=self.list_file[0]
            self.list_file.pop(0)
            self.momento = testete

    def arrumatudo(self):
        self.arruma_pontuacao()
        self.ids.quantidade_perguntas.text=str(self.getfalta()) +'/'+ str(self.gettotal())
        self.define_quem_e_o_cara()
        try:
            testet=self.list_dir[self.momento]
            self.ids.pergunta.text = testet['Insira o texto para pergunta'].encode('UTF-8')
            self.ids.button1.text = 'A) '+ testet['alternativa a'].encode('UTF-8')
            self.ids.button2.text = 'B) '+ testet['alternativa b'].encode('UTF-8')
            self.ids.button3.text = 'C) '+ testet['alternativa c'].encode('UTF-8')
            self.ids.button4.text = 'D) '+ testet['alternativa d'].encode('UTF-8')
        except Exception as e:
            print(e,'b5')

    def gettotal(self):
        return self.total

    def gettamanho_lista_file(self):
        return len(self.list_file)

    def getfalta(self):
        rr=self.total-self.gettamanho_lista_file()+1
        return rr

    def saveN(self):
        try:
            f = open(os.path.join(self.path2,'pontuacao.json'), 'w')
            testew = dict(pontos=self.pontos['pontos'], acertos=self.pontos['acertos'], revisao=self.pontos['revisao'], bonus=self.pontos['bonus'], total_question=self.pontos['total_question'])
            tes = []
            tes.append(testew)
            f.write(json.dumps(tes, ensure_ascii=False, indent=2))
            f.close()
        except Exception as t:
            print(t,'b7')

    def verifica_resposta(self):
        testetete=self.list_dir[self.momento]
        texto_verificar= '{}'.format( self.press_state.text).lower()
        if (testetete['insira a resposta correta']) == texto_verificar[0:1]:
            return True
        else:
            return False

    def arruma_pontuacao(self):
        self.ids.label_quantidade_acertos.text=str(self.pontos['acertos'])
        self.ids.label_quantidade_pontos.text=str(self.pontos['pontos'])

    def sounds(self,name):
        name='files/app/sounds/'+name+'.wav'
        som=SoundLoader.load(name)
        if som:
            som.play()

    def altera_quando_certo(self):
        self.press_state.state='normal'
        self.press_state.background_color = get_color_from_hex('#0cff00')
        self.im1 = Image(id='im1',source = os.path.realpath (os.path.join (os.path.dirname ('__ file__'), 'files','app', 'icons','correct'))+'.png',pos=(self.press_state.x/6,self.press_state.y-7), size_hint=(0.1,0.1))
        self.sounds('correct')

    def alternativa_correct(self):
        testetete=self.list_dir[self.momento]
        for key, val in self.ids.items():
            te='{}'.format( val.text).lower()
            if te[0:1] == testetete['insira a resposta correta']:
               return val

    def altera_quando_errado(self):
        self.im2 = Image(id='im2',source=os.path.realpath (os.path.join (os.path.dirname ('__ file__'), 'files','app', 'icons','incorrect'))+'.png', pos=(self.press_state.x / 6, self.press_state.y-7), size_hint=(0.1,0.1))
        self.press_state.state='normal'
        self.press_state.background_color = get_color_from_hex('#fe0a00')
        self.resposta=self.alternativa_correct()
        self.resposta.state='normal'
        self.im1=Image(id='im1',source = os.path.realpath (os.path.join (os.path.dirname ('__ file__'), 'files','app', 'icons','correct'))+'.png',pos=(self.resposta.x/6,self.resposta.y-7), size_hint=(0.1,0.1))
        self.resposta.background_color = get_color_from_hex('#0cff00')
        self.sounds('incorrect')

    def tela_premio(self):
        from kivy.app import App
        self.saveN()
        App.get_running_app()._ScreenFactory("PremioScrenn")


    def controler_proximo(self,teste):
        self.remove_widget(self.im1)
        self.im1 = None
        if not self.im2 == None:
            self.remove_widget(self.im2)
            self.resposta.background_color = get_color_from_hex('#fffeff')
            self.im2 = None
        if self.gettamanho_lista_file() == 0:
            self.tela_premio()
        self.Disabled()
        teste.background_color = get_color_from_hex('#fffeff')
        teste.state='normal'
        self.ids.confirmar.text='CONFIRMAR'
        self.ids.confirmar.disabled=True
        self.arrumatudo()

    def altera_barra(self):
        te=self.ids.image_quantidade_acertos.source
        st=None
        if self.bonus == 0:
            st=te[:-5]+'0.png'
        elif self.bonus == 1:
            st=te[:-5]+'1.png'
        elif self.bonus == 2:
            st=te[:-5]+'2.png'
        elif self.bonus == 3:
            st=te[:-5]+'3.png'
        if self.bonus >= 3:
            st=te[:-5]+'4.gif'
        self.ids.image_quantidade_acertos.source = str(st)

    def pontuacao_update(self):
        p=100
        if self.qnt_revisao > 0:
            while p > 0 and self.qnt_revisao > 0:
                p-=50
                self.qnt_revisao=self.qnt_revisao-1
        if self.bonus >= 4:
            p+=50
        self.pontos['bonus'] = self.Obonus
        self.pontos['pontos'] += p
        self.pontos['acertos'] += 1


    def Disabled(self):
        self.ids.button1.disabled= not self.ids.button1.disabled
        self.ids.button2.disabled=not self.ids.button2.disabled
        self.ids.button3.disabled=not self.ids.button3.disabled
        self.ids.button4.disabled=not self.ids.button4.disabled

    def setbonus(self):
        if self.bonus > 3:
            self.Obonus+=1

    def controler_confirmar(self):
        if self.verifica_resposta():
            self.bonus+=1
            self.altera_barra()
            self.setbonus()
            self.pontuacao_update()
            self.altera_quando_certo()
            self.arruma_pontuacao()
            self.add_widget(self.im1)
        else:
            self.bonus=0
            self.altera_barra()
            self.altera_quando_errado()
            self.add_widget(self.im2)
            self.add_widget(self.im1)
            print('ok')

        self.Disabled()
        self.qnt_revisao = 0
        self.ids.confirmar.text='PRÓXIMA'

    def setrevion(self):
        from kivy.app import App
        try:
            self.pontos['revisao']+=1
            self.saveN()
            self.setpontuacao()
            App.get_running_app()._ScreenFactory("AnimalScreen",self.momento,vimDoQuiz=True)
        except Exception as t:
            print(t,'b8')

class QuizScreen2(Screen):
    """Tela que contém as informações de um animal."""
    def __init__(self, **kwargs):
        super(QuizScreen2, self).__init__(**kwargs)
        self.name = 'QuizScreen2'
        #passr a janela
        widget = self.build(quizScreen())
        self.add_widget(widget)

    @menu_decorator
    def build(self, widget):
        return widget


    @staticmethod
    def getKvMarkup():
        x = ""
        return x

class About(Screen):

    text_cabecalho = StringProperty()
    text_funciona = StringProperty()
    text_quiz = StringProperty()
    text_quem = StringProperty()

    def __init__(self,**kwargs):
        super(About, self).__init__(**kwargs)
        self.name = "About"
        self.__infoabout()

    def __infoabout(self, name = 'sobre'):

        try:
            date = str('files/app/sobre/') #Diretório base
            j_info_about = read_json.parseJson(name, dir=str(date)) #Função que formata o Json
            self.text_cabecalho = str(j_info_about['cabecalho'].encode("utf-8"))
            self.text_funciona = str(j_info_about['quiz'].encode("utf-8"))
            self.text_quem = str(j_info_about['quem'].encode("utf-8"))

        except Exception as d:
            print(d, 'b9')
