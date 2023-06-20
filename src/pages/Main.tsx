import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, Paper, Slider, Stack } from '@mui/material'
import { TileBox } from 'features/Tiles/components/TileBox';
import { Tile } from 'features/Tiles/types/Tile';
import { TileHandler } from 'features/Tiles/types/Tilehandler';

const size: number = 80;

export function Main ()  {

  const [boardSize, setBoardSize] = useState<number>(3);
  const tileHandler = useMemo<TileHandler>(() => new TileHandler(boardSize, boardSize), [boardSize]);
  const [tiles, setTiles] = useState<Tile[][]>([[]]);

  useEffect(() => {
    console.log(JSON.stringify(tileHandler.tiles));
    setTiles(tileHandler.tiles);
  }, [tileHandler])

  function handleTileClick(index: number) {
    tileHandler.moveMultiple(index);
    setTiles([...tileHandler.tiles]);
  }

  function makeRandomMove() {
    tileHandler.makeRandomMove();
    setTiles([...tileHandler.tiles]);
  }

  function randomizeBoard() {
    for (let i = 0; i < 500; i++) {
      makeRandomMove();
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: '5%'
      }}
      >
      <Paper elevation={1} sx={{height: '100%'}}>
        <Stack spacing={1} direction={'column'} justifyContent={'center'}>
          <Stack justifyContent={'space-between'} direction={'row'} sx={{width: '100%'}} spacing={1}>
            <Slider
              sx={{width: '50%'}}
              aria-label="Board size"
              defaultValue={3}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={3}
              max={6}
              onChange={(e,value) => setBoardSize(value as number)}
            />
            <Button color='info' variant='contained' onClick={randomizeBoard}>Randomize board</Button>
          </Stack>
          <Box>
            <Stack direction={'column'}>
              {tiles.map((tileRow, rowIndex) => 
                <Stack key={rowIndex} direction={'row'}>
                  {tileRow.map((rowTile, tileIndex) => 
                    <TileBox width={size} height={size} onClick={() => handleTileClick(rowTile.index)} 
                      key={tileIndex + (rowIndex*3)} 
                      tile={rowTile}/>)}
                </Stack>
              )}
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}