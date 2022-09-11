import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

//import {cityDb} from './temp/m-city-export';

const firebaseConfig = {
    apiKey: "AIzaSyDOD5PIsQ98LqFZj5UcmCb0bOTvRAfWUtU",
    authDomain: "mcity-93ec2.firebaseapp.com",
    projectId: "mcity-93ec2",
    storageBucket: "mcity-93ec2.appspot.com",
    messagingSenderId: "595249555929",
    appId: "1:595249555929:web:c449424d7464e8e06811c8",
    measurementId: "G-6B5TLGW946"
  };

  // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 const db = firebase.firestore();
 const match_collection = db.collection('matches');
 const player_collection = db.collection('players');
 const positions_collection = db.collection('positions');
 const promotions_collection = db.collection('promotions');
 const teams_collection = db.collection('teams');

 /*cityDb.matches.forEach(item=>{
      match_collection.add(item)
 })*/

 /*cityDb.players.forEach(item=>{
      player_collection.add(item)
 })*/

 /*cityDb.positions.forEach(item=>{
      positions_collection.add(item)
 })*/

 /*cityDb.promotions.forEach(item=>{
  promotions_collection.add(item)
})*/

/*cityDb.teams.forEach(item=>{
  teams_collection.add(item)
})*/

  export {firebase, match_collection, player_collection, positions_collection, promotions_collection, teams_collection}
  