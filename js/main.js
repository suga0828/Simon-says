const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const maxPuntuacion = document.getElementById('maxPuntuacion')
const ULTIMO_NIVEL = 10

class Juego {
	constructor() {
		this.inicializar = this.inicializar.bind(this)
		this.inicializar()
		this.generarSecuencia()
		setTimeout( () => {
			this.siguienteNivel()
		}, 500)
	}

	inicializar() {
		this.elegirColor = this.elegirColor.bind(this)
		this.siguienteNivel = this.siguienteNivel.bind(this)
		btnEmpezar.classList.toggle('ocultar')
		this.nivel = 1
		this.colores = {
			celeste,
			violeta,
			naranja,
			verde
		}
	}

	// btnEmpezar.classList.toggle('hide') es igual a:
	// toggleBtnEmpezar() {
	// 	if (btnEmpezar.classList.contains('hide')) {
	// 		btnEmpezar.classList.remove('hide')
	// 	} else {
	// 		btnEmpezar.classList.add('hide')
	// 	}
	// }

	generarSecuencia() {
		this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map( n => Math.floor(Math.random() * 4 ) )
	}

	siguienteNivel() {
		this.subnivel = 0
		this.iluminarSecuencia()
		this.agregarEventosClick()
	}

	transformarNumeroAColor(num) {
		switch (num) {
			case 0:
				return 'celeste'
			case 1:
				return 'violeta'
			case 2:
				return 'naranja'
			case 3:
				return 'verde'
		}
	}
	
	transformarColorANumero(color) {
		switch (color) {
			case 'celeste':
				return 0
			case 'violeta':
				return 1
			case 'naranja':
				return 2
			case 'verde':
				return 3
		}
	}

	iluminarSecuencia() {
		for (let i=0; i < this.nivel; i++) {
			const color = this.transformarNumeroAColor(this.secuencia[i])
			setTimeout( () => this.iluminarColor(color), 1000 * i )
		}
	}

	iluminarColor(color) {
		this.colores[color].classList.add('encender')
		setTimeout( () => this.apagarColor(color), 500)
	}
	
	apagarColor(color) {
		this.colores[color].classList.remove('encender')
	}
	
	agregarEventosClick() {
		this.colores.celeste.addEventListener('click', this.elegirColor)
		this.colores.verde.addEventListener('click', this.elegirColor)
		this.colores.violeta.addEventListener('click', this.elegirColor)
		this.colores.naranja.addEventListener('click', this.elegirColor)
	}
	
	eliminarEventosClick() {
		this.colores.celeste.removeEventListener('click', this.elegirColor)
		this.colores.verde.removeEventListener('click', this.elegirColor)
		this.colores.violeta.removeEventListener('click', this.elegirColor)
		this.colores.naranja.removeEventListener('click', this.elegirColor)
	}
	
	elegirColor(ev) {
		const nombreColor = ev.target.dataset.color
		const numeroColor = this.transformarColorANumero(nombreColor)
		this.iluminarColor(nombreColor)
		if (numeroColor === this.secuencia[this.subnivel]) {
			this.subnivel++
			if (this.subnivel === this.nivel) {
				this.nivel++
				swal('Congratulations, you advanced a level!', {
					icon: 'success',
					timer: 1500,
					button: false,
				})
				this.eliminarEventosClick()
				if( this.nivel === (ULTIMO_NIVEL + 1) ) {
					this.ganoElJuego()
				} else {
					setTimeout(this.siguienteNivel, 2500)
				}

			}
		} else {
			this.perdioElJuego()
		}
	}

	ganoElJuego() {
		maxPuntuacion.innerHTML = ULTIMO_NIVEL
		swal('Congratulations, you won the game!', '', 'success', {
			button: 'Play again!'
		})
			.then(this.inicializar)
	}

	perdioElJuego() {
		if (maxPuntuacion.innerHTML < this.nivel) {
			maxPuntuacion.innerHTML = this.nivel - 1
		}
		swal('We´re sorry, you lost the game. Don´t worry', '','error', {
			button: 'Try again!'
		})
			.then( () => {
				this.eliminarEventosClick()
				this.inicializar()
			})
	}
}

function empezarJuego() {
	window.juego = new Juego()
	//alert('el juego ha comenzado')
}