import React from 'react'
import { Box, Button, Card, Paper, Typography } from '@mui/material'
import { Tile } from '../types/Tile';

type Props = {
  tile: Tile
  height: number,
  width: number,
  onClick: () => void
}

export function TileBox ({tile, height, width, onClick}: Props)  {
  return ( tile.empty ? 
    <Button disabled sx={{width: width, height: height, backgroundColor: 'none'}}>
    </Button>
    :
    <Button variant='contained' onClick={onClick} sx={{"& .MuiButton-startIcon": { margin: 0 }, width: width, height: height}}>
      <Typography>{tile.index}</Typography>
    </Button>
  );
}