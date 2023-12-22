// Please copy and paste your GitHub Repo on line 2 (optional)
// https://github.com/PrutMongkol/find-your-hat

// JavaScript Assessment Rubric: https://generation.instructure.com/courses/2342/assignments/143783

// Codecademy: https://www.codecademy.com/paths/front-end-engineer-career-path/tracks/fecp-javascript-syntax-part-iii/modules/fecp-challenge-project-find-your-hat/projects/find-your-hat

// Please break down your thinking process step-by-step (mandatory)
//
// Firstly, the project is done by following a step-by-step guide on codecademy 'find your hat' project page.
//
//  Step 1: Create a field object
//      1.  Create a myField object from the Field class, with pre-defined 2D array representing the field.
//          The argument is put into this._field property, as seen in the constructor method of the Field class.
//          The first dimension of the array represents the Y axis of the playing field.
//          The second dimension of the array (nested array) represents the X axis of the playing field.
//          -- CODE --
//          const myField = new Field([
//              [pathCharacter, fieldCharacter, hole],
//              [fieldCharacter, hole, fieldCharacter],
//              [fieldCharacter, hat, fieldCharacter]
//          ]);
//      2.  Test that the field object is created successfully with the debug tool and observe myField variable.
//
//  Step 2: Create print() method in Field class to print this._field property
//      -   To avoid using console.log multiple times, the X axes (nested array) of this._field are joined together with .join() array method, ending with '\n' line break character.
//      -   The resulting string is concatenated to the variable 'fieldString', which will be logged into the console later.
//      -   The .forEach() method is used to interate through the Y axes of this._field.
//      -   Log the variable 'fieldString'
//
//  Step 3.1: Create movePlayer() method in Field class
//      Properties representing player's position
//      -   The origin (i.e. (0, 0) coordinate) of the field is at the top-left of the field.
//      -   For simplicity, the game starts with the player at (0, 0) for now.
//      -   The following properties are added to facilitating moving the player through the field:
//          -   'this._playerXPosition' represents the player's position on the x axis. The starting value is equal to 0.
//          -   'this._playerYPosition' represents the player's position on the y axis. The starting value is equal to 0.
//
//      movePlayer() method, and why there are no separate moveRight, moveLeft, moveDown, and moveUp methods
//      -   To move left, this._playerXPosition is decremented. i.e. (0, 0) -> (-1, 0)
//      -   To move right, this._playerXPosition is incremented. i.e. (0, 0) -> (1, 0)
//      -   To move up, this_playerYPosition is decremented. i.e. (0, 0) -> (0, -1)
//      -   To move down, this_playerYPosition is incremented. i.e. (0, 0) -> (0, 1)
//      Due to the design, each of the four move methods will only have one line of code (e.g. return this._playerYPosition--;).
//      Therefore, each of these players action are consolidated into a single movePlayer() method
//
//      -   The prompt asking for user's input is in movePlayer() method
//      -   The method may take an array argument representing a control scheme. This allows the control scheme to be configurable through the UI, if desired.
//      
//      Testing movePlayer() method
//      -   Create a simple field object (the same as in Step 1)
//      -   Call object.movePlayer(), enter an input          
//      -   Call object.print()
//          move up 'w': No new pathCharacter printed since it is out of bound.
//          move left 'a': No new pathCharacter printed since it is out of bound.
//          move right 'd': A new pathCharacter should print to the right of the starting point.
//          move down 's': A new pathCharacter should print to the bottom of the starting point.
//
//  Step 3.2: Create gameLoop() method in the Field class
//      -   A new global constant variable 'playerCharacter' is created to represent the player avatar.
//          This is to help identify player's position in case of back-tracking to already taken path.
//          This global variable is used inside gameLoop() method
//
//      gameLoop() method:
//      -   The gameState variable:
//          - true: the game is still ongoing
//          - false: the game is over
//      -   gameLoop() method repetedly asks for user input until the game is over.
//      -   The game is over when:
//          - Player moves into the hole tile
//          - Player moves into the hat tile
//      -   The variable 'isWon' is set to true if player moves into the hat tile
//      -   Various helper methods are created to make the gameLoop() method look cleaner
//          - isOnHole() return true if player's position is on a hole.
//          - isOnHat() return true if player's position is on a hat.
//          - isInBoundaries() return true if player's position is in the field.
//          - revertPosion() is used exclusively when the player's position is out of bound. It moves player's position back to its previous posision.
//
//      INTERMISSION 1: Refactoring print() method
//      -   Currently, the print() method invoke clear() function to clear the screen.
//      -   This has a side-effect of clearing the warning message from gameLoop() when the player is out of bound.
//      -   Now, the print() method receive an option message string to be printed after printing the field.
//
//      INTERMISSION 2: Fix bug
//      -   There is an array reference error when moving out-of-bound in the Y axis.
//      -   Bug is fixed by moving the if statement that evaluates isInBoundaries to the top of the if-else chain.
//
//      Back to gameLoop() method:
//      -   If player is out-of-bound, player's position is revert back, and log a warning message.
//      -   If player lands on a hold or the hat, the game over with relevant message logged, and the program ends.
//      -   Otherwise, the loop continues. 
//
//  Step 4: Create generateField() method
//      -   The generateField() method accepts the following optional arguments:
//          - 'x' represents the field horizontal length. Default to an integer (e.g. 10).
//          - 'y' represents the field vertical length. Default to an integer (e.g. 10).
//          - 'holePercent' represents the number of holes in percentage. Default to a number between 0 and 1 (e.g. 0.2.)
//      -   The method works in the following steps:
//          1. Create a 2D array filled with the variable fieldCharacter.
//          2. Fill the array with holes.
//              - The number of holes equals to (x * y * holePercent)
//              - The resulting random position of a new hole should not be on an existing hole or the player starting position.
//          3. Fill the array with a hat.
//              - The resulting random position of the hat should not be on a hole or the player starting position.
//          4. Then, it sets the playerCharacter to (0, 0) coordinate.
//      -   The position of holes and the hat are now randomized.
//      -   The player starting position is still fixed at (0, 0). The method will be refactored to randomized the starting position at later steps.
//      -   The method returns a new Field object. It's behave like a factory function.
//
//  The steps that follows codecademy end here.
//
//  Step 5: Refactor generateField() to random player's position as well.
//      1.  Player position is now randomized in a similar fashion as the hat and holes.
//              - The position cannot be on a hole or the hat.
//      2.  Refactor Field constructor to receive player starting X and Y coordinates
//      3.  generateField() now returns a new Field object, supplying the field array, player's X position, and player's Y position.
//
//  The steps after this are bonus. They are not included in the rubric.
//
//  B1: Refactor startGame() to allow players to choose field size.
//      - For simplicity, player can choose from small, medium, and large field (map) size.
//  B2: Add a simple loop in startGame() so that player can choose to play again after game over.
//
//  B3: Add Hard Mode, where a hole is added every given turn.
//      - A new global variable 'holeTimer' is added in case we want to make it configurable by UI later on.
//      - Field constructor now also accept 'hardMode' Boolean argument. Default is false.
//      - Objects created from Field class now also has the following properties:
//          - this._hardMode (Boolean): if true, this field is a hard mode field.
//          - this._timeCounter (starts at 0): an incremental counter to be checked against global variable 'holeTimer'
//      - gameLoop() method:
//          - After moving, the game will now add a new hole after every given turn (specified by global variable 'holeTimer')
//          - The hole cannot be on the player, the existing holes, and the hat.
//          - this._timeCounter is reset to 0 after adding a hole.
//          - addHole() helper method is used to randomize the position of the new hole.
//          


const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

const playerCharacter = '☺';
const controlScheme = ['w', 'a', 's', 'd']; // up, left, down, right
const holeTimer = 4;

class Field {
    constructor(field, playerXPosition, playerYPosition, hardMode = false) {
        this._field = field; // 2D Array
        this._playerXPosition = playerXPosition;
        this._playerYPosition = playerYPosition;
       
        this._hardMode = hardMode;
        this._timeCounter = 0;
    }

    print(message = '') {
        clear();
        let fieldString = '';
        this._field.forEach( y => {
            fieldString += y.join('') + '\n';
        });
        console.log(fieldString);
        if (message !== '') {
            console.log(message);
        }
    }

    movePlayer(validDirection = ['w', 'a', 's', 'd']) {
        let direction;
        const [up, left, down, right] = validDirection;

        do {
            direction = prompt(`Which way? ↑${up} ←${left} ↓${down} →${right}: `).toLowerCase();
        } while( direction !== up && direction !== left && direction !== down && direction !== right );
    
        const x = this._playerXPosition;
        const y = this._playerYPosition
        this._field[y][x] = pathCharacter;

        switch (direction) {
        case up:
            this._playerYPosition--;
            break;
        case left:
            this._playerXPosition--;
            break;
        case down:
            this._playerYPosition++;
            break;
        case right:
            this._playerXPosition++;
            break;
        }
    }

    isInBoundaries() {
        const x = this._playerXPosition;
        const y = this._playerYPosition;
        const xBoundary = this._field[0].length;
        const yBoundary = this._field.length;
        
        return (x > -1) && (x < xBoundary) && (y > -1) && (y < yBoundary);
    }

    isOnHole() {
        const x = this._playerXPosition;
        const y = this._playerYPosition;
        const currentTile = this._field[y][x];
        
        return currentTile === hole;
    }

    isOnHat() {
        const x = this._playerXPosition;
        const y = this._playerYPosition;
        const currentTile = this._field[y][x];
        
        return currentTile === hat;
    }

    revertPosition() {
        const x = this._playerXPosition;
        const y = this._playerYPosition;
        const xBoundary = this._field[0].length;
        const yBoundary = this._field.length;

        if (x === -1) {
            this._playerXPosition++;
        } else if (x === xBoundary) {
            this._playerXPosition--;
        } else if (y === -1) {
            this._playerYPosition++;
        } else if (y === yBoundary) {
            this._playerYPosition--;
        }
    }

    addHole () {
        const x = this._field[0].length;
        const y = this._field.length;
        let randomX;
        let randomY;
        do {
            randomX = Math.floor(Math.random() * x);
            randomY = Math.floor(Math.random() * y);
        } while (this._field[randomY][randomX] === hole || this._field[randomY][randomX] === hat || this._field[randomY][randomX] === playerCharacter);
        this._field[randomY][randomX] = hole;
    }

    gameLoop() {
        let gameState = true;
        let isWon;
        let message = '';

        do {
            this.print(message);
            this.movePlayer(controlScheme);
            message = '';        

            if (!this.isInBoundaries()) {
                message = "You can't move out-of-bound!";
                this.revertPosition();
                const x = this._playerXPosition;
                const y = this._playerYPosition
                this._field[y][x] = playerCharacter;
            } else if (this.isOnHole()) {
                gameState = false;
                isWon = false;
            } else if (this.isOnHat()) {
                gameState = false;
                isWon = true;
            } else {
                const x = this._playerXPosition;
                const y = this._playerYPosition
                this._field[y][x] = playerCharacter;
            }

            this._timeCounter++;
            if (this._hardMode === true && this._timeCounter === holeTimer) {
                this._timeCounter = 0;
                this.addHole();
            }

        } while(gameState);

        if (isWon) {
            console.log("You've found your hat!\n");
        } else {
            console.log("Oh no! You've fallen into a hole!\n");
        }
    }

    static generateField(x = 10, y = 10, holePercent = 0.25, hardMode = false) {
        const fieldArray = [];
        for (let i = 0; i < y; i++) {
            const xAxis = [];
            for (let i = x; i > 0; i--) {
                xAxis.push(fieldCharacter);
            }
            fieldArray.push(xAxis);
        }
        
        for (let holeAmount = Math.floor(x * y * holePercent); holeAmount > 0; holeAmount--) {
            let randomX;
            let randomY;
            do {
                randomX = Math.floor(Math.random() * x);
                randomY = Math.floor(Math.random() * y);
            } while (fieldArray[randomY][randomX] === hole); // '|| (randomX === 0 && randomY === 0)' is removed after refactoring to randomize player position.
            fieldArray[randomY][randomX] = hole;
        }
        
        let randomX;
        let randomY;
        do {
            randomX = Math.floor(Math.random() * x);
            randomY = Math.floor(Math.random() * y);
        } while (fieldArray[randomY][randomX] === hole); // '|| (randomX === 0 && randomY === 0)' is removed after refactoring to randomize player position.
        fieldArray[randomY][randomX] = hat;

        do {
            randomX = Math.floor(Math.random() * x);
            randomY = Math.floor(Math.random() * y);
        } while (fieldArray[randomY][randomX] === hole || fieldArray[randomY][randomX] === hat)
        fieldArray[randomY][randomX] = playerCharacter;

        return new Field(fieldArray, randomX, randomY, hardMode);
    }
}

const startGame = () => {
    let playAgain;
    
    do {
        clear();
        console.log(
            `===============================\n` +
            `         FIND YOUR HAT         \n` +
            `===============================\n` +
            `\n` +
            ` ${playerCharacter} : This is you!\n` +
            ` ${hat} : This is your hat. Get it!\n` +
            ` ${hole} : This is a hole. Avoid it!\n`
        );
        
        const fieldSize = prompt(`Choose map size - S, (M), L: `).toLowerCase();
        const hardMode = prompt(`Do you want to play on Hard Mode? Y/(N) `).toLowerCase() === 'y';
        let myField;
    
        switch (fieldSize) {
            case 's': 
                myField = Field.generateField(5, 5, 0.2, hardMode);
                break;
            case 'l':
                myField = Field.generateField(15, 15, 0.3, hardMode);
                break;
            default:
            case 'm':
                myField = Field.generateField(10, 10, 0.25, hardMode);
                break;
        }
    
        myField.gameLoop();
    
        playAgain = prompt('Do you want to play again? Y/(N): ').toLowerCase();
    } while (playAgain === 'y');
}

startGame();
