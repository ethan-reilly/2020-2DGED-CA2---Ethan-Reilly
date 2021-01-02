/***************************************** Sprite Sheet Position & Animation Data ************************************************************************************************/

/**
 * Class to store together all sprite data for space invaders
 */
class SpriteData {

//#region Sprite Data
static RUNNER_START_POSITION = new Vector2(100, 540);
static RUNNER_MOVE_KEYS = [Keys.A, Keys.D, Keys.Space, Keys.Enter];
static RUNNER_RUN_VELOCITY = 0.12;
static RUNNER_JUMP_VELOCITY = 0.5;

static RUNNER_ANIMATION_DATA = Object.freeze({
  id: "runner_animation_data",
  spriteSheet: document.getElementById("diver"),
  actorType: ActorType.Player,
  alpha: 1,
  takes: {  
    "run_right" :  {       
      fps: 9,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 4,
      boundingBoxDimensions: new Vector2(80, 110), 
      cellData: [
        new Rect(0, 0, 80, 110),
        new Rect(80, 0, 70, 110),
        new Rect(160, 0, 70, 110),
        new Rect(230, 0, 70, 110),
        new Rect(300, 0, 70, 110)
      ]
    },
    "run_left" : {     
      fps: 9,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 4,
      boundingBoxDimensions: new Vector2(80, 110),
      cellData: [
        new Rect(300, 113, 70, 110),
        new Rect(220, 113, 70, 110),
        new Rect(150, 113, 70, 110),
        new Rect(80, 113, 70, 110),
        new Rect(0, 113, 80, 110)
      ]
    }
  }
});

// static ENEMY_ANIMATION_DATA = Object.freeze({
//   id: "enemy_animation_data",
//   spriteSheet: document.getElementById("spritesheet_main"),
//   alpha: 1,
//   takes: {  
//     "wasp_fly" :  {    
//       fps: 16,
//       maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
//       startCellIndex: 0,
//       endCellIndex: 2,
//       boundingBoxDimensions: new Vector2(35, 50), 
//       cellData: [
//         new Rect(20, 234, 35, 50),
//         new Rect(90, 234, 35, 50),
//         new Rect(160, 234, 35, 50)
//       ]
//     }
//   }
// });


static COLLECTIBLES_ANIMATION_DATA = Object.freeze({
  id: "collectibles_animation_data",
  spriteSheet: document.getElementById("spritesheet_coin"),
  alpha: 1,
  actorType: ActorType.Pickup, 
  takes: {  
    "coin" :  {
      fps: 6,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 5,
      boundingBoxDimensions: new Vector2(19, 36), 
      cellData: [
        new Rect(11, 12, 38, 36),
        new Rect(55, 12, 23, 36),
        new Rect(101, 12, 17, 36),
        new Rect(147, 12, 10, 36),
        new Rect(187, 12, 18, 36),
        new Rect(224, 12, 29, 36)
      ]
    }
  }
});

static COLLECTIBLES_CHEST = Object.freeze({
  id: "collectible_chest",
  spriteSheet: document.getElementById("spritesheet_chest"),
  sourcePosition: new Vector2(56, 25),
  sourceDimensions: new Vector2(184, 146),
  rotation: 0,
  scale: new Vector2(.75, .75),
  origin: new Vector2(0, 0),
  alpha: 1,
  actorType: ActorType.Pickup,
  translationArray:[
    new Vector2(525, 40)
  ]
});

static PLATFORM_DATA = Object.freeze({
  id: "platform",
  spriteSheet: document.getElementById("platform"),
  sourcePosition: new Vector2(0, 0),
  sourceDimensions: new Vector2(47, 48),
  rotation: 0,
  scale: new Vector2(1, 1),
  origin: new Vector2(0, 0),
  alpha: 1,
  actorType: ActorType.Platform,
  translationArray: [
    //added spaces here so that you can easily see which grouping is which on screen
    //Left Wall
    new Vector2(0, 650),
    new Vector2(0, 600),
    new Vector2(-2, 500),
    new Vector2(0, 550),
    new Vector2(0, 450),
    new Vector2(0, 400),
    new Vector2(0, 350),
    new Vector2(0, 300),
    new Vector2(0, 250),
    new Vector2(0, 200),
    new Vector2(0, 150),
    new Vector2(0, 100),
    new Vector2(0, 50),
    new Vector2(0, 0),
    
    
    //Starting area 
    new Vector2(50, 650),
    new Vector2(100, 650),
    new Vector2(150, 650),
    new Vector2(200, 650),


    //First Jump
    new Vector2(400, 650),
    new Vector2(450, 650),
    new Vector2(500, 650),

  //Second area
    new Vector2(700, 650),
    new Vector2(750, 650),
    new Vector2(800, 650), 
    new Vector2(850, 650),
    new Vector2(900, 650),
    new Vector2(950, 650),


    //Right Wall
    new Vector2(950, 600),
    new Vector2(950, 550),  
      new Vector2(850, 600),
      new Vector2(900, 600),
      new Vector2(900, 550),
    new Vector2(950, 500), 
    new Vector2(950, 450),  
    new Vector2(950, 400),
    new Vector2(950, 350),
    new Vector2(950, 300),
    new Vector2(950, 250),
    new Vector2(950, 200),
    new Vector2(950, 150),
    new Vector2(950, 100),
    new Vector2(900, 100),
    new Vector2(850, 100),
    new Vector2(800, 100),
    new Vector2(750, 100),
    new Vector2(700, 100),
    new Vector2(650, 100),
    new Vector2(650, 50),
    new Vector2(650, 0),


    //Single block with coin
    new Vector2(700, 450),


    //Second jump
    new Vector2(450, 400),
    new Vector2(400, 400),
    new Vector2(350, 400),


    //Connected to left wall
    new Vector2(50, 250),


    //Single block no coin
    new Vector2(150, 350),


    //Two blocks
    new Vector2(200, 150),
    new Vector2(250, 150),

    //End platform
    new Vector2(400, 150),
    new Vector2(450, 150),
    new Vector2(500, 150),
    new Vector2(550, 150),
    new Vector2(600, 150),


  ]
});

static BACKGROUND_DATA = [
  {
      id: "background_1",
      spriteSheet: document.getElementById("far"),
      sourcePosition: new Vector2(0, 0),
      sourceDimensions: new Vector2(256,192),
      translation: new Vector2(0, 0),
      rotation: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      alpha: 1,
      actorType: ActorType.Background,
      layerDepth: 1,
      scrollSpeedMultiplier: 0.1
    },
    {
      id: "background_2",
      spriteSheet: document.getElementById("sand"),
      sourcePosition: new Vector2(0, 0),
      sourceDimensions: new Vector2(256, 192),
      translation: new Vector2(0, 0),
      rotation: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      alpha: 1,
      actorType: ActorType.Background,
      layerDepth: 1,
      scrollSpeedMultiplier: 0.15
    },
    {
      id: "background_3",
      spriteSheet: document.getElementById("foreground"),
      sourcePosition: new Vector2(0, 0),
      sourceDimensions: new Vector2(512, 192),
      translation: new Vector2(0, 0),
      rotation: 0,
      scale: new Vector2(1, 1),
      origin: new Vector2(0, 0),
      alpha: 1,
      actorType: ActorType.Background,
      layerDepth: 1,
      scrollSpeedMultiplier: 0.2
    }
];
//#endregion

}
