import React from "react";
import { Navigate } from "react-router-dom";
import {firebase} from '../firebase'

const AuthGuard = (Components) =>{
    class AuthHoc extends React.Component{

        auth_check = () => {
            const user = firebase.auth().currentUser;

            if(user){
                    return <Components {...this.props}/>
            }
            else{
                    return <Navigate to='/sign_in'/>
            }
        }

        render(){
            return this.auth_check()     
        }
    }

    return AuthHoc;
}

export default AuthGuard;