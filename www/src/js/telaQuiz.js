class TelaQuiz{
	static instancia = null

	static getInstance(){
		if (!this.instancia) {
			this.instancia =  new TelaQuiz()
			return this.instancia
		}else{
			return this.instancia
		}
	}

};