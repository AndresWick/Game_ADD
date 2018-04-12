var fondoMenu;
var estadoMenu = {

      /**
     * Función encargada de cargar los recursos del estado.
     */
    preload:function() {
        game.stage.backgroundcolor='#FFF';
        // Se carga el boton de start
        game.load.image('boton', 'img/start.png');
        // Se carga el fondo del estado Menu
        game.load.image('fondoMenu', 'img/fondoMenu.jpg');

    },

    /**
     * Función encargada de mostrar los recursos en pantalla.
     */
    create:function() {
        
        fondoMenu = game.add.tileSprite(0,0,900,660,'fondoMenu');

        var boton = this.add.button(game.width/2-245,game.height/2-160,'boton',this.iniciarJuego,this);
        
        var txtInicio = game.add.text(game.width/2,game.height/2-100,"GAME ADD",{font:"bold 34px Verdana",fill:"#c1c1c1",align:"center"});
        txtInicio.anchor.setTo(0.5);

    },

    iniciarJuego:function(){
        this.state.start('Juego');
    }

}