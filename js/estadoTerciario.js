var txtPergaminoError;
var movX;
var movY;
var txtDatos;
var tt;
var estadoTerciario = {

    /**
     * Función encargada de cargar los recursos del estado.
     */
    preload:function() {
        game.stage.backgroundcolor="#000";
        // Se carga el fondo1
        game.load.image('fondo1', 'img/background2.jpg');
        // Se carga el personaje principal
        game.load.spritesheet('dude', 'img/dude.png', 66,76);
        game.load.spritesheet('moneda', 'img/coin.png',30,30);
        game.load.image('tierra', 'img/tierra.png');
        game.load.image('plataforma1', 'img/plataforma1.png');
        game.load.image('plataforma2', 'img/plataforma1_1.png');
        game.load.image('plataforma3', 'img/plataforma3.png');
        game.load.image('pergamino', 'img/pergamino.png');
        game.load.image('pergaminoDesplegado', 'img/pergaminodesplegado.png');
        game.load.image('btnXPergamino', 'img/btnX.png');
        game.load.audio("sonidoMoneda","sounds/coin.mp3");
        game.load.audio("sonidoSalto","sounds/jump.mp3");
        game.load.spritesheet('sound-control', 'img/sound-control.png', 48, 40);

    },

    /**
     * Función encargada de mostrar los recursos en pantalla.
     */
    create:function() {
        puntaje=0;
        movX=2;
        movY=450;
        sonidoSalto= game.add.audio("sonidoSalto");
        sonidoMoneda= game.add.audio("sonidoMoneda");
        // Se muestra el fondo1
        fondo = game.add.tileSprite(0,0,1200,660,'fondo1');
        // Se muestra el personaje principal
        personaje = game.add.sprite(55,355-50,'dude');
        //personaje = game.add.sprite(30,600-50,'dude');
      
        
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
        
        //Dibuja las lineas entre plataformas
        var lienzo = game.add.graphics(0,0);
        //Color picker con CTRL+ALT+K
        lienzo.beginFill(0xff0000);
        lienzo.lineStyle(2,0xff0000,1);
        
        //Dibuja la primera linea
        lienzo.moveTo(100,365);
        lienzo.lineTo(186,267);
        
        lienzo.moveTo(235,267);
        lienzo.lineTo(320,172);
        
        lienzo.moveTo(370,172);
        lienzo.lineTo(455,172);
        
        lienzo.moveTo(370,172); //fin rama listo
        lienzo.lineTo(455,77);
        
        lienzo.moveTo(505,172); //fin rama listo
        lienzo.lineTo(540,127);
        
        lienzo.moveTo(505,172); //fin rama listo
        lienzo.lineTo(540,217);
        
        lienzo.moveTo(235,267);
        lienzo.lineTo(320,362);
        
        lienzo.moveTo(370,362); //fin rama listo
        lienzo.lineTo(455,267);
        
        lienzo.moveTo(370,362); 
        lienzo.lineTo(455,457);
        
        lienzo.moveTo(505,457); //fin rama listo
        lienzo.lineTo(540,412);
        
        lienzo.moveTo(505,457); //fin rama listo
        lienzo.lineTo(540,502);
        
        lienzo.moveTo(100,365);
        lienzo.lineTo(186,457);
        
        lienzo.moveTo(235,457);
        lienzo.lineTo(320,552);
        
        lienzo.moveTo(370,552); //fin rama listo
        lienzo.lineTo(405,507);
        
        lienzo.moveTo(370,552); //fin rama listo
        lienzo.lineTo(405,597);
        
        lienzo.moveTo(235,457); //fin rama
        lienzo.lineTo(270,412);
        
        lienzo.endFill(); //Fin conexion ramas
        
        plataformas = game.add.group();
        plataformas.enableBody = true;
        
        pergaminos = game.add.group();
        pergaminos.enableBody = true;
        
        pergaminosDesplegados = game.add.group();
        pergaminosDesplegados.enableBody = true;
        
        var pergamino1 = pergaminos.create(480,47,'pergamino');
        var pergamino2 = pergaminos.create(565,97,'pergamino'); //rama correcta
        var pergamino3 = pergaminos.create(565,187,'pergamino');//rama correcta
        var pergamino4 = pergaminos.create(480,237,'pergamino');
        var pergamino5 = pergaminos.create(565,382,'pergamino');
        var pergamino6 = pergaminos.create(565,472,'pergamino');
        var pergamino7 = pergaminos.create(430,472,'pergamino');
        var pergamino8 = pergaminos.create(430,567,'pergamino');
        var pergamino9 = pergaminos.create(295,382,'pergamino'); 
        
        pergamino1.body.immovable = true;
        pergamino1.body.collideWorldBounds = true;
        pergamino1.scale.setTo(0.2,0.2);
        pergamino1.body.checkCollision.up = false;
        pergamino1.body.checkCollision.right = true;
	    pergamino1.body.checkCollision.down = false;
        
        pergamino2.body.immovable = true; //Fin rama correcta 0.8
        pergamino2.body.collideWorldBounds = true;
        pergamino2.scale.setTo(0.2,0.2);
        pergamino2.body.checkCollision.up = false;
        pergamino2.body.checkCollision.right = true;
	    pergamino2.body.checkCollision.down = false;
        
        pergamino3.body.immovable = true; //Fin rama correcta 0.2
        pergamino3.body.collideWorldBounds = true;
        pergamino3.scale.setTo(0.2,0.2);
        pergamino3.body.checkCollision.up = false;
        pergamino3.body.checkCollision.right = true;
	    pergamino3.body.checkCollision.down = false;
        
        pergamino4.body.immovable = true;
        pergamino4.body.collideWorldBounds = true;
        pergamino4.scale.setTo(0.2,0.2);
        pergamino4.body.checkCollision.up = false;
        pergamino4.body.checkCollision.right = true;
	    pergamino4.body.checkCollision.down = false;
        
        pergamino5.body.immovable = true;
        pergamino5.body.collideWorldBounds = true;
        pergamino5.scale.setTo(0.2,0.2);
        pergamino5.body.checkCollision.up = false;
        pergamino5.body.checkCollision.right = true;
	    pergamino5.body.checkCollision.down = false;
        
        pergamino6.body.immovable = true;
        pergamino6.body.collideWorldBounds = true;
        pergamino6.scale.setTo(0.2,0.2);
        pergamino6.body.checkCollision.up = false;
        pergamino6.body.checkCollision.right = true;
	    pergamino6.body.checkCollision.down = false;
        
        pergamino7.body.immovable = true;
        pergamino7.body.collideWorldBounds = true;
        pergamino7.scale.setTo(0.2,0.2);
        pergamino7.body.checkCollision.up = false;
        pergamino7.body.checkCollision.right = true;
	    pergamino7.body.checkCollision.down = false;
        
        pergamino8.body.immovable = true;
        pergamino8.body.collideWorldBounds = true;
        pergamino8.scale.setTo(0.2,0.2);
        pergamino8.body.checkCollision.up = false;
        pergamino8.body.checkCollision.right = true;
	    pergamino8.body.checkCollision.down = false;
        
        pergamino9.body.immovable = true;
        pergamino9.body.collideWorldBounds = true;
        pergamino9.scale.setTo(0.2,0.2);
        pergamino9.body.checkCollision.up = false;
        pergamino9.body.checkCollision.right = true;
	    pergamino9.body.checkCollision.down = false;
        
        //Dif en X entre platarformas 135px, Dif en Y 95
        //ubicaciones en X = 50, 185, 320, 455, 590
        //ubicaciones en Y = 170, 265, 360, 455, 550
        
        var barra1 = plataformas.create(50,360,'plataforma2'); 
        barra1.body.immovable = true;
        barra1.body.collideWorldBounds = true;
        barra1.scale.setTo(0.6,0.6);

        var barra2 = plataformas.create(185,265,'plataforma1');
        barra2.body.immovable = true;
        barra2.body.collideWorldBounds = true;
        barra2.scale.setTo(0.6,0.6);

        var barra3 = plataformas.create(185,455,'plataforma2');
        barra3.body.immovable = true;
        barra3.body.collideWorldBounds.left = true;
        barra3.scale.setTo(0.6,0.6);

        var barra4 = plataformas.create(320,550,'plataforma1');
        barra4.body.immovable = true;
        barra4.body.collideWorldBounds = true;
        barra4.scale.setTo(0.6,0.6);

        var barra5 = plataformas.create(320,360,'plataforma2');
        barra5.body.immovable = true;
        barra5.body.collideWorldBounds = true;
        barra5.scale.setTo(0.6,0.6);

        var barra6 = plataformas.create(455,170,'plataforma1');
        barra6.body.immovable = true;
        barra6.body.collideWorldBounds.left = true;
        barra6.scale.setTo(0.6,0.6);
        
        var barra7 = plataformas.create(320,170,'plataforma2');
        barra7.body.immovable = true;
        barra7.body.collideWorldBounds = true;
        barra7.scale.setTo(0.6,0.6);

        var barra8 = plataformas.create(445,455,'plataforma1');
        barra8.body.immovable = true;
        barra8.body.collideWorldBounds = true;
        barra8.scale.setTo(0.6,0.6);
        
                    
        
                         

        monedas = game.add.group();
        monedas.enableBody = true;

        for (var i=3;i<16;i++){
             var monedas1 = game.add.sprite(30*i,0,'moneda');
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
        game.physics.arcade.collide(plataformas,personaje);
        game.physics.arcade.collide(personaje,pergaminos);
        game.physics.arcade.overlap(personaje,monedas,estadoSecundario.recolectarMonedas,null,this);
        game.physics.arcade.overlap(personaje,pergaminos,estadoSecundario.recolectarPergaminos,null,this);

        
       // Se animan todas las monedas
        for (var i = 0, len = monedas.children.length; i < len; i++) {    monedas.children[i].animations.play('spin');
        }

        if(cursores.right.isDown){
           personaje.position.x+=movX;
            personaje.animations.play('correrDerecha');
        }
        else if(cursores.left.isDown){
           personaje.position.x-=movX;
            personaje.animations.play('correrIzquierda');
        }else if(cursores.up.isDown){
            estadoSecundario.saltar();
        }else{
            personaje.animations.play('detener');
        }
        
        if(personaje.body.touching.down){
           numSaltos=1;
        }
        
        switch(puntaje){
        //Aqui se agregan al mapa las ganancias y probabilidades
            //ganancias
            case 10:
             //txtDatos=game.add.text(455,0,ganancias.nodo1_1,{fontsize:'10px',fill:'#fff'});
               tt= game.add.text(455,47,ganancias2.nodo1_1,{fontSize:'20px',fill:'#fff'});
                break;
            case 30:
                game.add.text(540,97,ganancias2.nodo1_2,{fontSize:'20px',fill:'#fff'});
                game.add.text(540,197,ganancias2.nodo2_1,{fontSize:'20px',fill:'#fff'});
                break;
            case 50:
                game.add.text(455,237,ganancias2.nodo2_2,{fontSize:'20px',fill:'#fff'});
                break;
            case 70:
                game.add.text(540,382,ganancias2.nodo3_1,{fontSize:'20px',fill:'#fff'});
                break;
            case 90:
                game.add.text(540,482,ganancias2.nodo3_2,{fontSize:'20px',fill:'#fff'});
                game.add.text(405,472,ganancias2.nodo1_2,{fontSize:'20px',fill:'#fff'});
                break;
            case 110:
                game.add.text(385,560,'0.45',{fontSize:'15px',fill:'#fff'});
                break;
            case 130:
                game.add.text(270,382,ganancias2.nodo4_1,{fontSize:'20px',fill:'#fff'});
                break;
            //probabilidades
            case 20:
                game.add.text(272,226,probabilidades2.nodo1_1,{fontSize:'15px',fill:'#fff'});
                game.add.text(288,304,probabilidades2.nodo1_2,{fontSize:'15px',fill:'#fff'});
                break;
            case 40:
                game.add.text(530,145,probabilidades.nodo2_1,{fontSize:'15px',fill:'#fff'});
                break;
            case 60:
                game.add.text(530,180,probabilidades2.nodo2_2,{fontSize:'15px',fill:'#fff'});
                break;
            case 80:
                game.add.text(528,434,'0.1',{fontSize:'15px',fill:'#fff'});
                game.add.text(528,464,'0.9',{fontSize:'15px',fill:'#fff'});
                break;
            case 100:
                game.add.text(380,522,probabilidades2.nodo4_1,{fontSize:'15px',fill:'#fff'});
                break;
            case 120:
                game.add.text(393,587,'-100',{fontSize:'20px',fill:'#fff'});
                break;
        }
        
    },
    /**
    * Función encargada de animal el salto del personaje.
    */
    saltar:function() {
        if(numSaltos<2){
            sonidoSalto.play();
            personaje.body.velocity.y=-movY;
            numSaltos++;
        }
    },
    /**
    * Función encargada de recolectar monedas.
    */
     recolectarMonedas:function(person,mon) {
        mon.kill();
         sonidoMoneda.play();
         puntaje+=10;
         txtPuntaje.text='Puntaje: '+puntaje;
    },
    recolectarPergaminos:function(person,perg) {
        //personaje.body.gravity.y=0;
        
        
             // alert("Pergamino :D");
            if(puntaje>129){
                //Se detiene el movimiento del jugador para que no tome mas pergaminos 
                personaje.body.gravity.y=0;
                //cursores = game.input.keyboard.addKey(Phaser.Keyboard.Q);
                movX=0;
                movY=0;
                if((perg.x===540 && perg.y===97) || (perg.x===540 && perg.y===187)){ //Verifica que sean los pergaminos de la rama correcta
                 perg.kill();    
                 var pergaminoDes = pergaminosDesplegados.create(162,150,'pergaminoDesplegado');
                 pergaminoDes.scale.setTo(0.7,0.7);
                 var btnX2 = pergaminosDesplegados.create(170,167,'btnXPergamino');
                 btnX2.scale.setTo(0.1,0.1);
                 btnX2.inputEnabled = true;
                 btnX2.events.onInputDown.add(function(){
                     pergaminoDes.kill();
                     txtPergaminoError.kill();
                     btnX2.kill();
                    alert("Juego terminado. Éxitos.");
                    game.state.start('Menu');
                 }, this);
                    if(perg.y===97){
                        txtPergaminoError=game.add.text(230,220,correcto_1,{fontSize:'20px',fill:'#000000'});
                    }else{
                        if(perg.y===187){
                        txtPergaminoError=game.add.text(230,220,correcto_2,{fontSize:'20px',fill:'#000000'});                            
                        }
                    }
                   }else{
                perg.kill();
                       tt.visible=false;

                 //person.body.moves = false;
                 var pergaminoDes = pergaminosDesplegados.create(162,150,'pergaminoDesplegado');
                 pergaminoDes.scale.setTo(0.7,0.7);
                 var btnX2 = pergaminosDesplegados.create(170,167,'btnXPergamino');
                 btnX2.scale.setTo(0.1,0.1);
                 btnX2.inputEnabled = true;
                 btnX2.events.onInputDown.add(function(){
                     pergaminoDes.kill();
                     txtPergaminoError.kill();
                     btnX2.kill();
                    alert("Juego perdido. Éxitos.");
                    game.state.start('Menu');
                 }, this);
                    txtPergaminoError=game.add.text(230,220,"Rama incorrecta.\n"+error_7+" \n Vuelva a intentarlo.",{fontSize:'20px',fill:'#000000'});
                   }
                
                
            //    pergamino.body.immovable = true;
              //  pergamino.body.collideWorldBounds = true;
            }
        
    }

}

var probabilidades2 = 
    {
        "nodo1_1": "a",
        "nodo1_2": "b",
        "nodo2_1": "c",
        "nodo2_2": "d",
        "nodo3_1": "e",
        "nodo3_2": "f",
        "nodo4_1": "g",
        "nodo4_2": "h"
    }
var ganancias2 = 
    {
        "nodo1_1": "0",
        "nodo1_2": "j",
        "nodo2_1": "-g",
        "nodo2_2": "0",
        "nodo3_1": "i",
        "nodo3_2": "-g",
        "nodo4_1": "0g",
        "nodo4_2": "gh",
        "nodo5_1": "-1g00"
    }

//Mensajes de pergaminos erroneos
var error_1 = "Analizar decisiones secuenciales basadas \n en el uso de probabilidades asociadas y \n resultados anteriores es la aplicación más \n común de los ADD. \n";
var error_2 = "En cuanto a los procesos de apoyo en la \n toma de decisiones e inteligencia artificial, \n los ADD son  una herramienta de importante \n aplicación. \n";
var error_3 = "Los ADD son definidos como grafos que \n representan un proceso de decisión de \n forma extensiva y predictiva. \n";
var error_4 = "Los nodos de probabilidades en un árbol \n de decisión son representados por medio de \n  círculos. Para este videojuego, ¿recuerdas \n qué color de plataforma representa \n estos nodos? \n ";
var error_5 = "Los nodos de decisión en un árbol \n de decisión son representados por medio de \n cuadrados. Para este videojuego, ¿recuerdas \n qué color de plataforma representa \n estos nodos?. \n";
var error_6 = "La estructura de los árboles de \n decisión consiste en árboles binarios o \n como árboles de juego, siempre considerando \n al menos dos alternativas de decisión \n y probabilidades a priori y a posteriori. \n";
var error_7 = "Para trabajar sobre árboles de \n decisión puedes usar software como \n LucidChart, DIA, ConceptDrawOffice, \n CardRunners EV, Precision Tree, \n Modeler SPSS Statistics y Treeplan. \n";

//Mensajes de rama correcta
var correcto_1 = "¡Felicitaciones! Elegiste la rama\n correcta, este evento tiene una probabilidad\n de 0.8 y una ganancia de $300, así que lo\n más seguro es que obtengas una buena\n recompensa.\n ¡Gracias por jugar!.";
var correcto_2 = "¡Felicitaciones! Elegiste la rama\n correcta, este evento tiene una probabilidad\n de 0.2 y una pérdida de -$100, así que es\n un poco probable que no pierdas tu\n recompensa, sin embargo es la \n mejor opción. ¡Gracias por jugar!.";