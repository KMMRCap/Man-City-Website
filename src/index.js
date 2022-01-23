import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './assets/main.css'
import './assets/responsive.css'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { firebase } from './firebase/firebase'



firebase.auth().onAuthStateChanged((user) => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App user={user} />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
})


reportWebVitals();
