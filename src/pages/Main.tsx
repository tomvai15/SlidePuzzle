import React, { useEffect, useMemo, useState } from 'react'
import { Box, Paper, Slider, Stack } from '@mui/material'
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
        <Stack direction={'column'} justifyContent={'center'}>
          <Box sx={{width: '200px'}}>
            <Slider
              aria-label="Board size"
              defaultValue={3}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={3}
              max={6}
              onChange={(e,value) => setBoardSize(value as number)}
            />
          </Box>
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