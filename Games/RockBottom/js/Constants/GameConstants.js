/***************************************** Sprite Sheet Position & Animation Data ************************************************************************************************/

/**
 * Class to store together all sprite data for space invaders
 */
class SpriteData {

//#region Sprite Data

static RUNNER_ANIMATION_DATA = Object.freeze({
  id: "runner_animation_data",
  spriteSheet: document.getElementById("spritesheet_main"),
  alpha: 1,
  takes: {  
    "run_right" :  {       
      fps: 12,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 8,
      boundingBoxDimensions: new Vector2(49, 54), //notice I choose the largest of all the widths taken from the cellData array below
      cellData: [
        new Rect(414, 385, 47, 54),
        new Rect(362, 385, 44, 54),
        new Rect(314, 385, 39, 54),
        new Rect(265, 385, 46, 54),
        new Rect(205, 385, 49, 54),
        new Rect(150, 385, 46, 54),
        new Rect(96, 385, 46, 54),
        new Rect(45, 385, 35, 54),
        new Rect(0, 385, 35, 54)
      ]
    },
    "run_left" : {     
      fps: 12,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 8,
      boundingBoxDimensions: new Vector2(49, 54), //notice I choose the largest of all the widths taken from the cellData array below
      cellData: [
        new Rect(0, 305, 47, 54),
        new Rect(55, 305, 44, 54),
        new Rect(107, 305, 39, 54),
        new Rect(152, 305, 46, 54),
        new Rect(208, 305, 49, 54),
        new Rect(265, 305, 46, 54),
        new Rect(320, 305, 42, 54),
        new Rect(380, 305, 35, 54),
        new Rect(425, 305, 35, 54)
      ]
    }
  }
});

static ENEMY_ANIMATION_DATA = Object.freeze({
  id: "enemy_animation_data",
  spriteSheet: document.getElementById("spritesheet_main"),
  alpha: 1,
  takes: {  
    "wasp_fly" :  {    
      fps: 16,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 2,
      boundingBoxDimensions: new Vector2(35, 50), 
      cellData: [
        new Rect(20, 234, 35, 50),
        new Rect(90, 234, 35, 50),
        new Rect(160, 234, 35, 50)
      ]
    }
  }
});

static COLLECTIBLES_ANIMATION_DATA = Object.freeze({
  id: "collectibles_animation_data",
  spriteSheet: document.getElementById("spritesheet_coin"),
  alpha: 1,
  takes: {  
    "coin" :  {
      fps: 6,
      maxLoopCount: -1, //-1 = always, 0 = run once, N = run N times
      startCellIndex: 0,
      endCellIndex: 6,
      boundingBoxDimensions: new Vector2(46, 50), 
      cellData: [
        new Rect(40, 40, 880, 170),
        new Rect(160, 40, 880, 170),
        new Rect(280, 40, 880, 170),
        new Rect(400, 40, 880, 170),
        new Rect(520, 40, 880, 170),
        new Rect(640, 40, 880, 170),
      ]
    }
  }
});

static PLATFORM_DATA = Object.freeze({
  id: "platform",
  spriteSheet: document.getElementById("spritesheet_jungle"),
  sourcePosition: new Vector2(0, 112),
  sourceDimensions: new Vector2(48, 48),
  rotation: 0,
  scale: new Vector2(1, 1),
  origin: new Vector2(0, 0),
  alpha: 1,
  actorType: ActorType.Platform,
  translationArray: [
    //added spaces here so that you can easily see which grouping is which on screen
    new Vector2(100, 650),
    new Vector2(150, 650),
    new Vector2(200, 650),

    new Vector2(300, 650),
    new Vector2(350, 650),

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
