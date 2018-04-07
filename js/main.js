
var game = new Phaser.Game(736, 460, Phaser.AUTO, 'phaser-block');
var fondo;
var personaje;
var estadoPrincipal = {

    /**
     * Función encargada de cargar los recursos del estado.
     */
    preload:function() {
        game.stage.backgroundcolor="#000";
        // Se carga el fondo1
        game.load.image('fondo1', 'img/fondo1.jpg');
        // Se carga el personaje principal
        game.load.spritesheet('dude', 'img/dude2.png', 65,75);
    },

    /**
     * Función encargada de mostrar los recursos en pantalla.
     */
    create:function() {
        // Se muestra el fondo1
        fondo = game.add.tileSprite(0,0,736,460,'fondo1');
        // Se muestra el personaje principal
        personaje = game.add.sprite(200,350,'dude');
        personaje.frame= 0;
        personaje.animations.add('correr',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],28,true);

    },

    /**
     * Función encargada de animar el juego.
     */
    update:function() {
        // Se crea animación de movimiento en el fondo
        fondo.tilePosition.x -= 1;
        personaje.animations.play('correr');
       // personaje.angle+=1;
    
    },

    render:function() {


    }

}

game.state.add('Juego',estadoPrincipal);
game.state.add('Menu',estadoMenu);

game.state.start('Menu');