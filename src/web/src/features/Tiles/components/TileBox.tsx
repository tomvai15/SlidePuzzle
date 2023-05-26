import React from 'react'
import { Box, Button, Card, Paper, Typography } from '@mui/material'
import { Tile } from '../types/Tile';

type Props = {
  tile: Tile
  onClick: () => void
}

export function TileBox ({tile, onClick}: Props)  {
  return ( tile.empty ? 
    <Card sx={{width: '50px', height: '50px', backgroundColor: 'red'}}>
    </Card>
    :
    <Card onClick={onClick} sx={{width: '50px', height: '50px', backgroundColor: 'yellow'}}>
      <Typography>{tile.index}</Typography>
    </Card>
  );
}