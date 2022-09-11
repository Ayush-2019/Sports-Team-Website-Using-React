import React from 'react';
import ReactDOM from 'react-dom/client';
import Routesfile from './routes';
import './Resources/css/app.css';
import {firebase} from './firebase';

const App = (props) =>{

  return(
    <Routesfile {...props}/>
  )
}





  const rootElement = document.getElementById('root');
  const root = ReactDOM.createRoot(rootElement);

// 👇️ if you use TypeScript, add non-null (!) assertion operator
// const root = createRoot(rootElement!);

firebase.auth().onAuthStateChanged((user) =>{
  root.render(
      <App user = {user}/>
  )

})


