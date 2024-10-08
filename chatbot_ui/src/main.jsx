import React from 'react'
import { StrictMode } from "react";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import { createStore } from 'redux'
import rootReducers from './redux_state/reducers.js'
import { BrowserRouter as Router } from 'react-router-dom';

const store = createStore(rootReducers)

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
    <Provider store={store}>
    <App />
    </Provider>
    </Router>
  </StrictMode>,
)
