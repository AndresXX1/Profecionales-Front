import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Create from './components/crear/crearProducto';
import Dashboard from './components/dashboard/dashboard';
import Presupuesto from './components/presupuesto/presupuesto';
import DetailPage from './components/detail/detail';
import Home from "./components/home/home"
import LandingPage from "./components/landing/landing"
import "./components/globalStyle/global.css" 
import { UserProvider } from './components/context/UserContext';
import { AuthProvider } from './components/localStore/authContext';
import PerfilDeUsuario from "./components/perfilDeUsuario/perfilDeUsuario"
import Usuarios from './components/Tablas/usuarios';

function App() {
    return (
        <AuthProvider>
            <UserProvider>
                <Router>
                    <Dashboard>
                        <Routes>
                         <Route path="/" element={<LandingPage />} /> 
                            <Route path="/create" element={<Create />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/presupuesto" element={<Presupuesto />} />
                            <Route path="/detail/:id" element={<DetailPage />} />
                            <Route path="/perfil" element={<PerfilDeUsuario />} />
                            <Route path="/users" element={<Usuarios />} />
                        </Routes>
                    </Dashboard>
                </Router>
                </UserProvider>
                </AuthProvider>

    );
}

export default App;
