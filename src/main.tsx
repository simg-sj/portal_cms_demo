import React from 'react';
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/login.tsx"
import Hiparking from "./pages/hiparking.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path={'/'} element={<Login/>}/>
              <Route path={'/hiparking'} element={<Hiparking/>}/>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)
