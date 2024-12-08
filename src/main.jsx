import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CssBaseline } from "@mui/material";
import {HelmetProvider} from "react-helmet-async"
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import store from "./redux/store"
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
    <HelmetProvider>
    <CssBaseline />
    <BrowserRouter>
    <div onContextMenu={e=>e.preventDefault()}>
    <App />
    </div>
    </BrowserRouter>
    </HelmetProvider>
    </Provider>
  //  </React.StrictMode>
)
