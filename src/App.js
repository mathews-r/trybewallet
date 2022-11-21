import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Wallet from "./pages/Wallet";
import './styles/responsive.css'

function App() {
  return (
    <main>
      <Routes>
      <Route exact path="/trybewallet" element={<Login />} />
      <Route exact path="/carteira" element={<Wallet />} />
      </Routes>
    </main>
  );
}

export default App;
