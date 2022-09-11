import React from "react";
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import { ListItem } from "@mui/material";
import { logoutHandler} from '../../Utils/tools';

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }
  
    return ComponentWithRouterProp;
  }

const AdminNav = (props) =>{
    
        const links = [
            {
                title:'Matches',
                linkTo:'/admin_matches'
            },
            {
                title:'Players',
                linkTo:'/admin_players'
            }
        ]

        const renderlinks = () => (
            links.map((link, index)=>(
                <Link to={link.linkTo} key = {index}>

                    <ListItem button className="admin_nav_link">
                        {link.title}
                    </ListItem>
                </Link>
            ))
        )


    return(
        <div>
            {renderlinks()}
            <ListItem button className="admin_nav_link" onClick={() => logoutHandler()}>
                Logout
            </ListItem>
        </div>
    )
}

export default withRouter(AdminNav);