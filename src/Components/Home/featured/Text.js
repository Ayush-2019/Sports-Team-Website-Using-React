import React from "react";
import {Animate} from 'react-move';
import {easePolyOut} from 'd3-ease';
import FeaturedPlayer from '../../../Resources/images/featured_player.png'

const Text = () => {

    const animatenum = () =>(
        <Animate    
            show = {true}

            start = {{
                opacity:0,
                rotate:0,
            }}

            enter = {{
                opacity:[1],
                rotate:[360],
                timing:{
                    duration:1000,
                    ease:easePolyOut
                }
            }}
        
        >

            {({opacity, rotate}) =>(
                <div className="featured_number"
                
                style={{
                    opacity,
                    transform:`translate(260px,170px) rotateY(${rotate}deg)`
                }}
                >
                    5
                </div>
            )}
        </Animate>
    )

    const animateText1 = () =>(
        <Animate    
            show = {true}

            start = {{
                opacity:0,
                x:503,
                y:450
            }}

            enter = {{
                opacity:[1],
                x:[273],
                y:[450],
                timing:{
                    duration:500,
                    ease:easePolyOut
                }
            }}
        
        >

            {({opacity, x, y}) =>(
                <div className="featured_first"
                
                style={{
                    opacity,
                    transform:`translate(${x}px,${y}px)`
                }}
                >
                    League
                </div>
            )}
        </Animate>
    )

    const animateText2 = () =>(
        <Animate    
            show = {true}

            start = {{
                opacity:0,
                x:503,
                y:586
            }}

            enter = {{
                opacity:[1],
                x:[273],
                y:[586],
                timing:{
                    delay:300,
                    duration:500,
                    ease:easePolyOut
                }
            }}
        
        >

            {({opacity, x, y}) =>(
                <div className="featured_first"
                
                style={{
                    opacity,
                    transform:`translate(${x}px,${y}px)`
                }}
                >
                    Championship
                </div>
            )}
        </Animate>
    )

    const animatePlayer = () =>(
        <Animate    
            show = {true}

            start = {{
                opacity:0,
            }}

            enter = {{
                opacity:[1],
                timing:{
                    delay:800,
                    duration:500,
                    ease:easePolyOut
                }
            }}
        
        >

            {({opacity}) =>(
                <div className="featured_player"
                
                style={{
                    opacity,
                    transform:`translate(560px,210px)`,
                    background:`url(${FeaturedPlayer}) no-repeat`
                }}
                >
                </div>
            )}
        </Animate>
    )

  return (
    <div className="featured_text">
        {animatePlayer()}
        {animatenum()}
        {animateText1()}
        {animateText2()}
    </div>
  );
}

export default Text;
