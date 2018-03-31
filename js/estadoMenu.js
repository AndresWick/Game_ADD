var estadoMenu = {

      /**
     * Función encargada de cargar los recursos del estado.
     */
    preload:function() {
        game.stage.backgroundcolor='#FFF';
        // Se carga el boton de start
        game.load.image('boton', 'img/btnStart.png');
      /*  // Se carga el personaje principal
        game.load.spritesheet('dude', 'img/dude2.png', 70,70);
    */},

    /**
     * Función encargada de mostrar los recursos en pantalla.
     */
    create:function() {
        var boton = this.add.button(game.width/2-160,game.height/2-94,'boton',this.iniciarJuego,this);
        var txtInicio = game.add.text(game.width/2,game.height/2-100,"GAME ADD",{font:"bold 34px Verdana",fill:"#c1c1c1",align:"center"});
        txtInicio.anchor.setTo(0.5);
    },

    iniciarJuego:function(){
        this.state.start('Juego');
    }

}