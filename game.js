let level = 1;
let player;
//let
let cursors;
let collisionbox;


function preload(){
    this.load.image("bg", 'assets/background.png');
    
    this.load.image("plat1", 'assets/ground.png');
    this.load.image("plat2", 'assets/level1.png');
    this.load.image("plat3", 'assets/level2.png');
    this.load.image("plat4", 'assets/level3.png');
    this.load.image("plat5", 'assets/ground.png');

    this.load.image("keys", 'assets/instructions.png');

    this.load.spritesheet('player', 'assets/spritesheet.png',{
        frameWidth: 100,
        frameHeight: 173
    });
}

function create(){
    this.transitioning = false;
    
    const bg = this.add.image(500,350, 'bg');
    bg.setDisplaySize(1000,700);
    bg.setScrollFactor(0); //background doesn't scroll

    player = this.physics.add.sprite(60, 300, 'player');
    player.setScale(0.5);
    player.body.allowGravity = true;
    player.setCollideWorldBounds(true);
    player.setVisible(true);

    /*if(collisionbox) {
        collisionbox.clear(true, true); // remove all previous children
    }*/
    collisionbox = this.physics.add.staticGroup();

    if(level === 1){
        const keys = this.add.image(499.5,700-505,'keys');
        keys.setDisplaySize(197,130);
        keys.setScrollFactor(0);
    }

    // player animations
    this.anims.create({ //idle
        key: 'idle',
        frames: [{key: 'player', frame:0}],
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({ //right run
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', {start: 5, end: 6}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({ //left run
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', {start: 3, end: 4}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({ //jump
        key: 'jump',
        frames: [{key: 'player', frame: 1}],
        frameRate:10,
        repeat: -1
    });
    this.anims.create({ //fall
        key: 'fall',
        frames: [{key: 'player', frame: 2}],
        frameRate:10,
        repeat: -1
    });

    //cursors = this.input.keyboard.createCursorKeys(); //receive keyboard input
    cursors = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        right: Phaser.Input.Keyboard.KeyCodes.D
    });
    //this.input.keyboard.addCapture(['UP', 'DOWN', 'LEFT', 'RIGHT']);


    const platform = this.add.image(500, 700-183.5, `plat${level}`);
    platform.setDisplaySize(1000, 367);
    platform.setScrollFactor(0);

    //level hitboxes
    if(level === 2){
        collisionbox.create(500,700-69.5).setSize(1000,139).setVisible(false); //ground
        //ground.refreshBody();


        collisionbox.create(398+81.5,700-122).setSize(163,244).setVisible(false);
        //block.refreshBody();
    } else if(level === 3){
        collisionbox.create(500,700-69.5).setSize(1000,139).setVisible(false); //ground
        //ground.refreshBody();

        //staircase looking thing
        collisionbox.create(487.5,700-96.5).setSize(389,193).setVisible(false);
        collisionbox.create(532.5,700-148).setSize(299,296).setVisible(false);
        collisionbox.create(594.5,700-183.5).setSize(175,367).setVisible(false);

        collisionbox.create(803.5,700-183.5).setSize(123,367).setVisible(false);
        collisionbox.create(946.5,374).setSize(103,62).setVisible(false);
        
    } else if(level === 4){
        collisionbox.create(500,700-11).setSize(1000,22).setVisible(false); //ground
        //ground.refreshBody();

        collisionbox.create(893.5,700-69.5).setSize(209,139).setVisible(false);
        collisionbox.create(133.5,700-69.5).setSize(266,139).setVisible(false);
        collisionbox.create(858,700-183.5).setSize(138,367).setVisible(false);

        collisionbox.create(334.5,700-179.5).setSize(23,23).setVisible(false); //blocks
        collisionbox.create(448.5,700-218.5).setSize(13,23).setVisible(false);
        collisionbox.create(528,700-263).setSize(14,14).setVisible(false);
        collisionbox.create(607,700-303).setSize(14,14).setVisible(false);
        collisionbox.create(711,700-337).setSize(24,24).setVisible(false);

    } else{ //if level is 1 or 5
        //let ground = this.physics.add.staticImage(500,700-69.5, 'pixel');
        collisionbox.create(500,700-69.5).setSize(1000,139).setVisible(false); //ground

        //ground.refreshBody();
        //this.physics.add.collider(player, ground);
    }
    this.physics.add.collider(player, collisionbox);
    //collisionbox.refreshBody();

}

function update(){
    //console.log(player.body.velocity.y);

    //const cursors = this.cursors;
    /*if (player.x > 980) { // if player reaches right side of screen
        nextLevel(this);
    }*/

    if (player.x > 950 && !this.transitioning) {
        this.transitioning = true;
        nextLevel(this);
    }

    if(cursors.left.isDown){
        player.setVelocityX(-200);
        player.anims.play('left', true);
    } else if(cursors.right.isDown){
        player.setVelocityX(200);
        player.anims.play('right', true);
    } else{
        player.setVelocityX(0);
        player.anims.play('idle', true);
    }

    if(cursors.up.isDown && player.body.blocked.down){ //if up arrow key pressed and player is on solid ground
        player.setVelocityY(-500);
    }
    
    if (player.body.velocity.y < 0) {
            player.anims.play('jump', true);
    } else {
        player.anims.play('fall', true);
    }
}


function nextLevel(scene){
    level++;

    if(level>5){
        //showEnding(scene);
        console.log("Game finished!"); // placeholder for ending
        return;
    } else{
        scene.scene.restart();
    }
    
    
}

let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 700,
    physics:{
        default: 'arcade',
        arcade: {gravity: {y:1000}, debug: true}
    },
    scene: {preload, create, update}
};

new Phaser.Game(config);