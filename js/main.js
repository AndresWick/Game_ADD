// https://phaser.io/news/2018/03/wedding-run
//https://www.youtube.com/watch?v=nrDgPF2j_eo&index=19&list=PLdGlusD_3WpF9TUyLRcMOnU9jdZIi3y9a
var game = new Phaser.Game(736, 460, Phaser.AUTO, 'phaser-block');
var fondo;
var personaje;
var salto;
var cursores;
var pisos;
var plataformas;
var monedas;
var numSaltos=1;
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
        game.load.spritesheet('moneda', 'img/coin.png',30,30);
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
                
        personaje.animations.add('correrDerecha',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],28,true); 
        
        personaje.animations.add('correrIzquierda',[29,28,27,26,25,24,35,34,33,32,31,30,41,40,39,38,37,36,47,46,45,44,43,42],28,true);
        personaje.animations.add('detener',[48],28,true);
       
        pisos = game.add.group();
        pisos.enableBody = true;
        // Se crea el piso del juego.
        var piso = pisos.create(0,game.world.height-32,'tierra');
        piso.scale.setTo(0.5,0.5);
        piso.body.immovable = true;
        for (var i=1;i<23;i++){
            piso = pisos.create(32*i,game.world.height-32,'tierra');
            piso.scale.setTo(0.5,0.5);
            piso.body.immovable = true;
        }
        
        plataformas = game.add.group();
        plataformas.enableBody = true;
        var barra = plataformas.create(350,200,'plataforma1');
        barra.body.immovable = true;

        monedas = game.add.group();
        monedas.enableBody = true;
        monedas1 = game.add.sprite(50,0,'moneda');
        monedas = game.add.sprite(350,0,'moneda');
        monedas.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7], 28, true);
        monedas1.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7], 28, true);

        

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.enable(personaje);
        game.physics.arcade.enable(plataformas);
        game.physics.arcade.enable(monedas);
        game.physics.arcade.enable(monedas1);

        monedas.enableBody=true;
        monedas.body.gravity.y=100;
        monedas.body.bounce.setTo(0.8);
                
        monedas1.enableBody=true;
        monedas1.body.gravity.y=100;
        monedas1.body.bounce.setTo(0.8);
        
        personaje.body.gravity.y=1000;
        personaje.body.bounce.setTo(0);
        
	   // monedas.animations.play('spin');
	   // 	monedas.body.immovable = true;
	   // 	monedas.body.allowGravity = false;
	   // 	monedas.body.checkCollision = false;
	   // 	monedas.body.velocity.x = -this.game.Settings.physics.platformSpeed;
 
		    //When the coin leaves the screen, kill it
		 //   monedas.checkWorldBounds = true;
		  //  monedas.outOfBoundsKill = true;
        
        cursores = game.input.keyboard.createCursorKeys();
        salto = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        salto.onDown.add(this.saltar,this);
        personaje.body.collideWorldBounds=true;
        
    },

    /**
     * Función encargada de animar el juego.
     */
    update:function() {
        
        game.physics.arcade.collide(monedas,pisos);
        game.physics.arcade.collide(monedas1,pisos);
        game.physics.arcade.collide(monedas1,personaje);
        game.physics.arcade.collide(personaje,pisos);
        game.physics.arcade.collide(monedas,plataformas);
        game.physics.arcade.collide(personaje,plataformas);

        // Se crea animación de movimiento en el fondo
       // fondo.tilePosition.x -= 1;
        monedas.animations.play('spin');
        monedas1.animations.play('spin');

        if(cursores.right.isDown){
           personaje.position.x+=2;
            personaje.animations.play('correrDerecha');
        }
        else if(cursores.left.isDown){
           personaje.position.x-=2;
            personaje.animations.play('correrIzquierda');
        }else{
            personaje.animations.play('detener');
        }
        
        if(personaje.body.touching.down){
           numSaltos=1;
        }
    
    },
    /**
    * Función encargada de animal el salto del personaje.
    */
    saltar:function() {
        if(numSaltos<2){
            personaje.body.velocity.y=-450;
            numSaltos++;
        }
    }

}

game.state.add('Juego',estadoPrincipal);
game.state.add('Menu',estadoMenu);

game.state.start('Menu');