/**
 * 'Think - Demo'
 * Olivia Axiuk Julia Axiuk
 *  * Made with p5
* https://p5js.org/

Music Attribution: AnalogueCabin by Noir et Blanc Vie, found in Youtube Audio Library
Mouse clicking sound: Mouse click by Devern on Freesound.com
 */

"use strict";



/**
 * Welcome to 'Think - Demo'. 'Think' is an interactive, decisions-based web-novel. Play in the POV of the main character in her newly adult life, trying to navigate the regular hardships of growing up,
 * such as college studies, friends, identity... and something much more sinister.
 * Every choice you make to help the MC (Main Character) leads to a new path, and see how the different emotions from each of these choices influence those around you.
 * 'Think - Demo' shows the basics of the game's functionality, introduces you to two of the main characters that MC interacts with, and allows you to experience an snippet of the final atmosphere of 'Think'.
 * Click to cycle through dialogue, choose what MC is thinking from the 'brain' menu in the upper right, and watch as the MCs emotions in the left change and characters react.
 * 
* */



// Variables for the UI
let uiBorder = undefined;
let brainIdle = undefined;
let brainMenu = undefined;
//Variables for the background images
let dormBG = undefined;
let computerLabBG = undefined;
let introIMG = undefined;
let endingIMG = undefined;

// Variable to laod in the dialogue
let storyDialogue = undefined;

// Viariable for the Index of the scenes array
let sceneIndex = 0;

//set inital state 
let state = "start"

// X and Y for the character sprties (later defined)
let charspriteX = 1920 / 2;
let charSpriteY = 1080 / 2 + 20;


// loads in the timer based on the JSON file
let textBoxDelay = {
    counter: undefined
};


// Defines the speech box for the character currently being interacted with
const textBoxSpeech = {
    body: {
        x: 600,
        y: 700,
        w: 825,
        h: 200,
        fill: ("#000a")
    },
}


// Font is a google font loaded in
let playerChoicesFont;

// Character Sprites
let saraNeutral = undefined;
let saraSad = undefined;
let saraShock = undefined;
let renAnnoyed = undefined;
let renNeutral = undefined;
let renHappy = undefined;
let renSad = undefined;
let renShock = undefined;

//player emotions

let playerSad = undefined;
let playerHappy = undefined;
let playerNeutral = undefined;
let playerAngry = undefined;
let playerAnxious = undefined;

//sounds
let mouseClickSound = undefined;
let musictrack = undefined

//load in all sprites
function preload() {
    //load story mode dialogue data
    storyDialogue = loadJSON("assets/Data/dialogue.JSON");
    //sprites and sounds
    // UI
    uiBorder = loadImage("assets/images/UI/border.PNG");
    brainIdle = loadImage("assets/images/UI/brain_idle.PNG");
    brainMenu = loadImage("assets/images/UI/brain_options.PNG");
    introIMG = loadImage("assets/images/UI/intro.png");
    endingIMG = loadImage("assets/images/UI/ending.png");
    // CHaracter Sprites
    saraNeutral = loadImage("assets/images/Sprites/Sara_neutral.PNG");
    saraSad = loadImage("assets/images/Sprites/Sara_sad.PNG");
    saraShock = loadImage("assets/images/Sprites/Sara_shock.PNG");
    renNeutral = loadImage("assets/images/Sprites/Ren_neutral.PNG");
    renHappy = loadImage("assets/images/Sprites/Ren_happy.PNG");
    renAnnoyed = loadImage("assets/images/Sprites/Ren_annoyed.PNG");
    renSad = loadImage("assets/images/Sprites/Ren_sad.PNG");
    renShock = loadImage("assets/images/Sprites/Ren_shock.PNG");
    // Player Emotes
    playerNeutral = loadImage("assets/images/Sprites/player_neutral.PNG");
    playerSad = loadImage("assets/images/Sprites/player_sad.PNG");
    playerHappy = loadImage("assets/images/Sprites/player_happy.PNG");
    playerAngry = loadImage("assets/images/Sprites/player_angry.PNG");
    playerAnxious = loadImage("assets/images/Sprites/player_anxious.PNG");
    dormBG = loadImage("assets/images/BGs/dorm_BG.PNG");
    computerLabBG = loadImage("assets/images/BGs/computerlab_BG.PNG");
    playerChoicesFont = loadFont("assets/Data/Roboto-Regular.ttf");
    //Sounds
    soundFormats("mp3", "wav");
    musictrack = loadSound("assets/sounds/intromusic.mp3");
    mouseClickSound = loadSound("assets/sounds/mouse-click-sound.wav");

}


//SABINE ADDITION::
//A: since there is only one active choice at the time .. 
//make an activeChoice var to hold the `activatedChoice`
let currentActivatedChoice = null;
let choices = [];



function setup() {
    createCanvas(1920, 1080);
    // load dialogue arrays from the JSON
    const dialogArray00 = storyDialogue.Scenes[0].Dialogue;
    const dialogArray01 = storyDialogue.Scenes[1].Dialogue;
    const dialogArray02 = storyDialogue.Scenes[2].Dialogue;
    const dialogArray03 = storyDialogue.Scenes[3].Dialogue;
    const dialogArray04 = storyDialogue.Scenes[4].Dialogue;
    const dialogArray05 = storyDialogue.Scenes[5].Dialogue;
    const dialogArray06 = storyDialogue.Scenes[6].Dialogue;
    const dialogArray07 = storyDialogue.Scenes[7].Dialogue;
    const dialogArray08 = storyDialogue.Scenes[8].Dialogue;
    const dialogArray09 = storyDialogue.Scenes[9].Dialogue;
    const dialogArray10 = storyDialogue.Scenes[10].Dialogue;
    const dialogArray11 = storyDialogue.Scenes[11].Dialogue;
    const dialogArray12 = storyDialogue.Scenes[12].Dialogue;
    const dialogArray13 = storyDialogue.Scenes[13].Dialogue;
    const dialogArray14 = storyDialogue.Scenes[14].Dialogue;
    const dialogArray15 = storyDialogue.Scenes[15].Dialogue;
    const dialogArray16 = storyDialogue.Scenes[16].Dialogue;
    const dialogArray17 = storyDialogue.Scenes[17].Dialogue;
    const dialogArray18 = storyDialogue.Scenes[18].Dialogue;
    const dialogArray19 = storyDialogue.Scenes[19].Dialogue;
    const dialogArray20 = storyDialogue.Scenes[20].Dialogue;
    const dialogArray21 = storyDialogue.Scenes[21].Dialogue;
    const dialogArray22 = storyDialogue.Scenes[22].Dialogue;
    const dialogArray23 = storyDialogue.Scenes[23].Dialogue;
    const dialogArray24 = storyDialogue.Scenes[24].Dialogue;
    const dialogArray25 = storyDialogue.Scenes[25].Dialogue;
    textBoxDelay.counter = storyDialogue.Scenes[sceneIndex].Delay;
    // all potential choices defined using the Choice constructor in ChoicesOBJ


    choices.push(new Choice(dialogArray00, saraNeutral, "Dorm", textBoxSpeech, brainMenu, storyDialogue.Scenes[0].NextChoices, storyDialogue.Scenes[0].playerOptions, playerNeutral));
    choices[0].calculateBoundingBoxes(playerChoicesFont);

    choices.push(new Choice(dialogArray01, saraSad, "Dorm", textBoxSpeech, brainMenu, storyDialogue.Scenes[1].NextChoices, storyDialogue.Scenes[1].playerOptions, playerNeutral));
    choices[1].calculateBoundingBoxes(playerChoicesFont);

    choices.push(new Choice(dialogArray02, saraNeutral, "Dorm", textBoxSpeech, brainMenu, storyDialogue.Scenes[2].NextChoices, storyDialogue.Scenes[2].playerOptions, playerNeutral));
    choices[2].calculateBoundingBoxes(playerChoicesFont);

    choices.push(new Choice(dialogArray03, saraNeutral, "Dorm", textBoxSpeech, brainMenu, storyDialogue.Scenes[3].NextChoices, storyDialogue.Scenes[3].playerOptions, playerNeutral));
    choices[3].calculateBoundingBoxes(playerChoicesFont);

    choices.push(new Choice(dialogArray04, saraNeutral, "Dorm", textBoxSpeech, brainMenu, storyDialogue.Scenes[4].NextChoices, storyDialogue.Scenes[4].playerOptions, playerHappy));
    choices[4].calculateBoundingBoxes(playerChoicesFont);

    choices.push(new Choice(dialogArray05, saraSad, "Dorm", textBoxSpeech, brainMenu, storyDialogue.Scenes[5].NextChoices, storyDialogue.Scenes[5].playerOptions, playerNeutral));
    choices[5].calculateBoundingBoxes(playerChoicesFont);

    choices.push(new Choice(dialogArray06, saraShock, "Dorm", textBoxSpeech, brainMenu, storyDialogue.Scenes[6].NextChoices, storyDialogue.Scenes[6].playerOptions, playerAnxious));
    choices[6].calculateBoundingBoxes(playerChoicesFont);

    choices.push(new Choice(dialogArray07, saraSad, "Dorm", textBoxSpeech, brainMenu, storyDialogue.Scenes[7].NextChoices, storyDialogue.Scenes[7].playerOptions, playerNeutral));
    choices[7].calculateBoundingBoxes(playerChoicesFont);

    choices.push(new Choice(dialogArray08, saraShock, "Dorm", textBoxSpeech, brainMenu, storyDialogue.Scenes[8].NextChoices, storyDialogue.Scenes[8].playerOptions, playerNeutral));
    choices[8].calculateBoundingBoxes(playerChoicesFont);

    choices.push(new Choice(dialogArray09, renNeutral, "lab", textBoxSpeech, brainMenu, storyDialogue.Scenes[9].NextChoices, storyDialogue.Scenes[9].playerOptions, playerNeutral));
    choices[9].calculateBoundingBoxes(playerChoicesFont);

    choices.push(new Choice(dialogArray10, renShock, "lab", textBoxSpeech, brainMenu, storyDialogue.Scenes[10].NextChoices, storyDialogue.Scenes[10].playerOptions, playerAnxious));
    choices[10].calculateBoundingBoxes(playerChoicesFont);

    choices.push(new Choice(dialogArray11, renHappy, "lab", textBoxSpeech, brainMenu, storyDialogue.Scenes[11].NextChoices, storyDialogue.Scenes[11].playerOptions, playerHappy));
    choices[11].calculateBoundingBoxes(playerChoicesFont);

    choices.push(new Choice(dialogArray12, renNeutral, "lab", textBoxSpeech, brainMenu, storyDialogue.Scenes[12].NextChoices, storyDialogue.Scenes[12].playerOptions, playerNeutral));
    choices[12].calculateBoundingBoxes(playerChoicesFont);

    choices.push(new Choice(dialogArray13, renNeutral, "lab", textBoxSpeech, brainMenu, storyDialogue.Scenes[13].NextChoices, storyDialogue.Scenes[13].playerOptions, playerNeutral));
    choices[13].calculateBoundingBoxes(playerChoicesFont);

    choices.push(new Choice(dialogArray14, renHappy, "lab", textBoxSpeech, brainMenu, storyDialogue.Scenes[14].NextChoices, storyDialogue.Scenes[14].playerOptions, playerNeutral));
    choices[14].calculateBoundingBoxes(playerChoicesFont);

    choices.push(new Choice(dialogArray15, renShock, "lab", textBoxSpeech, brainMenu, storyDialogue.Scenes[15].NextChoices, storyDialogue.Scenes[15].playerOptions, playerHappy));
    choices[15].calculateBoundingBoxes(playerChoicesFont);

    choices.push(new Choice(dialogArray16, renNeutral, "lab", textBoxSpeech, brainMenu, storyDialogue.Scenes[16].NextChoices, storyDialogue.Scenes[16].playerOptions, playerNeutral));
    choices[16].calculateBoundingBoxes(playerChoicesFont);

    choices.push(new Choice(dialogArray17, renAnnoyed, "lab", textBoxSpeech, brainMenu, storyDialogue.Scenes[17].NextChoices, storyDialogue.Scenes[17].playerOptions, playerNeutral));
    choices[17].calculateBoundingBoxes(playerChoicesFont);

    choices.push(new Choice(dialogArray18, renShock, "lab", textBoxSpeech, brainMenu, storyDialogue.Scenes[18].NextChoices, storyDialogue.Scenes[18].playerOptions, playerAnxious));
    choices[18].calculateBoundingBoxes(playerChoicesFont);

    choices.push(new Choice(dialogArray19, renSad, "lab", textBoxSpeech, brainMenu, storyDialogue.Scenes[19].NextChoices, storyDialogue.Scenes[19].playerOptions, playerSad));
    choices[19].calculateBoundingBoxes(playerChoicesFont);

    choices.push(new Choice(dialogArray20, renSad, "lab", textBoxSpeech, brainMenu, storyDialogue.Scenes[20].NextChoices, storyDialogue.Scenes[20].playerOptions, playerAngry));
    choices[20].calculateBoundingBoxes(playerChoicesFont);

    choices.push(new Choice(dialogArray21, renNeutral, "lab", textBoxSpeech, brainMenu, storyDialogue.Scenes[21].NextChoices, storyDialogue.Scenes[21].playerOptions, playerNeutral));
    choices[21].calculateBoundingBoxes(playerChoicesFont);

    choices.push(new Choice(dialogArray22, renHappy, "lab", textBoxSpeech, brainMenu, storyDialogue.Scenes[22].NextChoices, storyDialogue.Scenes[22].playerOptions, playerNeutral));
    choices[22].calculateBoundingBoxes(playerChoicesFont);

    choices.push(new Choice(dialogArray23, renHappy, "lab", textBoxSpeech, brainMenu, storyDialogue.Scenes[23].NextChoices, storyDialogue.Scenes[23].playerOptions, playerHappy));
    choices[23].calculateBoundingBoxes(playerChoicesFont);

    choices.push(new Choice(dialogArray24, renNeutral, "lab", textBoxSpeech, brainMenu, storyDialogue.Scenes[24].NextChoices, storyDialogue.Scenes[24].playerOptions, playerNeutral));
    choices[24].calculateBoundingBoxes(playerChoicesFont);

    choices.push(new Choice(dialogArray25, renSad, "lab", textBoxSpeech, brainMenu, storyDialogue.Scenes[25].NextChoices, storyDialogue.Scenes[25].playerOptions, playerAnxious));
    choices[25].calculateBoundingBoxes(playerChoicesFont);

    choices.push(new Choice(dialogArray25, renHappy, "ending", textBoxSpeech, brainMenu, storyDialogue.Scenes[26].NextChoices, storyDialogue.Scenes[26].playerOptions, playerAnxious));
    choices[26].calculateBoundingBoxes(playerChoicesFont);

    //SABINE: at the beginning -> the activatedchoice will be DormChoice00:
    currentActivatedChoice = choices[sceneIndex];


}


/**
 * drawws black background and sets the states
*/
function draw() {
    background(0, 0, 0);


    /*SABINE:: idea: for every transition to a new "choice"
    have a state to `set-up` the choice ...: will run ONE time -
    then we have the actual state (which loops..)
    WHY? - well because we do not want to have a setTimeout run in a loop - 
    as well as possibly other vars to be set up ONE TIME ..
    so we need to differentiate */

    if (state === "Dorm-setup") {
        setupdorm();
        //immediatly after one time - change state
        state = "Dorm"


    }
    else if (state === "Dorm") {
        dorm();


    }

    if (state === "lab-setup") {
        currentActivatedChoice.showDialogueBox = false;
        setupdorm();
        //immediatly after one time - change state
        state = "computerLab"


    }
    else if (state === "computerLab") {
        lab();


    }

    if (state === "ending") {
        currentActivatedChoice.showDialogueBox = false;
        ending();


    }

    if (state === "start") {
        currentActivatedChoice.showDialogueBox = false;

        start();


    }
}


//go to setup every time we initate a new choice... 
function setupdorm() {
    //delay in the dialogue box popping up at the beginning of both states
    currentActivatedChoice.startDialogueTimer();
}


//start the game
//draws all the elements in the first state
function dorm() {
    drawBG(dormBG, width / 2, height / 2);
    currentActivatedChoice.drawCharacterSpriteElements(charspriteX, charSpriteY);
    drawUI(uiBorder, width / 2, height / 2);
    drawUI(brainIdle, width / 1.35, height / 3.3);
    currentActivatedChoice.drawPlayerEmotion();
    currentActivatedChoice.drawTextBox();
    //activates the dialogue
    if (currentActivatedChoice.showBrainMenu === true) {
        currentActivatedChoice.drawBrainMenu();
        currentActivatedChoice.drawOptions(playerChoicesFont);
    }
    //changes to the lab state when that option is reached
    if (currentActivatedChoice.scene === "lab") {
        state = "lab-setup"

    };
}


//sets up the lab state
function lab() {
    drawBG(computerLabBG, width / 2, height / 2);
    currentActivatedChoice.drawCharacterSpriteElements(charspriteX, charSpriteY);
    drawUI(uiBorder, width / 2, height / 2);
    drawUI(brainIdle, width / 1.35, height / 3.3);
    currentActivatedChoice.drawPlayerEmotion();
    currentActivatedChoice.drawTextBox();
    if (currentActivatedChoice.showBrainMenu === true) {
        currentActivatedChoice.drawBrainMenu();
        currentActivatedChoice.drawOptions(playerChoicesFont);
    }

    if (currentActivatedChoice.scene === "ending") {
        state = "ending"

    };


}

//draws ending screen
function ending() {
    drawBG(endingIMG, width / 2, height / 2);
    drawUI(uiBorder, width / 2, height / 2);
}

//draws start screen
function start() {
    drawBG(introIMG, width / 2, height / 2);
    drawUI(uiBorder, width / 2, height / 2);

}


//draws the UI
function drawUI(uiElement, x, y,) {
    push();
    imageMode(CENTER);
    image(uiElement, x, y);
    pop();

}


//resizesa and draws all BGs
function drawBG(bgIMG, x, y,) {
    push();
    imageMode(CENTER);
    image(bgIMG, x, y);
    bgIMG.resize(0, 900);
    pop();

}

//cycles through dialogue, restarts and starts the game,  and allows choices in the brain menu to activate based on the mouse pressed
function mousePressed() {
    //plays click sound on click
    mouseClickSound.play();
    if (currentActivatedChoice.showBrainMenu === true) {

        for (let i = 0; i < currentActivatedChoice.playerOptions.length; i++) {
            let playerOptionBounds = currentActivatedChoice.optionButtons[i];


            if (mouseX >= playerOptionBounds.x && mouseX <= (playerOptionBounds.x + playerOptionBounds.w) && mouseY >= playerOptionBounds.y && mouseY <= (playerOptionBounds.y + playerOptionBounds.h)) {

                let newIndex = currentActivatedChoice.nextChoiceArray[i];

                currentActivatedChoice = choices[newIndex];
                currentActivatedChoice.showDialogueBox = true;
            }


        }

    }
    else {
        //check if this activated choice is done ... 
        let goToNextChoice = currentActivatedChoice.Pressed();
        if (goToNextChoice === true) {

            currentActivatedChoice.brainActivate();


        }
        if (state === "ending") {
            currentActivatedChoice = choices[0];
            for (let i = 0; i < choices.length; i++) {
                choices[i].dialogueIndex = 0;
                choices[i].showBrainMenu = false;

            }
            state = "Dorm-setup";
        }
        //plays music on first click and loops it
        if (state === "start") {
            musictrack.play();
            musictrack.loop();
            state = "Dorm-setup"
        }

    }




}

























