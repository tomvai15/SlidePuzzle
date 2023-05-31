import { Tile } from "./Tile";
import { Position } from "./Position";
import { getRandomElement } from "utils/arrayHelpers";

const _emptyTileIndex = -1;

export class TileHandler {
  tiles: Tile[][];
  width: number;
  height: number;

  constructor(width: number, height: number) {
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
    this.tiles[height-1][width-1].index = _emptyTileIndex;
  }

  makeRandomMove(): void {
    const emptyTile = this.getTilePosition(_emptyTileIndex);
    const moveableTiles: Tile[] = [];

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.tiles[y][x].empty) {
          continue;
        }
        if (x === emptyTile.x || y === emptyTile.y) {
          moveableTiles.push(this.tiles[y][x]);
        }
      }
    }

    const tileToMove = getRandomElement(moveableTiles);
    this.moveMultiple(tileToMove.index);
  }
 
  moveMultiple(tileIndex: number) {
    const tilePosition = this.getTilePosition(tileIndex);
    const movementDirection = this.findMovementDirection(tilePosition);

    if (movementDirection === undefined) {
      return;
    }

    let currentPosition = {...tilePosition}
    let valueToSet = {...this.tiles[currentPosition.y][currentPosition.x]};

    while (!valueToSet.empty) {
      let nextPosition = {x: currentPosition.x - movementDirection.x, y: currentPosition.y - movementDirection.y};
      const toTile = this.tiles[nextPosition.y][nextPosition.x];

      const temp = {...toTile};

      toTile.index = valueToSet.index;
      toTile.empty = false;

      valueToSet = temp;
      currentPosition = {...nextPosition};
    }

    const initialTile = this.tiles[tilePosition.y][tilePosition.x];

    initialTile.index = _emptyTileIndex;
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