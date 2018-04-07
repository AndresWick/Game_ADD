// https://phaser.io/news/2018/03/wedding-run
var game = new Phaser.Game(736, 460, Phaser.AUTO, 'phaser-block');
var fondo;
var personaje;
var salto;
var cursores;
var estadoPrincipal = {

    /**
     * Función encargada de cargar los recursos del estado.
     */
    preload:function() {
        game.stage.backgroundcolor="#000";
        // Se carga el fondo1
        game.load.image('fondo1', 'img/fondo3.jpg');
        // Se carga el personaje principal
        game.load.spritesheet('dude', 'img/dude2.png', 65,75);
        
        game.load.image('tierra', 'img/tierra.png');
    },

    /**
     * Función encargada de mostrar los recursos en pantalla.
     */
    create:function() {
        // Se muestra el fondo1
        fondo = game.add.tileSprite(0,0,736,460,'fondo1');
        // Se muestra el personaje principal
        personaje = game.add.sprite(140,360,'dude');
        
      //  game.addTilesetImage('tierra');
        
        personaje.frame= 0;
        personaje.animations.add('correr',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],28,true);
        personaje.animations.add('parar',[19,20,21,22,23],28,true);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.enable(personaje);
        cursores = game.input.keyboard.createCursorKeys();
        salto = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        salto.onDown.add(this.saltar,this);
        personaje.body.collideWorldBounds=true;
        
        
    },

    /**
     * Función encargada de animar el juego.
     */
    update:function() {
        // Se crea animación de movimiento en el fondo
        fondo.tilePosition.x -= 1;
        personaje.animations.play('correr');
        //personaje.animations.stop();
        if(cursores.right.isDown){
           personaje.position.x+=2;
            personaje.animations.play('derecha');
            personaje.animations.play('correr');
        }
        if(cursores.left.isDown){
           personaje.position.x-=2;
            personaje.animations.play('izquierda');
            //personaje.rotation+=5;

        }
    
    },
    /**
    * Función encargada de animal el salto del personaje.
    */
    saltar:function() {
        game.physics.arcade.collide(personaje,personaje);
        personaje.body.velocity.y=-250;
        personaje.animations.play('right');
    }

}

game.state.add('Juego',estadoPrincipal);
game.state.add('Menu',estadoMenu);

game.state.start('Menu');