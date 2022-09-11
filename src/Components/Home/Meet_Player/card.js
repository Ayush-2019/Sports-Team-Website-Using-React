import React from "react";
import { Animate } from "react-move";
import { easePolyOut } from "d3-ease";

import Otamendi from '../../../Resources/images/players/Otamendi.png';
import Sterling from '../../../Resources/images/players/Raheem_Sterling.png';
import Kompany from '../../../Resources/images/players/Vincent_Kompany.png';
import Playercard from "../../Utils/Playercard";

let cards = [
    {
        bottom:90,
        left:300,
        player: Kompany,
        number:30,
        name:'Vincent',
        lastname:'Kompany'
    },
    {
        bottom:60,
        left:200,
        player: Sterling,
        number:35,
        name:'Raheem',
        lastname:'Sterling'
    },
    {
        bottom:0,
        left:0,
        player: Otamendi,
        number:47,
        name:'Player',
        lastname:'Otamendi'
    }
]

const HomeCards = (props) => {
        const showCards = () => (
            cards.map((card,index) =>(
                <Animate
                    key={index}
                    show = {props.show}
                    start = {{
                        left:0,
                        bottom:0
                    }}

                    enter = {{
                        left: [card.left],
                        bottom:[card.bottom],
                        timing:{delay:500,duration:500, ease:easePolyOut}
                    }}
                >
                    {(({left, bottom}) => (
                            <div
                                style={{
                                    position:'absolute',
                                    left, bottom
                                }}
                            >
                                    <Playercard
                                        bck = {card.player}
                                        number = {card.number}
                                        name = {card.name}
                                        lastname = {card.lastname}
                                    />
                            </div>
                    ))}
                </Animate>
            ))
        )
    

  return (
        <div>
            {showCards()}
        </div>
  );
}

export default HomeCards;
