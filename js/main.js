// https://phaser.io/news/2018/03/wedding-run
//https://www.youtube.com/watch?v=nrDgPF2j_eo&index=19&list=PLdGlusD_3WpF9TUyLRcMOnU9jdZIi3y9a
var game = new Phaser.Game(900, 660, Phaser.AUTO, 'phaser-block');
var fondo;
var personaje;
var salto;
var cursores;
var pisos;
var plataformas;
var monedas;
var numSaltos=1;
var puntaje=0;
var txtPuntaje;
var estadoPrincipal = {

    /**
     * Función encargada de cargar los recursos del estado.
     */
    preload:function() {
        game.stage.backgroundcolor="#000";
        // Se carga el fondo1
        game.load.image('fondo1', 'img/background.jpg');
        // Se carga el personaje principal
        game.load.spritesheet('dude', 'img/dude.png', 66,76);
        game.load.spritesheet('moneda', 'img/coin.png',30,30);
        game.load.image('tierra', 'img/tierra.png');
        game.load.image('plataforma1', 'img/plataforma1.png');
        game.load.image('plataforma2', 'img/plataforma2.png');
        game.load.image('plataforma3', 'img/plataforma3.png');
    },

    /**
     * Función encargada de mostrar los recursos en pantalla.
     */
    create:function() {
        // Se muestra el fondo1
        fondo = game.add.tileSprite(0,0,900,660,'fondo1');
        // Se muestra el personaje principal
        personaje = game.add.sprite(140,360-9,'dude');
      
        
        personaje.animations.add('correrDerecha',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],28,true); 
        
        personaje.animations.add('correrIzquierda',[29,28,27,26,25,24,35,34,33,32,31,30,41,40,39,38,37,36,47,46,45,44,43,42],28,true);
        personaje.animations.add('detener',[48],28,true);
       
        pisos = game.add.group();
        pisos.enableBody = true;
        // Se crea el piso del juego.
        var piso = pisos.create(0,game.world.height-25.6,'tierra');
        piso.scale.setTo(0.4,0.4);
        piso.body.immovable = true;
        for (var i=1;i<36;i++){
            piso = pisos.create(25.6*i,game.world.height-25.6,'tierra');
            piso.scale.setTo(0.4,0.4);
            piso.body.immovable = true;
        }
        
        plataformas = game.add.group();
        plataformas.enableBody = true;
        
        var barra = plataformas.create(350,350,'plataforma1');
        barra.body.immovable = true;
        barra.body.collideWorldBounds = true;
        barra.scale.setTo(0.6,0.6);

        var barra2 = plataformas.create(50,350,'plataforma1');
        barra2.body.immovable = true;
        barra2.body.collideWorldBounds = true;
        barra2.scale.setTo(0.6,0.6);

        var barra3 = plataformas.create(120,150,'plataforma1');
        barra3.body.immovable = true;
        barra3.body.collideWorldBounds.left = true;
        barra3.scale.setTo(0.6,0.6);

        var barra4 = plataformas.create(260,250,'plataforma1');
        barra4.body.immovable = true;
        barra4.body.collideWorldBounds = true;
        barra4.scale.setTo(0.6,0.6);

        var barra5 = plataformas.create(50,50,'plataforma1');
        barra5.body.immovable = true;
        barra5.body.collideWorldBounds = true;
        barra5.scale.setTo(0.6,0.6);

        var barra6 = plataformas.create(50,250,'plataforma1');
        barra6.body.immovable = true;
        barra6.body.collideWorldBounds.left = true;
        barra6.scale.setTo(0.6,0.6);
        
        var barra7 = plataformas.create(560,250,'plataforma1');
        barra7.body.immovable = true;
        barra7.body.collideWorldBounds = true;
        barra7.scale.setTo(0.6,0.6);

        var barra8 = plataformas.create(450,50,'plataforma1');
        barra8.body.immovable = true;
        barra8.body.collideWorldBounds = true;
        barra8.scale.setTo(0.6,0.6);

        var barra9 = plataformas.create(350,250,'plataforma1');
        barra9.body.immovable = true;
        barra9.body.collideWorldBounds.left = true;
        barra9.scale.setTo(0.6,0.6);
        
        var barra10 = plataformas.create(450,30,'plataforma1');
        barra10.body.immovable = true;
        barra10.body.collideWorldBounds.left = true;
        barra10.scale.setTo(0.6,0.6);

        monedas = game.add.group();
        monedas.enableBody = true;

        for (var i=1;i<16;i++){
             var monedas1 = game.add.sprite(50*i,0,'moneda');
            monedas1.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7], 28, true);
            game.physics.arcade.enable(monedas1);
            monedas1.enableBody=true;
            monedas1.body.gravity.y=100;
            monedas1.body.bounce.setTo(0.2);
            monedas1.scale.setTo(0.6,0.6);
            monedas.add(monedas1);
        }
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.enable(personaje);
        game.camera.follow(personaje);
        
        personaje.body.gravity.y=1000;
        personaje.body.bounce.setTo(0);
        personaje.body.collideWorldBounds = true;
        personaje.scale.setTo(0.6,0.6);
        
        personaje.body.checkCollision.up = true;
	    personaje.body.checkCollision.down = true;
        personaje.body.checkCollision.left = true; 
        personaje.body.checkCollision.right = true;
        personaje.body.blocked.left = true; 
        
        cursores = game.input.keyboard.createCursorKeys();
        salto = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        salto.onDown.add(this.saltar,this);
        
        txtPuntaje=game.add.text(40,25,'Puntaje: '+puntaje,{fontSize:'20px',fill:'#fff'});
        
    },

    /**
     * Función encargada de animar el juego.
     */
    update:function() {
        
        game.physics.arcade.collide(monedas,pisos);
        game.physics.arcade.collide(personaje,pisos);
        game.physics.arcade.collide(monedas,plataformas);
        game.physics.arcade.collide(plataformas,personaje,function(){
        });
        game.physics.arcade.overlap(personaje,monedas,estadoPrincipal.recolectar,null,this);
        
        // Se crea animación de movimiento en el fondo
       // fondo.tilePosition.x -= 1;
       // Se animan todas las monedas
        for (var i = 0, len = monedas.children.length; i < len; i++) {    monedas.children[i].animations.play('spin');
        }

        if(cursores.right.isDown){
           personaje.position.x+=2;
            personaje.animations.play('correrDerecha');
        }
        else if(cursores.left.isDown){
           personaje.position.x-=2;
            personaje.animations.play('correrIzquierda');
        }else if(cursores.up.isDown){
            estadoPrincipal.saltar();
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
    },
    /**
    * Función encargada de recolectar monedas.
    */
     recolectar:function(person,mon) {
        mon.kill();
         puntaje+=10;
         txtPuntaje.text='Puntaje: '+puntaje;
    }

}

game.state.add('Juego',estadoPrincipal);
game.state.add('Menu',estadoMenu);

game.state.start('Menu');