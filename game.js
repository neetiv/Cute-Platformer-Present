function preload(){
    this.load.image("bg", 'assets/background.png');
    
    this.load.image("plat1", 'assets/ground.png');
    this.load.image("plat2", 'assets/level1.png');
    this.load.image("plat3", 'assets/level2.png');
    this.load.image("plat4", 'assets/level3.png');
    this.load.image("plat5", 'assets/ground.png');

    this.load.spritesheet('player', 'assets/spritesheet.png',{
        frameWidth: 100,
        frameHeight: 173
    });
}

function create(){
    let level = 1;
    let collisionbox;

    const bg = this.add.image(500,350, 'bg');
    bg.setDisplaySize(1000,700);
    bg.setScrollFactor(0); //background doesn't scroll

    player = this.physics.add.sprite(60, 100, 'player');
    player.setVisible(true);

    collisionbox = this.physics.add.staticGroup();
    this.physics.add.collider(player, collisionbox);

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

    this.cursor = this.input.keyboard.createCursorKeys();


    const platform = this.add.image(500, 700-183.5, `plat${level}`);
    platform.setDisplaySize(1000, 367);
    platform.setScrollFactor(0);

    //level hitboxes
    if(level === 2){
        collisionbox.create(500,700-69.5).setSize(1000,139).setVisible(false); //ground

        collisionbox.create(398+81.5,700-122).setSize(163,244).setVisible(false);
        collisionbox.refreshBody();

    } else if(level === 3){
        collisionbox.create(500,700-69.5).setSize(1000,139).setVisible(false); //ground
        //staircase looking thing
        collisionbox.create(487.5,700-96.5).setSize(389,193).setVisible(false);
        collisionbox.create(532.5,700-148).setSize(299,296).setVisible(false);
        collisionbox.create(594.5,700-183.5).setSize(175,367).setVisible(false);

        collisionbox.create(803.5,700-183.5).setSize(123,367).setVisible(false);
        collisionbox.create(946.5,374).setSize(103,62).setVisible(false);

        collisionbox.refreshBody();
        
    } else if(level === 4){
        collisionbox.create(500,700-11).setSize(1000,22).setVisible(false); //ground
        collisionbox.create(893.5,700-69.5).setSize(209,139).setVisible(false);
        collisionbox.create(133.5,700-69.5).setSize(266,139).setVisible(false);
        collisionbox.create(858,700-183.5).setSize(138,367).setVisible(false);

        collisionbox.create(334.5,700-179.5).setSize(23,23).setVisible(false); //blocks
        collisionbox.create(448.5,700-218.5).setSize(13,23).setVisible(false);
        collisionbox.create(528,700-263).setSize(14,14).setVisible(false);
        collisionbox.create(607,700-303).setSize(14,14).setVisible(false);
        collisionbox.create(711,700-337).setSize(24,24).setVisible(false);

        collisionbox.refreshBody();

    } else{ //if level is 1 or 5
        collisionbox.create(500,700-69.5).setSize(1000,139).setVisible(false); //ground
        collisionbox.refreshBody();
    }



}

function update(){
    const cursor = this.cursor;

    if(cursor.left.isDown){
        player.setVelocityX(-200);
        player.anims.play('left', true);
    } else if(cursor.right.isDown){
        player.setVelocityX(200);
        player.anims.play('right', true);
    }
}

function nextLevel(scene){
    level++;

    if(level>5){
        showEnding(scene);
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

let game = new Phaser.Game(config);