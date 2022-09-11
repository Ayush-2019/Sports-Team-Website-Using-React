import React from "react";
import {AppBar, Toolbar, Button} from '@mui/material';
import {Link} from 'react-router-dom';
import { borderBottom } from "@mui/system";
import { CityLogo } from "../Utils/tools";
import { logoutHandler} from "../Utils/tools";

const Header = ({user}) => {


  return (
    <AppBar
    
    position="fixed"
    style={{
        backgroundColor : '#98c5e9',
        boxShadow : 'none',
        padding : '10px 0',
        borderBottom : '2px Solid #00285e'
        
    }}
    >
        <Toolbar
        
        style={{display:'flex'}}
        >
            <div style={{flexGrow:1}}>
                <div className="header_logo">
                    <CityLogo
                    link = {true}
                    linkTo = {'/'}
                    width = '70px'
                    height = '70px'
                    />
            </div>
            </div>
            <Link to={'/the_team'}>
                <Button color="inherit">The Team</Button>
            </Link>

            <Link to={'/the_matches'}>
                <Button color="inherit">The Matches</Button>
            </Link>

            {user?
            <>
                <Link to={'/dashboard'}>
                <Button color="inherit">dashboard</Button>
            </Link> 

                <Button color="inherit" onClick={() =>{logoutHandler()}}>Logout</Button>
            </>
            : <Link to={'/sign_in'}>
            <Button color="inherit">Sign In</Button>
            </Link>
        
                }

        </Toolbar>

    </AppBar>
  );
}

export default Header;
