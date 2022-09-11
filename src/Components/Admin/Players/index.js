import React, { useEffect, useState } from "react";
import  Adminlayout from '../../../Hoc/Adminlayout';
import {player_collection} from '../../../firebase';
import {showToastError, showToastSuccess} from '../../Utils/tools';
import { Button,
          Table,
          TableBody,
          TableCell,
          TableHead,
          TableRow,
          CircularProgress,
          Paper
        } from "@mui/material";
import { Link } from "react-router-dom";

const AdminPlayer = () => {

        const[lastLoaded, setLastLoaded] = useState(null);
        const[loading, setLoading] = useState(false);
        const[players, setPlayers] = useState(null);

        useEffect(() =>{
            if(!players){
                setLoading(true);

                player_collection
                .limit(2)
                .get()
                .then(snapshot =>{
                        const lastLoaded = snapshot.docs[snapshot.docs.length-1];
                        const players = snapshot.docs.map(doc =>({
                            id:doc.id,
                          ...doc.data()
                        }));
                        setLastLoaded(lastLoaded);
                        setPlayers(players);
                })
                .catch(err => {showToastError(err)})
                .finally(() =>{
                    setLoading(false);
                })
            }
        }, [players]);

        const loadMorePlayers = () =>{
          if(lastLoaded){
              setLoading(true);
              player_collection
              .startAfter(lastLoaded)
              .limit(2)
              .get()
              .then(snapshot =>{
                  const lastLoaded = snapshot.docs[snapshot.docs.length-1];
                  const newPlayers = snapshot.docs.map((doc) => (
                    {id:doc.id,
                    ...doc.data()}
                  ))
                  setLastLoaded(lastLoaded);

                  setPlayers([...players, ...newPlayers])
              }).catch(err=>{showToastError(err)})
              .finally(() =>{
                setLoading(false)
              })
          }
          else{
            showToastError('Nothing to load')
          }
        }

  return (
    <Adminlayout title = "The Players">

        <div className="mb-5">
          <Button
            disableElevation
            variant="outlined"
            to = "/admin_players/add_player"
            component = {Link}
          >
            Add Player
          </Button>
        </div>

        <Paper className="mb-5">
            <Table>
              <TableHead>
                <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Number</TableCell>
                <TableCell>Position</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {players ?
                  
                  players.map(player =>(
                    <TableRow key = {player.id}>

                      <TableCell>
                        <Link to={`/admin_players/edit_player/${player.id}`}>
                            {player.name}
                        </Link>
                      </TableCell>

                      <TableCell>
                        <Link to={`/admin_players/edit_player/${player.id}`}>
                            {player.lastname}
                        </Link>
                      </TableCell>

                      <TableCell>
                        <Link to={`/admin_players/edit_player/${player.id}`}>
                            {player.number}
                        </Link>
                      </TableCell>

                      <TableCell>
                        <Link to={`/admin_players/edit_player/${player.id}`}>
                            {player.position}
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                :
                null
              
                }
              </TableBody>

            </Table>
        </Paper>

              <Button 
                onClick={() => loadMorePlayers()}
                variant = "contained"
                color="primary"
                disabled = {loading}
        >
          Load More
        </Button>

        <div className="admin_progress">
          {loading ?
              <CircularProgress
                thickness={7}
                style = {{
                  color : '#98c5e9'
                }}

              />
            :
          null}
        </div>
    </Adminlayout>
  );
}

export default AdminPlayer;
