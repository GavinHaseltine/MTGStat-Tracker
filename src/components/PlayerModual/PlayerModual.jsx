import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 600,
  overflow: 'scroll',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function PlayerModal() {
  const [newPlayerName, setNewPlayerName] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const players = useSelector((store) => store.playerReducer);

  

  function handleAll(){
    handleOpen()
    handleGet()
  }

  function handleGet(){
    console.log("in get");

    dispatch({
        type: "FETCH_PLAYERS"
      });
  }

  function handleAdd(event){
    event.preventDefault();

    dispatch({
        type: "ADD_PLAYER",
        payload: { player_name: newPlayerName}
      });

      setNewPlayerName("")
  }


  return (
    <div>
      <Button onClick={handleAll}>Players</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Player List
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            

            {players.map((player) => {
                let winrate = ( player.games_won / player.games_played * 100).toFixed(1);
                return (
                    <div key={player.id}>
                     <li>{player.player_name}</li>
                    <ul>Win Rate: {winrate}%</ul> 
                    <button onClick={() => dispatch({ type: "DELETE_PLAYER", payload: player.id })}>Remove Player</button> 
                    <div> <div><hr id="rounded" /></div> </div>
                  </div>
                )
            })}
           

           <form onSubmit={handleAdd}>
                <input 
                type="text" 
                placeholder='Enter Player Name'
                value={newPlayerName}
                onChange={(event) => setNewPlayerName(event.target.value)}
                />
                <button type="submit">Add Player</button>
            </form>
    
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}