import React, {useState, useEffect} from "react";

import {showToastError, showToastSuccess} from '../Utils/tools';
import { Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    CircularProgress,
    Paper } from "@mui/material";
import { positions_collection } from "../../firebase";

const LeagueTable = () => {

    const[position, setPosition] = useState(null);

    useEffect(() =>{
        if(!position){
                positions_collection.get()
                .then((snapshot) =>{
                        const positions = snapshot.docs.map((doc) => (
                            {
                                id:doc.id,
                                ...doc.data()
                            }
                        ));
                        setPosition(positions);
                })
                .catch(err => {showToastError(err)})
        }
    },[position])

    const showPositions = () => (
        position ? 

        position.map((pos, i) => (
            <TableRow key = {i}>
                <TableCell style={{fontWeight:'bold', color:'blueviolet'}}>{i+1}</TableCell>
                <TableCell>{pos.team}</TableCell>
                <TableCell>{pos.w}</TableCell>
                <TableCell>{pos.d}</TableCell>
                <TableCell>{pos.l}</TableCell>
                <TableCell>{pos.pts}</TableCell>
            </TableRow>
        ))

        : null
        )

  return (
    <div className="league_table_wrapper">
        <div className="title">
            League Table
        </div>

        <div className="">
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>Pos</TableCell>
                    <TableCell>Team</TableCell>
                    <TableCell>W</TableCell>
                    <TableCell>L</TableCell>
                    <TableCell>D</TableCell>
                    <TableCell>pts</TableCell>
                </TableRow>
                </TableHead>

                <TableBody>
                    {showPositions()}
                </TableBody>
            </Table>
        </div>
    </div>
  );
}

export default LeagueTable;
