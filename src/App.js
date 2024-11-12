import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Create from './components/crear/crearProducto';
import Dashboard from './components/dashboard/dashboard';
import Presupuesto from './components/presupuesto/presupuesto';
import DetailPage from './components/detail/detail';
import Home from "./components/home/home"
// import LandingPage from "./components/landing/landing"
import "./components/globalStyle/global.css" 



function App() {
    return (

                <Router>
                    <Dashboard>
                        <Routes>
                        {/* <Route path="/" element={<LandingPage />} /> */}
                            <Route path="/create" element={<Create />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/presupuesto" element={<Presupuesto />} />
                            <Route path="/detail/:id" element={<DetailPage />} />
                        </Routes>
                    </Dashboard>
                </Router>

    );
}

export default App;
