"use strict"; //throw an exception if a variable is used without being declared

window.addEventListener("load", Start);

/********************************* Game Engine Core Variables & Functions (Do Not Change in Your Game) *********************************/

//#region Core Variables [DO NOT CHANGE]
//get a handle to the canvas
var cvs = document.getElementById("main_canvas");

//get a handle to the 2D context of the canvas
var ctx = cvs.getContext("2d");

//stores elapsed and total game time
var gameTime = null;

//managers
var objectManager = null;
var soundManager = null;
var keyboardManager = null;

//debug
var debugDrawer = null;

//#endregion


function LoadDebug(bDebugEnabled) {
  if (bDebugEnabled)
    debugDrawer = new DebugDrawer(
      "shows debug info",
      StatusType.Update | StatusType.Drawn,
      ctx,
      objectManager
    );
}
//#region Functions

//#region Start & Animate
function Start() {
  //instanticate GameTime
  gameTime = new GameTime();

  //load managers
  LoadManagers();

  //Initialize all assets (sound, textures), load all sprites, load all managers
  Initialize();

  //start Update/Draw cycle i.e. start the game
  window.requestAnimationFrame(Animate);
}

function Animate(now) {
  //update game time
  gameTime.Update(now);

  //update all sprites whose state can change over time
  Update(gameTime);

  //draw all sprite
  Draw(gameTime);


  //request the next frame to repeat the update/draw cycle
  window.requestAnimationFrame(Animate);
}


/**
 * Loads the code managers used by the game (object, keyboard, sound)
 */
function LoadManagers() {
  objectManager = new ObjectManager(ctx, StatusType.Drawn);
  keyboardManager = new KeyboardManager();
  soundManager = new SoundManager(cueArray);
}

//#endregion

//#region Update, Draw & Clear
function Update(gameTime) {
  if(!gameEnded)
  {
  //call object manager to update all sprites
  objectManager.Update(gameTime);

  //Check for menu, win/lose, sound events
  HandleInput(gameTime);

  //update scores on the UI
  UpdateGameState(gameTime);
  }
}

function Draw(gameTime) {
  if(gameStarted)
  {
  //if we add a pattern or animate the canvas then we shouldnt clear the background
  ClearCanvas(Color.White);

  //call object manager to draw all sprites
  objectManager.Draw(gameTime);

  if (debugDrawer) debugDrawer.Draw(gameTime);
}
else
{
  CanvasGradient("blue", "purple");
  //CanvasGradient("gold", "blue");
}

}

//https://www.w3schools.com/html/html5_canvas.asp
function CanvasGradient(color1, color2)
{
  var grd = ctx.createLinearGradient(0, 0, 750, 0);
  grd.addColorStop(0, color1);
  grd.addColorStop(1, color2);

  // Fill with gradient
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 1024, 768);
}

function ClearCanvas(color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, cvs.clientWidth, cvs.clientHeight);
  ctx.restore();
}
//#endregion

//#endregion

/********************************* Game-Specific Variables & Functions (Change in Your Game) *********************************/
//#region Game Specific Variables [CHANGE FOR YOUR GAME]
//stores object manager which holds all sprites

const cueArray = [
  new AudioCue("coin_pickup", 1, 1, false, 1),
  new AudioCue("gunshot", 1, 1, false, 0),
  new AudioCue("hit", 1, 1, false, 0),
  new AudioCue("lose", 1, 1, false, 0),
  new AudioCue("win", 1, 1, false, 0),
  new AudioCue("background", 1, 1, true, 0),
  //add more cues here but make sure you load in the HTML!
];

var health = 100;
var hitCooldown = 0;
var score = 0;
var gameStarted = false;
var gameEnded = false;
//#endregion

function Initialize() {
  //debug drawer to show bounding rect or circle around collidable sprites
  LoadDebug(true);

  //load sprites
  LoadSprites();
}

function UpdateGameState(gameTime) {

  if(!gameEnded)
  {
    //update UI with new score
    var scoreElement = document.getElementById("ui_score");
    if (scoreElement && gameStarted) {
      scoreElement.style.display = "block";
      scoreElement.innerHTML = "Score: " + score;
    }

    var healthElement = document.getElementById("ui_health");
    if (healthElement && gameStarted) {
      healthElement.style.display = "block";
      healthElement.innerHTML = "Health: " + health;
    }
  }

  if (score > 60 ){
    // var canvas = document.getElementById("parent_container");
    // canvas.style.display = "none";
    var message = document.getElementById("menu_winlose");
    message.style.display = "block";

    gameEnded = true;
    //gameStarted = false;
  }

  if (health <= 0 ){
    health = 0;

    var message = document.getElementById("menu_winlose");
    message.innerHTML = "You Lose!";
    message.style.display = "block";

    gameEnded = true;
  }
  //if score == 100 then show "You Win! or if time exceeds 60000ms then "Time Up! You Lose!"
}


/**
 * Use this function to check for keyboard or mouse input and start the game, mute sounds,
 * show/hide UI elements
 *
 * @param {*} gameTime
 */
function HandleInput(gameTime) {

  //is the game starting
  if (keyboardManager.IsKeyDown(Keys.Enter)) {
    StartGame(gameTime);
  }

  //add more code to check for input (e.g. O for Objective)

  //is score == 0
    //sound
    //show div
    //pause object manager
}

function StartGame(gameTime){

  // //set any win/lose variables
  var healthElement = document.getElementById("ui_health");
  healthElement.style.display = "block";
  healthElement.innerHTML = "Health: " + health ;

  var scoreElement = document.getElementById("ui_score");
  scoreElement.style.display = "block";
  scoreElement.innerHTML = "Score: " + score;

  var countdown = document.getElementById("ui_countdown");
  countdown.style.display = "block";

  //Hide "Press Enter"
  document.getElementById("menu_opening").style.display = "none";

  //unpause game
  objectManager.StatusType = StatusType.Drawn | StatusType.Updated;

  //play sound
  soundManager.Play("background");

  gameStarted = true;
}

function LoadSprites() {
  LoadPlayerSprite();
  LoadPlatformSprites();
  LoadBackgroundSprites();
  LoadPickupSprites(); 
  LoadChestSprite();
  LoadEnemySprites();

}

function LoadPlatformSprites() {
  //access the data
  var platformData = SpriteData.PLATFORM_DATA;

  //create tha artist
  let spriteArtist = new SpriteArtist(
    ctx,
    platformData.spriteSheet,
    platformData.alpha,
    platformData.sourcePosition,
    platformData.sourceDimensions
  );

  //create the transform
  let transform = new Transform2D(
    platformData.translationArray[0],
    platformData.rotation,
    platformData.scale,
    platformData.origin,
    platformData.sourceDimensions
  );

  //create a single archetypal platform sprite
  let archetypeSprite = new Sprite(
    platformData.id,
    platformData.actorType,
    StatusType.Updated | StatusType.Drawn,
    transform,
    spriteArtist
  );

  //now clone the archetype
  let clone = null;
  for (let i = 0; i < platformData.translationArray.length; i++) {
    clone = archetypeSprite.Clone();
    //set the position of the clone
    clone.Transform2D.Translation = platformData.translationArray[i];
    //dont forget - if its collidable then it needs a circle or rect collision primitive
    clone.collisionPrimitive = new RectCollisionPrimitive(clone.Transform2D, 0);
    //add to the manager
    objectManager.Add(clone);
  }
}

function LoadBackgroundSprites() {
  var backgroundData = SpriteData.BACKGROUND_DATA;

  for (let i = 0; i < backgroundData.length; i++) {
    let spriteArtist = new SpriteArtist(
      ctx,
      backgroundData[i].spriteSheet,
      backgroundData[i].alpha,
      backgroundData[i].sourcePosition,
      backgroundData[i].sourceDimensions
    );

    let transform = new Transform2D(
      backgroundData[i].translation,
      backgroundData[i].rotation,
      backgroundData[i].scale,
      backgroundData[i].origin,
      new Vector2(cvs.clientWidth, cvs.clientHeight)
    );

    objectManager.Add(
      new Sprite(
        backgroundData[i].id,
        backgroundData[i].actorType,
        StatusType.Updated | StatusType.Drawn,
        transform,
        spriteArtist,
        backgroundData[i].layerDepth
      ));
  }
}

function LoadPlayerSprite() {
  //step 1 - create AnimatedSpriteArtist
  var takeName = "run_right";
  var artist = new AnimatedSpriteArtist(ctx, SpriteData.RUNNER_ANIMATION_DATA);

  //step 2 - set initial take
  artist.SetTake(takeName);

  //step 3 - create transform and use bounding box from initial take (this is why we make AnimatedSpriteArtist before Transform2D)
  let transform = new Transform2D(
    SpriteData.RUNNER_START_POSITION,
    0,
    Vector2.One,
    Vector2.Zero,
    artist.GetSingleFrameDimensions("run_right"),
    0
  );

  //step 4 - create the CollidableSprite which adds Body which allows us to test for collision and add gravity
  let playerSprite = new CollidableSprite(
    "player",
    ActorType.Player,
    StatusType.Updated | StatusType.Drawn,
    transform,
    artist,
    1
  );

  //step 5 - set performance characteristics of the body attached to the moveable sprite
  playerSprite.Body.MaximumSpeed = 6;
  playerSprite.Body.Friction = FrictionType.Normal;
  playerSprite.Body.Gravity = GravityType.UnderWater;

  //step 6 - add collision surface
  playerSprite.collisionPrimitive = new RectCollisionPrimitive(
    playerSprite.Transform2D,
    0
  );

  //step 7 - add movement controller
  playerSprite.AttachController(
    new PlayerController(
      SpriteData.RUNNER_MOVE_KEYS,
      SpriteData.RUNNER_RUN_VELOCITY,
      SpriteData.RUNNER_JUMP_VELOCITY
    )
  );

  //step 8 - add to the object manager so it is drawn (if we set StatusType.Drawn) and updated (if we set StatusType.Updated)
  objectManager.Add(playerSprite); //add player sprite
}


function LoadPickupSprites() {
   //to add lots of pickups we can also just create a local array of positions for the pickups
   let pickTranslationArray = [
    new Vector2(450, 525),
    new Vector2(525, 525),
    new Vector2(725, 425),
    new Vector2(455, 325),
    new Vector2(380, 325),
    new Vector2(75, 175),
  ];

  //set the take name for the animation - we could change to "gold_glint" easily
  var takeName = "coin";

  //loop through the translation array
  for (var translation of pickTranslationArray) {
    //create an animated artist
    let spriteArtist = new AnimatedSpriteArtist(
      ctx,
      SpriteData.COLLECTIBLES_ANIMATION_DATA
    );

    //set the take
    spriteArtist.SetTake(takeName);

    //retrieve the dimensions of a single frame of the animation for the bounding box
    var frameDimensions = spriteArtist.GetSingleFrameDimensions(takeName);

    //set the origin so that the collision surface is in the center of the sprite
    var origin = Vector2.DivideScalar(frameDimensions, 2);

    //create a transform to position the pickup
    let transform = new Transform2D(
      translation,
      0,
      Vector2.One,
      origin,
      frameDimensions
    );

    //create the sprite and give it type "Pickup"
    let pickupSprite = new Sprite(
      "coin",
      ActorType.Pickup,
      StatusType.Updated | StatusType.Drawn,
      transform,
      spriteArtist,
      1
    );

    // add the collision surface to test for collisions against
    pickupSprite.collisionPrimitive = new CircleCollisionPrimitive(
      pickupSprite.Transform2D,
      15
    );

    //add to the object manager
    objectManager.Add(pickupSprite);
  }
}

function LoadEnemySprites() {
   //step 1 - create AnimatedSpriteArtist
  var takeName = "fish_right";
  var artist = new AnimatedSpriteArtist(ctx, SpriteData.ENEMY_ANIMATION_DATA);

  //step 2 - set initial take
  artist.SetTake(takeName);

  //step 3 - create transform and use bounding box from initial take (this is why we make AnimatedSpriteArtist before Transform2D)
  let transform = new Transform2D(
    SpriteData.ENEMY_START_POSITION,
    0,
    Vector2.One,
    Vector2.Zero,
    artist.GetSingleFrameDimensions("fish_right"),
    0
  );

  //step 4 - create the CollidableSprite which adds Body which allows us to test for collision and add gravity
  let enemySprite = new CollidableSprite(
    "enemy",
    ActorType.Enemy,
    StatusType.Updated | StatusType.Drawn,
    transform,
    artist,
    1
  );

  //step 5 - set performance characteristics of the body attached to the moveable sprite
  enemySprite.Body.MaximumSpeed = 3;
  enemySprite.Body.Friction = FrictionType.Normal;
  enemySprite.Body.Gravity = GravityType.UnderWater;

  //step 6 - add collision surface
  enemySprite.collisionPrimitive = new RectCollisionPrimitive(
    enemySprite.Transform2D,
    0
  );

  //step 7 - add movement controller
  // enemySprite.AttachController(
  //   new EnemyController(
     
  //   )
  // );

  //step 8 - add to the object manager so it is drawn (if we set StatusType.Drawn) and updated (if we set StatusType.Updated)
  objectManager.Add(enemySprite); //add player sprite
}

function LoadChestSprite(){
//access the data
var chestData = SpriteData.COLLECTIBLES_CHEST;

//create tha artist
let spriteArtist = new SpriteArtist(
  ctx,
  chestData.spriteSheet,
  chestData.alpha,
  chestData.sourcePosition,
  chestData.sourceDimensions
);

//create the transform
let transform = new Transform2D(
  chestData.translationArray[0],
  chestData.rotation,
  chestData.scale,
  chestData.origin,
  chestData.sourceDimensions
);

//create a single archetypal platform sprite
let archetypeSprite = new Sprite(
  chestData.id,
  chestData.actorType,
  StatusType.Updated | StatusType.Drawn,
  transform,
  spriteArtist
);

//now clone the archetype
let clone = null;
for (let i = 0; i < chestData.translationArray.length; i++) {
  clone = archetypeSprite.Clone();
  //set the position of the clone
  clone.Transform2D.Translation = chestData.translationArray[i];
  //dont forget - if its collidable then it needs a circle or rect collision primitive
  clone.collisionPrimitive = new RectCollisionPrimitive(clone.Transform2D, 0);
  //add to the manager
  objectManager.Add(clone);
}
}


//#region DEMO - REMOVE LATER
/***************************************DEMO FUNCTIONS ***************************************/

//#endregion
