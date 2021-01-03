

class EnemyController
{
    /**
     * Creates an instance of SimpleMoveController to show how we can move a sprite with a controller
     * @param {Vector2} moveDirection Vector2 direction mormalize with length=1 (see Vector2.Normalize())
     * @param {Number} moveSpeed Floating-point speed value
     * @memberof EnemyController
     */
    constructor(moveDirection, moveSpeed)
    {
          this.moveDirection = moveDirection;
          this.moveSpeed = moveSpeed;
    }


    /**
     * Executes the code inside the method to modify the parent (usually modifying Transform2D or AnimatedSpiteArtist)
     *
     * @param {*} gameTime
     * @param {*} parent
     * @memberof EnemyController
     */
    Execute(gameTime, parent)
    {
       let translateBy = Vector2.MultiplyScalar(this.moveDirection, gameTime.ElapsedTimeInMs * this.moveSpeed);
       parent.Transform2D.TranslateBy(translateBy);
      
      // parent.Transform2D.RotateBy(GDMath.ToRadians(30));

//if left or right key pressed and player is on the ground then add/remove move velocity
if (keyboardManager.IsKeyDown(this.moveKeys[0])) {
    parent.Body.AddVelocityX(-this.runVelocity * gameTime.ElapsedTimeInMs);
    //add your code here...
    parent.Artist.SetTake("fish_left");
  } else if (keyboardManager.IsKeyDown(this.moveKeys[1])) {
    parent.Body.AddVelocityX(this.runVelocity * gameTime.ElapsedTimeInMs);
    //add your code here...
    parent.Artist.SetTake("fish_right");
  }
            //NEED TO WORK ON HERE

    }


   Clone() {
    return new EnemyController(this.moveDirection, this.moveSpeed);
   }

   //to do...Equals, GetHashCode

}