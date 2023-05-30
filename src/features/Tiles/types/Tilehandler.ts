import { Tile } from "./Tile";
import { Position } from "./Position";

export class TileHandler {
  tiles: Tile[][];
  width: number;
  height: number;

  constructor(width: number, height: number) {
    console.log('Bybys');
    this.tiles = [];
    this.width = width;
    this.height = height;

    for (let y = 0; y < height; y++) {
      const newRow: Tile[] = [];
      for (let x = 0; x < width; x++) {
        const tile: Tile = { index: x + (y * width), empty: false };
        newRow.push(tile);
      }
      this.tiles.push(newRow);
    }
    this.tiles[height-1][width-1].empty = true;
  }
 
  move(tileIndex: number) {

    console.log(tileIndex + ' tile index');
    const tilePosition = this.getTilePosition(tileIndex);
    console.log(JSON.stringify(tilePosition) + ' tilePosition');
    const postitionToMoveTo = this.canMove(tilePosition);
    console.log(JSON.stringify(postitionToMoveTo) + ' postitionToMoveTo');

    if (postitionToMoveTo === undefined) {
      console.log('??');
      return;
    }


    console.log('-----');
    console.log(JSON.stringify(this.tiles));

    const fromTile = this.tiles[tilePosition.y][tilePosition.x];
    const toTile = this.tiles[postitionToMoveTo.y][postitionToMoveTo.x];

    toTile.index = fromTile.index
    toTile.empty = false;

    fromTile.index = 69;
    fromTile.empty = true;

    console.log(JSON.stringify(this.tiles));
    console.log('-----');
    return;
  }

  moveMultiple(tileIndex: number) {
    const tilePosition = this.getTilePosition(tileIndex);
    const movementDirection = this.findMovementDirection(tilePosition);


    console.log('???');
    if (movementDirection === undefined) {
      return;
    }
    console.log( JSON.stringify(movementDirection) +  ' ??? 2');
    let currentPosition = {...tilePosition}
    let valueToSet = {...this.tiles[currentPosition.y][currentPosition.x]};

    while (!valueToSet.empty) {
      console.log('x');
      console.log(this.tiles[currentPosition.y][currentPosition.x]);


      let nextPosition = {x: currentPosition.x - movementDirection.x, y: currentPosition.y - movementDirection.y};
      console.log(nextPosition);
      const toTile = this.tiles[nextPosition.y][nextPosition.x];

      const temp = {...toTile};

      toTile.index = valueToSet.index;
      toTile.empty = false;

      valueToSet = temp;
      currentPosition = {...nextPosition};
    }

    const initialTile = this.tiles[tilePosition.y][tilePosition.x];

    initialTile.index = 69;
    initialTile.empty = true;

    return;
  }

  getTilePosition(tileIndex: number): Position {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        console.log(this.tiles[y][x].index + ' ??');
        if (this.tiles[y][x].index === tileIndex) {
          return { x: x, y: y};
        }
      }
    }
    throw new Error(`Index not found ${tileIndex}`)
  }

  findMovementDirection(position: Position): Position|undefined {
    const deltas: Position[] = [{x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}];

    const [emptyDelta] =  deltas.filter( (delta) => this.isValidDirection(delta, position));

    return emptyDelta;
  }

  isValidDirection(delta: Position, position: Position): boolean {
    let currentPosition: Position = {...position};

    while (true) {
      currentPosition.x -= delta.x;
      currentPosition.y -= delta.y;
      if (!this.isValidPosition(currentPosition)) {
        return false;
      }
      if (this.tiles[currentPosition.y][currentPosition.x].empty) {
        return true;
      }
    }
  }

  canMove(position: Position): Position|undefined {
    const deltas: Position[] = [{x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}];

    const surroundingPositions: Position[] =  deltas.map( (delta): Position => { 
      return {x: position.x + delta.x, y: position.y + delta.y};
    });

    const validPositions = surroundingPositions.filter(p => this.isValidPosition(p));

    const [emptyTile] = validPositions.filter(p => this.tiles[p.y][p.x].empty);

    return emptyTile;
  }

  isValidPosition(position: Position): boolean {
    if (position.x < 0 || position.x >= this.width) {
      return false;
    }
    if (position.y < 0 || position.y >= this.height) {
      return false;
    }
    return true;
  }
}