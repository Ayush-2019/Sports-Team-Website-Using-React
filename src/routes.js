import React from "react";
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Header from "./Components/Header_Footer/header";
import Footer from "./Components/Header_Footer/footer";
import Home from "./Components/Home";
import { SignIn } from "./Components/Sign_in";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
import Dashboard from "./Components/Admin/Dashboard";
import AdminPlayer from './Components/Admin/Players'; 
import Add_editPlayer from "./Components/Admin/Players/Add_edit_players";
import AdminMatches from "./Components/Admin/Matches";
import Add_edit_Matches from "./Components/Admin/Matches/Add_edit_matches";
import The_Matches from "./Components/The_matches";

import AuthGuard from "./Hoc/Auth";
import Team from "./Components/The_Team";

import NotFound from "./Components/Not_Found";

const Routesfile = ({user}) => {

  const Dash_comp = AuthGuard(Dashboard);

  const Player_comp = AuthGuard(AdminPlayer);
  const Add_edit_player = AuthGuard(Add_editPlayer);

  const Matches_Comp = AuthGuard(AdminMatches);
  const Add_edit_match = AuthGuard(Add_edit_Matches);

  const Login_comp = props => <SignIn {...props} user = {user}/>


  return (
    <BrowserRouter >
    <Header user={user}/>
    <Routes>

    
      <Route path="/admin_matches/edit_match/:match_id" element = {<Add_edit_match/>}/>
      <Route path="/admin_matches/add_match" element = {<Add_edit_match/>}/>
      <Route path="/admin_matches" element = {<Matches_Comp/>}/>

      <Route path="/admin_players/edit_player/:player_id" element = {<Add_edit_player/>}/>
      <Route path="/admin_players/add_player" element = {<Add_edit_player/>}/>
      <Route path="/admin_players" element = {<Player_comp/>}/>
      
      <Route path="/the_matches" element = {<The_Matches/>}/>
      
      <Route path="/dashboard" element = {<Dash_comp/>}/>

      <Route path="/the_team" element = {<Team/>}/>

      <Route path="/sign_in" element = {<Login_comp/>}/>

      <Route path="/" element = {<Home/>}/>

      <Route path="*" element = {<NotFound/>}/>

    </Routes>
    <ToastContainer/>
    <Footer/>
    
    </BrowserRouter>
  );
}

export default Routesfile;
