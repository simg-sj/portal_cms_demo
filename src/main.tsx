import React from 'react';
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/login.tsx"
import Hiparking from "./pages/hiparking.tsx"
import HiparkingList from "./pages/hiparking-list.tsx"
import HiparkingMypage from "./pages/hiparking-mypage.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path={'/'} element={<Login/>}/>
              <Route path={'hiparking/dashboard'} element={<Hiparking/>}/>
              <Route path={'hiparking/list'} element={<HiparkingList/>}/>
              <Route path={'hiparking/mypage'} element={<HiparkingMypage/>}/>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)
