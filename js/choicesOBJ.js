class Choice {
  constructor(dialogue, characterSprite, room, textBox, brainMenuIMG, nextChoiceArray, playerOptions, playerEmote) {

    this.optionButtons = [];
    this.brainX = 1422.222;
    this.brainY = 327.2727;
    this.playerOptions = playerOptions;
    this.nextChoiceArray = nextChoiceArray;
    this.spriteImg = characterSprite;
    this.brainMenuIMG = brainMenuIMG
    this.textArray = dialogue;
    this.scene = room;
    this.textBox = textBox;

    //sabine: make showDialogueBox a member var of the class (so ech choice has its OWN)
    this.showDialogueBox = false; // initially false
    this.showBrainMenu = false; // initially false
    this.emotionIMG = playerEmote;
    this.dialogueReset = 0;


    let self = this;//keep a copy of 'this'
    this.dialogueIndex = 0; // new sabine: need a seperate index
  }

  //sets position and resize for character sprites
  drawCharacterSpriteElements(charspriteX, charSpriteY) {
    push();
    imageMode(CENTER);
    this.spriteImg.resize(0, 780);
    image(this.spriteImg, charspriteX, charSpriteY);
    pop();

  }

  //sets size and position of MC emotion
  drawPlayerEmotion() {
    push();
    imageMode(CENTER);
    this.emotionIMG.resize(150, 150);
    image(this.emotionIMG, 450, 300);
    pop();

  }



  // This section handles the dialogue

  //Functions draws the text boxes (needs to be edited)
  drawTextBox() {
    // text box
    if (this.showDialogueBox === true) {

      push();
      stroke("#FFF9");
      strokeWeight(5);
      fill(this.textBox.body.fill);
      rect(this.textBox.body.x, this.textBox.body.y, this.textBox.body.w, this.textBox.body.h);
      pop();
      push();
      fill("#FFFFFF");
      textSize(20);
      textAlign(LEFT);
      textFont('Courier New');
      //plug in wanted text here!
      text(this.textArray[this.dialogueIndex], this.textBox.body.x + 5, this.textBox.body.y + 5, this.textBox.body.w, this.textBox.body.h);
      pop();
    }
  }








  // sabine changed the name
  startDialogueTimer() {
    let self = this;
    //dialogue appearance for the play game custscene
    setTimeout(function () { self.showDialogueBox = true }, 1000);

  }


  //SABINE THIS WILL BE CALLED BY the mousePressed function in the main.js
  //Allows the player to click through the dialogues
  //This code is taken from another project and will serve as an example for "Think" but needs to be modified used for iterating through story dialogue
  Pressed() {

    if (this.showDialogueBox === true) {
      this.dialogueIndex++;
      // returns the Dialogue JSON path, selects the scene from the array, then the dialogue of that scene
      if (this.dialogueIndex === this.textArray.length) {

        //if done :)
        // this.dialogueIndex = this.dialogueReset;
        return true;

      }
    }

    return false;
  }

  // draws the brain choice menu
  brainActivate() {
    this.showBrainMenu = true

  }
  drawBrainMenu() {

    push();
    imageMode(CENTER);
    image(this.brainMenuIMG, this.brainX, this.brainY);
    pop();


  }



  drawOptions(playerChoicesFont) {
    for (let i = 0; i < this.playerOptions.length; i++) {
      push();
      textSize(20);
      textAlign(LEFT);
      textFont(playerChoicesFont);
      fill("red");

      rectMode(CORNER);

      fill("#d5427c");

      //plug in wanted text here!
      text(this.playerOptions[i], this.brainX - 130, this.brainY - 70 * i);
      pop();
      push()

    }

  }
  //bounding boxes that will serve as the bound for the brain choices click
  calculateBoundingBoxes(playerChoicesFont) {

    for (let i = 0; i < this.playerOptions.length; i++) {
      textSize(25);
      textAlign(LEFT);
      textFont(playerChoicesFont);
      let bbox = playerChoicesFont.textBounds(this.playerOptions[i], this.brainX - 130, this.brainY - 70 * i);

      this.optionButtons.push(bbox);

    }
  }


}




