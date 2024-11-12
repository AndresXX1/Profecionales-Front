import React, { useState, useRef } from 'react';
import {
    AppBar,
    Toolbar,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Typography,
    Box,
    ThemeProvider,
    createTheme,
    CssBaseline,
    ListItemIcon,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    styled,
    Tooltip,
    IconButton,
  
} from '@mui/material';
import BuildIcon from '@mui/icons-material/Build'; 
import CalculateIcon from '@mui/icons-material/Calculate';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import InfoIcon from '@mui/icons-material/Info';
import FunctionsIcon from '@mui/icons-material/Functions';
import HelpIcon from '@mui/icons-material/Help';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import PerfilDeUsuario from '../perfilDeUsuario/perfilDeUsuario';
import Configuraciones from '../configuraciones/configuraciones';
import BarChartIcon from '@mui/icons-material/BarChart';
// import PieDePagina from './pieDePagina';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../localStore/authContext'; 

const theme = createTheme({
    palette: {
        primary: {
            main: '#FFCC00', // Amarillo brillante (como señalización de advertencia)
        },
        secondary: {
            main: '#FFEB3B', // Amarillo más suave, tipo dorado
        },
        text: {
            primary: '#0a3a3a', // Mantén el texto oscuro para contraste
        },
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
        h6: { fontWeight: 600 },
        button: { textTransform: 'none' },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundImage: 'url("https://imgs.search.brave.com/3p3nzsgmssJSt8HubJsF6qji46EqarMq0YeVE2EIn_A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2MyL2E1/L2YwL2MyYTVmMDI2/M2MzZjY4MTMyYmUw/OTcxNjFmOGY5NjQ2/LmpwZw")', // URL de la imagen de fondo
                    backgroundSize: 'cover', // Hace que la imagen cubra toda la pantalla
                    backgroundPosition: 'center', // Centra la imagen
                    backgroundAttachment: 'fixed', // Hace que la imagen de fondo no se mueva al hacer scroll
                },
            },
        },
    },
});

const menuItems = [
    { text: 'Inicio', path: '/home', icon: <HomeIcon /> },
    { text: 'Estadísticas', path: '/Estadisticas', icon: <BarChartIcon /> },
    { text: 'Crear Producto', path: '/create', icon: <BuildIcon /> },
    { text: 'Presupuesto', path: '/presupuesto', icon: <CalculateIcon /> },
    { text: 'Opiniones', path: '/reviews', icon: <EventIcon /> },
    { text: 'Usuarios', path: '/users', icon: <PersonIcon /> },
    { text: 'Sobre Nosotros', path: '/about', icon: <InfoIcon /> },
];

const ScrollDialogContent = styled(DialogContent)(({ isScrolling }) => ({
    overflowY: isScrolling ? 'auto' : 'hidden',
    overflowX: 'hidden',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
        width: '8px',
        background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#555',
        borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#777',
    },
}));

function Dashboard({ children }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [profileDialogOpen, setProfileDialogOpen] = useState(false);
    const [configDialogOpen, setConfigDialogOpen] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth(); 

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleUserMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleNavigation = (path) => {
        if (path === '/perfil') {
            setProfileDialogOpen(true);
        } else if (path === '/configuraciones') {
            setConfigDialogOpen(true);
        } else {
            navigate(path); // Usa useNavigate para cambiar de ruta
        }
        setDrawerOpen(false);
    };

    const handleLogout = () => {
        logout(); // Llama a la función de logout
        localStorage.clear(); // Limpia el localStorage
        navigate('/'); // Redirige al usuario a la página de inicio
    };

    const handleCloseProfileDialog = () => {
        setProfileDialogOpen(false);
        setIsScrolling(false);
    };

    const handleCloseConfigDialog = () => {
        setConfigDialogOpen(false);
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollHeight, clientHeight } = scrollRef.current;
            setIsScrolling(scrollHeight > clientHeight);
        }
    };

    const handleWheel = (e) => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop += e.deltaY;
            setIsScrolling(scrollRef.current.scrollHeight > scrollRef.current.clientHeight);
        }
    };

    const drawer = (
        <Box
            sx={{
                width: 240,
                height: '100%',
                backgroundImage: 'url(/banlog.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                paddingTop: '40px',
            }}
        >
            <List>
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        onClick={() => handleNavigation(item.path)}
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.85)',
                            borderRadius: '4px',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                            '&:hover': {
                                backgroundColor: 'rgba(10, 58, 58, 0.5)',
                            },
                            cursor: 'pointer',
                        }}
                    >
                        <ListItemIcon sx={{ color: '#0a3a3a' }}>{item.icon}</ListItemIcon>
                        <ListItemText
                            primary={item.text}
                            primaryTypographyProps={{
                                style: {
                                    color: '#0a3a3a',
                                    textShadow: '1px 1px 2px rgba(255, 255, 255, 0.7)'
                                }
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                component="main"
                sx={(theme) => ({
                    flexGrow: 1,
                    p: 3,
                    backgroundImage: location.pathname === '/' ? 'none !important' : 'url(/robotillo.jpeg)',
                    mt: location.pathname === '/' || location.pathname === "/register" ? 0 : 8,
                    backgroundSize: location.pathname === '/' ? 'auto !important' : 'cover',
                    backgroundPosition: location.pathname === '/' ? 'center !important' : 'center',
                    minHeight: '100vh',
                    backgroundAttachment: location.pathname === '/' ? 'scroll !important' : "fixed"
                })}
            >
                {location.pathname !== '/' && location.pathname !== '/register' && (
                    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                        <Toolbar sx={{ minHeight: 64 }}>
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                                <MenuIcon />
                            </IconButton>
                            <Link to="/home" style={{ textDecoration: 'none' }}>
                                <Box
                                    component="img"
                                    src="./NosotrosLogo.png"
                                    alt="Logo"
                                    sx={{
                                        height: '100%',
                                        width: 'auto',
                                        maxHeight: 90,
                                        mr: 2,
                                        '&:hover': {
                                            opacity: 0.8,
                                            transform: 'scale(1.1)',
                                        },
                                        cursor: 'pointer',
                                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                                        display: 'block',
                                    }}
                                />
                            </Link>

                            <Typography variant="h6" sx={{ flexGrow: 1, color: 'black' }}>
                                Nosotros
                            </Typography>
                            <Tooltip title="Conoce todas las funciones de Oleo-Bot">
                                <IconButton
                                    color="inherit"
                                    onClick={() => handleNavigation("/funciones")}
                                    sx={{
                                        '&:hover': {
                                            transform: 'scale(1.5)',
                                            transition: 'transform 0.3s ease',
                                        },
                                    }}
                                >
                                    <FunctionsIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Como usar Oleo-Bot">
                                <IconButton
                                    color="inherit"
                                    onClick={() => handleNavigation("/como-usar")}
                                    sx={{
                                        ml: 2,
                                        '&:hover': {
                                            transform: 'scale(1.5)',
                                            transition: 'transform 0.3s ease',
                                        },
                                    }}
                                >
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Perfil de Usuario">
                                <IconButton
                                    color="inherit"
                                    onClick={handleUserMenuClick}
                                    sx={{
                                        ml: 2,
                                        '&:hover': {
                                            transform: 'scale(1.5)',
                                            transition: 'transform 0.3s ease',
                                        },
                                    }}
                                >
                                    <AccountCircle />
                                </IconButton>
                            </Tooltip>
                        </Toolbar>
                    </AppBar>
                )}

                <Drawer
                    variant="temporary"
                    open={drawerOpen}
                    onClose={toggleDrawer}
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: 240,
                            boxSizing: 'border-box',
                            top: '64px',
                            height: 'calc(100% - 64px)',
                            backgroundColor: 'transparent',
                            backdropFilter: 'blur(5px)',
                        },
                    }}
                >
                    {drawer}
                </Drawer>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                >
                    <MenuItem onClick={() => { handleCloseMenu(); handleNavigation("/perfil"); }}>Perfil de Usuario</MenuItem>
                    <MenuItem onClick={() => { handleCloseMenu(); handleNavigation("/configuraciones"); }}>Configuraciones</MenuItem>
                    <MenuItem onClick={() => { handleCloseMenu(); handleLogout(); }}>Cerrar Sesión</MenuItem> 
                </Menu>

                <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                    {children}
                </Box>

                {/* Diálogo para el perfil de usuario */}
                <Dialog
                    open={profileDialogOpen}
                    onClose={handleCloseProfileDialog}
                    fullWidth
                    maxWidth="md"
                    sx={{
                        '& .MuiDialog-paper': {
                            backgroundColor: theme.palette.background.default,
                            boxShadow: 'none',
                            borderRadius: '8px',
                            overflow: 'hidden',
                        },
                    }}
                >
                    <DialogTitle sx={{ backgroundColor: theme.palette.primary.main, color: '#ffffff' }}>
                        Perfil de Usuario
                    </DialogTitle>
                    <ScrollDialogContent
                        ref={scrollRef}
                        onScroll={handleScroll}
                        onWheel={handleWheel}
                        isScrolling={isScrolling}
                        sx={{ bgcolor: theme.palette.background.default, p: 0 }}
                    >
                         <PerfilDeUsuario /> 
                    </ScrollDialogContent>
                    <DialogActions sx={{ backgroundColor: theme.palette.primary.main }}>
                        <Button onClick={handleCloseProfileDialog} sx={{ color: '#ffffff' }}>
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Diálogo para configuraciones */}
                <Dialog
                    open={configDialogOpen}
                    onClose={handleCloseConfigDialog}
                    fullWidth
                    maxWidth="md"
                    sx={{
                        '& .MuiDialog-paper': {
                            backgroundColor: theme.palette.background.default,
                            boxShadow: 'none',
                            borderRadius: '8px',
                            overflow: 'hidden',
                        },
                    }}
                >
                    <DialogTitle sx={{ backgroundColor: theme.palette.primary.main, color: '#ffffff' }}>
                        Configuraciones
                    </DialogTitle>
                    <DialogContent>
                         <Configuraciones /> 
                    </DialogContent>
                    <DialogActions sx={{ backgroundColor: theme.palette.primary.main }}>
                        <Button onClick={handleCloseConfigDialog} sx={{ color: '#ffffff' }}>
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
            {/* <PieDePagina /> */}
        </ThemeProvider>
    );
}

export default Dashboard;
