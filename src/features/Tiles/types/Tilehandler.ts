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