import React, {useState, useEffect, useReducer} from "react";

import {showToastError, showToastSuccess} from '../Utils/tools';
import { CircularProgress } from "@mui/material";
import { match_collection } from "../../firebase";

import LeagueTable from "./table";
import MatchesList from "./matchList";
import MatchFilter from "./matchFilter";

const The_Matches = () => {

    const[matches, setMatches] = useState(null);

    // const initialValues = 

    // const reducer = 

    const[state, dispatch] = useReducer((prevState, nextState) => {
        return {...prevState, ...nextState};
    }, {
        filterMatches:null,
        playedFilter:'All',
        resultFilter:'All'
    });

    

    

    useEffect(() =>{
        if(!matches){
                match_collection.get()
                .then((snapshot) =>{
                        const matches = snapshot.docs.map((doc) => (
                            {
                                id:doc.id,
                                ...doc.data()
                            }
                        ));
                        setMatches(matches);
                        dispatch({...state, filterMatches:matches})
                })
                .catch(err => {showToastError(err)})
        }
    },[matches, state]);

    
    
    const showResult = (result) => {
        const list = matches.filter((match) => {
                return match.result === result;
        });

        dispatch({
            ...state,
            filterMatches:result === 'All' ? matches : list,
            playedFilter : 'All',
            resultFilter: result
        })
};

const showPlayed = (played) => {
    const list = matches.filter((match) => {
            return match.final === played;
    });

    dispatch({
        ...state,
        filterMatches:played === 'All' ? matches : list,
        playedFilter : played,
        resultFilter: 'All'
    })
};

  return (
    <div>
        {matches ?  
            <div className="the_matches_container">
                <div className="the_matches_wrapper">

                    <div className="left" style={{borderRight : '1px solid #98c5e9'}}>
                        <MatchFilter 
                            state = {state}
                            showPlayed = {showPlayed}
                            showResult = {showResult}
                        />
                        <MatchesList
                            matches = {state.filterMatches}
                        />
                    </div>

                    <div className="right">
                        <LeagueTable/>
                    </div>

                </div>
            </div>
        :
            <div className="progress">
                <CircularProgress/>
            </div>
        }
    </div>
  );
}

export default The_Matches;
