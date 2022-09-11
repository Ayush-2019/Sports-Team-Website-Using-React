import React, { useEffect, useState } from "react";
import Playercard from '../Utils/Playercard';
import { Slide } from "react-awesome-reveal";
import {firebase, player_collection} from '../../firebase';
import {showToastError,showToastSuccess} from '../Utils/tools';
import {Promise} from 'core-js'
import { CircularProgress } from "@mui/material";

const Team = () =>{
    const[loading, setLoading] = useState(true);
    const[players, setPlayers] = useState(null);

    useEffect(() =>{
        if(!players){
            player_collection.get()
            .then((snapshot)=>{
                const players = snapshot.docs.map(doc =>(
                    {
                        id:doc.id,
                        ...doc.data()
                    }
                ))

                

                let promises = [];

                players.forEach((player, index) =>{
                    promises.push(
                        new Promise((resolve, reject) =>{
                            firebase.storage().ref('player')
                            .child(player.image).getDownloadURL()
                            .then(url =>{
                                 players[index].url = url;
                                
                                resolve()
                            }).catch(err => {
                                reject()
                            })
                        })
                    )
                });
                Promise.all(promises).then(() =>{
                    setPlayers(players);
                })

            }).catch(err => showToastError(err))
            .finally(() => {setLoading(false)})
        }
    }, [players])

    const showPlayerByCategory = (position) => (

        players ?

            players.map((player, index) =>{
                return player.position === position ?
                    <Slide left key={player.id} triggerOnce>
                            <div className="item">
                                <Playercard
                                    bck = {player.url}
                                    number = {player.number}
                                    name = {player.name}
                                    lastname = {player.lastname}
                                
                                />
                            </div>
                    </Slide>
                :
                null
})

            :
            null
    )

    return(
        <div className="the_team_container">
            {loading ?
                <div className="progress">
                    <CircularProgress/>
                    </div>
                :
                    <div>
                        <div className="team_category_wrapper">
                            <div className="title">Keepers</div>
                            <div className="team_cards">
                                {showPlayerByCategory('Keeper')}
                            </div>
                        </div>

                        <div className="team_category_wrapper">
                            <div className="title">Defence</div>
                            <div className="team_cards">
                                {showPlayerByCategory('Defence')}
                            </div>
                        </div>

                        <div className="team_category_wrapper">
                            <div className="title">Midfield</div>
                            <div className="team_cards">
                                {showPlayerByCategory('Midfield')}
                            </div>
                        </div>

                        <div className="team_category_wrapper">
                            <div className="title">Striker</div>
                            <div className="team_cards">
                                {showPlayerByCategory('Striker')}
                            </div>
                        </div>
                    </div>
                }
        </div>
    )
}

export default Team;