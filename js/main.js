// https://phaser.io/news/2018/03/wedding-run
var game = new Phaser.Game(736, 460, Phaser.AUTO, 'phaser-block');
var fondo;
var personaje;
var salto;
var cursores;
var plataformas;
var estadoPrincipal = {

    /**
     * Función encargada de cargar los recursos del estado.
     */
    preload:function() {
        game.stage.backgroundcolor="#000";
        // Se carga el fondo1
        game.load.image('fondo1', 'img/fondo3.jpg');
        // Se carga el personaje principal
        game.load.spritesheet('dude', 'img/dude.png', 66,76);
        
        game.load.image('tierra', 'img/tierra.png');
        game.load.image('plataforma1', 'img/plataforma1.png');

    },

    /**
     * Función encargada de mostrar los recursos en pantalla.
     */
    create:function() {
        // Se muestra el fondo1
        fondo = game.add.tileSprite(0,0,736,460,'fondo1');
        // Se muestra el personaje principal
        personaje = game.add.sprite(140,360-9,'dude');
        
      //  game.addTilesetImage('tierra');
        
        personaje.frame= 0;
        personaje.animations.add('correrDerecha',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],28,true); 
        
        personaje.animations.add('correrIzquierda',[29,28,27,26,25,24,35,34,33,32,31,30,41,40,39,38,37,36,47,46,45,44,43,42],28,true);
        personaje.animations.add('detener',[48],28,true);

        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.enable(personaje);
        
        plataformas = game.add.group();
        plataformas.enableBody = true;
        var piso = plataformas.create(0,game.world.height-32,'tierra');
        piso.scale.setTo(0.5,0.5);
        piso = plataformas.create(32,game.world.height-32,'tierra');
        piso.scale.setTo(0.5,0.5);
        piso = plataformas.create(64,game.world.height-32,'tierra');
        piso.scale.setTo(0.5,0.5);
        piso = plataformas.create(96,game.world.height-32,'tierra');
        piso.scale.setTo(0.5,0.5);
        piso = plataformas.create(128,game.world.height-32,'tierra');
        piso.scale.setTo(0.5,0.5);
        piso = plataformas.create(160,game.world.height-32,'tierra');
        piso.scale.setTo(0.5,0.5);
        piso = plataformas.create(192,game.world.height-32,'tierra');
        piso.scale.setTo(0.5,0.5);
        piso = plataformas.create(224,game.world.height-32,'tierra');
        piso.scale.setTo(0.5,0.5);
        piso = plataformas.create(256,game.world.height-32,'tierra');
        piso.scale.setTo(0.5,0.5);
        piso = plataformas.create(288,game.world.height-32,'tierra');
        piso.scale.setTo(0.5,0.5);
        piso = plataformas.create(320,game.world.height-32,'tierra');
        piso.scale.setTo(0.5,0.5);
        piso = plataformas.create(352,game.world.height-32,'tierra');
        piso.scale.setTo(0.5,0.5);
        piso = plataformas.create(384,game.world.height-32,'tierra');
        piso.scale.setTo(0.5,0.5);
        piso = plataformas.create(416,game.world.height-32,'tierra');
        piso.scale.setTo(0.5,0.5);
        piso = plataformas.create(448,game.world.height-32,'tierra');
        piso.scale.setTo(0.5,0.5);
        piso = plataformas.create(480,game.world.height-32,'tierra');
        piso.scale.setTo(0.5,0.5);
        piso = plataformas.create(512,game.world.height-32,'tierra');
        piso.scale.setTo(0.5,0.5);
        piso = plataformas.create(544,game.world.height-32,'tierra');
        piso.scale.setTo(0.5,0.5);
        piso = plataformas.create(576,game.world.height-32,'tierra');
        piso.scale.setTo(0.5,0.5);
        piso = plataformas.create(608,game.world.height-32,'tierra');
        piso.scale.setTo(0.5,0.5);
        piso = plataformas.create(640,game.world.height-32,'tierra');
        piso.scale.setTo(0.5,0.5);
        piso = plataformas.create(672,game.world.height-32,'tierra');
        piso.scale.setTo(0.5,0.5);
        piso = plataformas.create(704,game.world.height-32,'tierra');
        piso.scale.setTo(0.5,0.5);
        
        piso.body.inmovable = true;
        
        var barra = plataformas.create(350,200,'plataforma1');
        barra.body.inmovable = false;


        
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
        if(cursores.right.isDown){
           personaje.position.x+=2;
            personaje.animations.play('correrDerecha');
        }
        else if(cursores.left.isDown){
           personaje.position.x-=2;
            personaje.animations.play('correrIzquierda');
            //personaje.rotation+=5;

        }else{
               personaje.position.x-=2;
            personaje.animations.play('detener');
        }
    
    },
    /**
    * Función encargada de animal el salto del personaje.
    */
    saltar:function() {
        game.physics.arcade.collide(personaje,personaje);
        personaje.body.velocity.y=-250;
        salto = game.time.now + 750;
    }

}

game.state.add('Juego',estadoPrincipal);
game.state.add('Menu',estadoMenu);

game.state.start('Menu');