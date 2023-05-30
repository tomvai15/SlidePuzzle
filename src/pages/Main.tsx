import React, { useEffect, useMemo, useState } from 'react'
import { Box, Paper, Stack } from '@mui/material'
import { TileBox } from 'features/Tiles/components/TileBox';
import { Tile } from 'features/Tiles/types/Tile';
import { TileHandler } from 'features/Tiles/types/Tilehandler';

const size: number = 80;

export function Main ()  {
  const tileHandler = useMemo<TileHandler>(() => new TileHandler(3,3), []);
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
      </Paper>
    </Box>
  );
}