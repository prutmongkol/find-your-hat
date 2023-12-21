const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const playerCharacter = '☺';

const controlScheme = ['w', 'a', 's', 'd']; // up, left, down, right
let gameState = true;

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
    const xBoundary = this._field[0].length;
    const yBoundary = this._field.length;
    
    return this._playerXPosition > -1 && this._playerXPosition < xBoundary && this._playerYPosition > -1 && this._playerYPosition < yBoundary;
  }

  isInHole() {
    const x = this._playerXPosition;
    const y = this._playerYPosition;
    const currentTile = this._field[y][x];
    console.log(currentTile);
  }

  movePlayer(validDirection) {
    let direction;
    do {
      direction = prompt('Which way? ').toLowerCase();
    } while( !validDirection.includes(direction) );
  
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


}

const startGame = () => {
  const myField = new Field([
    [playerCharacter, fieldCharacter, hole],
    [fieldCharacter, hole, fieldCharacter],
    [fieldCharacter, hat, fieldCharacter]
  ]);
  console.log(
    `- Input -\n` +
    `    ↑    \n` +
    `    W    \n` +
    `← A D S →\n` +
    `    ↓    \n` +
    `---------`
  );
  myField.print(); 
  myField.movePlayer(controlScheme);

}

startGame();
