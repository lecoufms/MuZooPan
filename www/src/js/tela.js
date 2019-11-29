class Tela {
	static instancia = null
	
	getInstance(){
		if (!Tela.instancia) {
			Tela.instancia =  new Tela()
			return Tela.instancia
		}else{
			return Tela.instancia
		}
	}

	onDeviceReady(){

	}
	
	changeElementInTela(){
		
	}
}