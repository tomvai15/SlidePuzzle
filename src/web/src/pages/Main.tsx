import { Box, Paper, Stack, Typography } from '@mui/material'
import { TileBox } from 'features/Tiles/components/TileBox';
import { Tile } from 'features/Tiles/types/Tile';
import { TileHandler } from 'features/Tiles/types/Tilehandler';
import React, { useEffect, useState } from 'react'

export function Main ()  {
  const [tileHandler] = useState<TileHandler>(new TileHandler(3,3));
  const [tiles, setTiles] = useState<Tile[][]>([[]]);

  useEffect(() => {
    console.log(JSON.stringify(tileHandler.tiles));
    setTiles(tileHandler.tiles);
  }, [])

  function handleTileClick(index: number) {
    tileHandler.move(index);
    console.log(JSON.stringify(tileHandler.tiles));
    setTiles(tileHandler.tiles);
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
      <Paper elevation={1} sx={{width: '50%', height: '100%'}}>
        <Stack direction={'column'}>
          {tiles.map((tileRow, rowIndex) => 
            <Stack key={rowIndex} direction={'row'}>
              {tileRow.map((rowTile, tileIndex) => 
                <TileBox onClick={() => handleTileClick(rowTile.index)} 
                  key={tileIndex} 
                  tile={rowTile}/>)}
            </Stack>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}