import React from "react";
import Featured from "./featured";
import Matcheshome from "./matches";
import MeetPlayer from "./Meet_Player";
import Promotion from "./Promotion";

const Home = () => {
  return (
    <div className="bck_blue">
      <Featured/>
      <Matcheshome/>
      <MeetPlayer/>
      <Promotion/>
    </div>
  );
}

export default Home;
