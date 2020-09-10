new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego=true;
            this.saludJugador= 100;
            this.saludMonstruo= 100;
            this.turnos= [];
        },
        atacar: function () {
            let max=this.rangoAtaque[1];
            let min=this.rangoAtaque[0];
            let reducirAMonstruo=  this.calcularDaño(min, max);
            this.saludMonstruo= this.saludMonstruo-reducirAMonstruo;
            this.turnos.unshift({
                esJugador:true,
                text:'El jugador ataca al mostruo sacandole ' + reducirAMonstruo + '%'
            });

            if (this.verificarGanador()) {
                return;
            }
            this.ataqueDelMonstruo();
        },

        ataqueEspecial: function () {
            let max=this.rangoAtaqueEspecial[1];
            let min=this.rangoAtaqueEspecial[0];
            let reducirAMonstruo=  this.calcularDaño(min, max);
            this.saludMonstruo= this.saludMonstruo-reducirAMonstruo;

            this.turnos.unshift({
                esJugador:true,
                text:'Ataque especial le saca ' + reducirAMonstruo + '% al monstruo'
            });

            if (this.verificarGanador()) {
                return;
            }
            this.ataqueDelMonstruo();

        },

        curar: function () {
            if (this.saludJugador<=90) {
                this.saludJugador+=10;
                this.turnos.unshift({
                    esJugador:true,
                    text:'Te curaste un 10% para seguir jugando'
                });
            } else{
                this.saludJugador=100;
            }
        },

        registrarEvento(evento) {
        },
        terminarPartida: function () {
            this.hayUnaPartidaEnJuego=false;
            this.turnos=[];
        },

        ataqueDelMonstruo: function () {
            let max=12;
            let min=5;
            let reducirAJugador=  this.calcularDaño(min, max);
            this.saludJugador= this.saludJugador-reducirAJugador;
            this.turnos.unshift({
                esJugador:false,
                text:'El monstruo te ataca sacandote ' + reducirAJugador + '%'
            });

            this.verificarGanador();
        },

        calcularDaño(min,max){
           return Math.max(Math.floor(Math.random()*max) +1, min);
        },

        calcularHeridas: function (rango) {
            return 0

        },
        verificarGanador: function () {
            if (this.saludMonstruo<=0) {
                if (confirm('Ganaste! Querés jugar de nuevo?')) {
                    this.empezarPartida();
                } else{
                    hayUnaPartidaEnJuego=false;
                }
                return true;
            } else if (this.saludJugador<=0) {
                if (confirm('Perdiste! Querés jugar de nuevo?')) {
                    this.empezarPartida();
            } else {
                hayUnaPartidaEnJuego=false;
            }
            return true;
        }
            return false;
    } ,
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});