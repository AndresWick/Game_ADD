
var game = new Phaser.Game(736, 460, Phaser.AUTO, 'phaser-block');
var fondo;
var estado = {

    /**
     * Función encargada de cargar los recursos del juego.
     */
    preload:function() {
        game.stage.backgroundcolor="#000";
        // Se carga el fondo1
        game.load.image('fondo1', 'img/fondo1.jpg');
        // Se carga el personaje principal
        game.load.spritesheet('dude', 'img/dude2.png', 70,70);
    },

    /**
     * Función encargada de mostrar los recursos en pantalla.
     */
    create:function() {
        // Se muestra el fondo1
        fondo = game.add.tileSprite(0,0,736,460,'fondo1');
        // Se muestra el personaje principal
        game.add.sprite(200,350,'dude');


    },

    /**
     * Función encargada de animar el juego.
     */
    update:function() {
        // Se crea animación de movimiento en el fondo
        fondo.tilePosition.x -= 1;
    
    },

    render:function() {


    }

}

game.state.add('principal',estado);
game.state.start('principal');