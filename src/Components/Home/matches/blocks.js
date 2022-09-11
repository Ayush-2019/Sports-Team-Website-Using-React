import React, {useState, useEffect} from "react";
import { match_collection } from "../../../firebase";
import {Slide} from "react-awesome-reveal";
import Match_block from "../../Utils/Match_block";

const Block = () =>{

    const [matches, setMatches] = useState([]);

    useEffect(() =>{
        if(!matches.length>0){
            match_collection.get().then(snapshot =>{
                const matcheslist = snapshot.docs.map(doc =>({
                    id:doc.id,
                    ...doc.data()
                }));
                setMatches(matcheslist);
            }).catch(err=>{
                alert(err)
            })
        }
    }, [matches])

    const showMatches = (matches) =>(
                 matches ?
                matches.map((match) => (
                    <Slide bottom key={match.id} className = "item" triggerOnce>
                        <div className="wrapper">
                            <Match_block match = {match}/>
                        </div>
                    </Slide>
                ))
                :
                null
                
            
    )

    

    return(

        <div className="home_matches">
            {showMatches(matches)}
        </div>
    )
}

export default Block;