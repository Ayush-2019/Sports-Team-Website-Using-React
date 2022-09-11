import React, { useEffect, useState } from "react";
import  Adminlayout from '../../../Hoc/Adminlayout';
import {match_collection} from '../../../firebase';
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

const AdminMatches = () => {

        const[lastLoaded, setLastLoaded] = useState(null);
        const[loading, setLoading] = useState(false);
        const[matches, setMatches] = useState(null);

        useEffect(() =>{
            if(!matches){
                setLoading(true);

                match_collection
                .limit(2)
                .get()
                .then(snapshot =>{
                        const lastLoaded = snapshot.docs[snapshot.docs.length-1];
                        const matches = snapshot.docs.map(doc =>({
                            id:doc.id,
                          ...doc.data()
                        }));
                        setLastLoaded(lastLoaded);
                        setMatches(matches);
                })
                .catch(err => showToastError(err))
                .finally(() =>{
                    setLoading(false);
                })
            }
        }, [matches]);

        const loadMoreMatches = () =>{
          if(lastLoaded){
              setLoading(true);
              match_collection
              .startAfter(lastLoaded)
              .limit(2)
              .get()
              .then(snapshot =>{
                  const lastLoaded = snapshot.docs[snapshot.docs.length-1];
                  const newMatches = snapshot.docs.map((doc) => (
                    {id:doc.id,
                    ...doc.data()}
                  ))
                  setLastLoaded(lastLoaded);

                  setMatches([...matches, ...newMatches])

              }).catch(err=> showToastError(err))
              .finally(() =>{
                setLoading(false)
              })
          }
          else{
            showToastError('Nothing to load')
          }
        }

  return (
    <Adminlayout title = "The matches">

        <div className="mb-5">
          <Button
            disableElevation
            variant="outlined"
            to = "/admin_matches/add_match"
            component = {Link}
          >
            Add Match
          </Button>
        </div>

        <Paper className="mb-5">
            <Table>
              <TableHead>
                <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Match</TableCell>
                <TableCell>Result</TableCell>
                <TableCell>Final</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {matches ?
                  
                  matches.map(match =>(
                    <TableRow key = {match.id}>

                      <TableCell>
                        <Link to={`/admin_matches/edit_match/${match.id}`}>
                            {match.date}
                        </Link>
                      </TableCell>

                      <TableCell>
                        <Link to={`/admin_matches/edit_match/${match.id}`}>
                        {match.away} <strong>-</strong> {match.local}
                        </Link>
                      </TableCell>

                      <TableCell>
                        <Link to={`/admin_matches/edit_match/${match.id}`}>
                            {match.resultAway} <strong>-</strong> {match.resultLocal}
                        </Link>
                      </TableCell>

                      <TableCell>
                        <Link to={`/admin_matches/edit_match/${match.id}`}>
                            {match.final === 'Yes' ?
                              <span className="matches_tag_red">Final</span>
                          
                                :
                                <span className="matches_tag_green">Not Played Yet</span>     
                          }
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
                onClick={() => loadMoreMatches()}
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

export default AdminMatches;
