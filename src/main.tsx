import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  Routes,
  Route,
  Navigate,
  HashRouter,
} from "react-router-dom";
import { Competition } from './pages/Competition';
import { Home } from './pages/Home';
import './style/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path=":comp" element={<Competition />} />
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
)
