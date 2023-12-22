const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const playerCharacter = '☺';

const controlScheme = ['w', 'a', 's', 'd']; // up, left, down, right

class Field {
    constructor(field) {
        this._field = field; // 2D Array
        this._playerXPosition = 0;
        this._playerYPosition = 0;
    }

    print() {
        let fieldString = '';
        this._field.forEach( y => {
        fieldString += y.join('') + '\n';
        });
        console.log(fieldString);
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

    movePlayer(validDirection) {
        let direction;
        do {
        direction = prompt('Which way? ').toLowerCase();
        } while( !validDirection.includes(direction) );
    
        const x = this._playerXPosition;
        const y = this._playerYPosition
        this._field[y][x] = pathCharacter;

        switch (direction) {
        case validDirection[0]:
            this._playerYPosition--;
            break;
        case validDirection[1]:
            this._playerXPosition--;
            break;
        case validDirection[2]:
            this._playerYPosition++;
            break;
        case validDirection[3]:
            this._playerXPosition++;
            break;
        }
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

    gameLoop() {
        let gameState = true;
        let isWon;

        do {
            this.print();
            this.movePlayer(controlScheme);

            if (this.isOnHole()) {
                gameState = false;
                isWon = false;
            } else if (this.isOnHat()) {
                gameState = false;
                isWon = true;
            } else if (!this.isInBoundaries()) {
                console.log("You can't move out-of-bound!");
                this.revertPosition();
                const x = this._playerXPosition;
                const y = this._playerYPosition
                this._field[y][x] = playerCharacter;
            } else {
                const x = this._playerXPosition;
                const y = this._playerYPosition
                this._field[y][x] = playerCharacter;
            }
        } while(gameState);

        if (isWon) {
            console.log("You've found your hat!");
        } else {
            console.log("Oh no! You've fallen into a hole!");
        }
    }

    static generateField(x = 10, y = 10, holePercent = 0.2) {
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
            } while (fieldArray[randomY][randomX] === hole || (randomX === 0 && randomY === 0));
            fieldArray[randomY][randomX] = hole;
        }
        
        let randomX;
        let randomY;
        do {
            randomX = Math.floor(Math.random() * x);
            randomY = Math.floor(Math.random() * y);
        } while (fieldArray[randomY][randomX] === hole || (randomX === 0 || randomY === 0));
        fieldArray[randomX][randomY] = hat;

        fieldArray[0][0] = playerCharacter;

        return new Field(fieldArray);
    }
}

const startGame = () => {
    const myField = Field.generateField();
    console.log(
        `- Input -\n` +
        `    ↑    \n` +
        `    W    \n` +
        `← A D S →\n` +
        `    ↓    \n` +
        `---------`
    );

    myField.gameLoop();
}

startGame();
