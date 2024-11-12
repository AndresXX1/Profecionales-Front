import React, { useEffect, useRef } from 'react';
import { 
  Button, 
  Container, 
  Typography, 
  Grid, 
  Box,
  ThemeProvider, 
  createTheme,
  Paper,
  LinearProgress,
} from "@mui/material";
import { 
  
  Build, 
  Assignment, 
  BarChart, 
  Star, 
  People, 
  Settings 
} from "@mui/icons-material";
import { Card, CardHeader, CardContent } from "../ui/card";
import HeroSection from "./head";
import { useMediaQuery } from '@mui/material';

// Tema con texto negro y colores claros
const theme = createTheme({
  palette: {
    mode: 'light',  // Usamos el modo claro
    primary: {
      main: '#FFD700', // Amarillo dorado
    },
    secondary: {
      main: '#2196F3', // Azul claro
    },
    background: {
      default: '#F5F5F5', // Fondo blanco claro
      paper: '#FFFFFF',  // Blanco para el papel
    },
    text: {
      primary: '#000000', // Texto negro
      secondary: '#000000', // Texto secundario negro también
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Usamos una tipografía más neutral
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Bordes redondeados
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '200%',
            height: '100%',
            background: 'linear-gradient(115deg, transparent 25%, rgba(255,215,0,0.4) 50%, transparent 75%)',
            animation: 'shine 3s infinite',
          },
          '@keyframes shine': {
            '0%': { left: '-100%' },
            '100%': { left: '100%' },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(45deg, rgba(255,215,0,0.05) 25%, transparent 25%, transparent 50%, rgba(255,215,0,0.05) 50%, rgba(255,215,0,0.05) 75%, transparent 75%, transparent)',
          backgroundSize: '20px 20px',
          boxShadow: '0 0 10px rgba(255,215,0,0.3)',
        },
      },
    },
  },
});

export default function Home() {

  const canvasRef = useRef(null);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 - 1.5,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 215, 0, 0.5)';
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const StatCard = ({ label, value, color }) => (
    <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#fafafa', color: "black" }}>
      <Typography variant="h6" gutterBottom>
        {label}
      </Typography>
      <Typography variant="h3" sx={{ color: color, fontWeight: 'bold' }}>
        {value}
      </Typography>
      <LinearProgress variant="determinate" value={75} sx={{ mt: 2, height: 10, borderRadius: 5 }} />
    </Paper>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box className="flex flex-col min-h-screen" sx={{ position: 'relative' }}>
        
        {/* Canvas de partículas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '90%',
            height: '90%',
            pointerEvents: 'none', // No interfere con la interacción
            zIndex: -1, // Asegura que esté detrás de todos los demás elementos
          }}
        />
        
        {/* Hero Section */}
        <Box sx={{ marginTop: "-30px" }}>
          <HeroSection />
        </Box>

        {/* Features Section */}
        <Box sx={{ py: 6, marginTop: "100px" }}>
          <Container maxWidth="lg">
            <Typography variant={isSmallScreen ? "h4" : "h2"} component="h2" align="center" gutterBottom sx={{ mb: 6, color: 'black' }}>
              Nuestras Funcionalidades
            </Typography>
            <Grid container spacing={4}>
              {[{
                title: "Generador de Presupuestos",
                icon: <Build />,
                description: "Crea presupuestos detallados de manera rápida y profesional",
              },
              {
                title: "Gestión de Productos",
                icon: <Assignment />,
                description: "Administra tu inventario y catálogo de productos"
              },
              {
                title: "Generador de Contratos",
                icon: <Assignment />,
                description: "Crea y gestiona contratos de manera eficiente"
              },
              {
                title: "Estadísticas",
                icon: <BarChart />,
                description: "Analiza el rendimiento de tu negocio"
              },
              {
                title: "Reseñas",
                icon: <Star />,
                description: "Gestiona las opiniones de tus clientes"
              },
              {
                title: "Gestión de Usuarios",
                icon: <People />,
                description: "Administra los usuarios del sistema"
              }].map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardHeader
                      title={feature.title}
                      subheader={feature.description}
                      avatar={React.cloneElement(feature.icon, { sx: { fontSize: 60, color: 'black' } })}
                      sx={{ 
                        '.MuiCardHeader-title': { color: 'black' },
                        '.MuiCardHeader-subheader': { color: 'black' }
                      }}
                    />
                    <CardContent>
                      <Button 
                        variant="outlined" 
                        fullWidth 
                        color="primary"
                        sx={{
                          color: 'black',
                          borderColor: 'primary',
                          '&:hover': {
                            color: 'white',
                            backgroundColor: 'primary',
                          }
                        }}
                      >
                        Ver más
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Admin Section */}
        <Box sx={{ py: 10 }}>
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center" >
            <Grid item xs={12} md={6} sx={{
      backgroundColor: 'rgba(255, 215, 0, 0.25)',
      padding: isSmallScreen ? 3 : 6,
      textAlign: 'center',
    }}>
      <Typography variant={isSmallScreen ? "h4" : "h3"} component="h2" gutterBottom sx={{ color: 'black' }}>
        Panel de Administración
      </Typography>
      <Typography variant="body1" paragraph sx={{ color: 'text.primary', mb: 4, textAlign: 'center' }}>
        Accede a todas las herramientas de gestión desde un solo lugar. Controla productos, presupuestos,
        contratos y más con nuestra interfaz futurista y eficiente.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        size="large" 
        startIcon={<Settings />}
        fullWidth
        sx={{ 
          px: isSmallScreen ? 2 : 4, 
          py: isSmallScreen ? 1.5 : 2,
          mb: 2,
        }}
      >
        Acceder al Panel
      </Button>
    </Grid>
              <Grid item xs={12} md={6}>
      <Box sx={{
        p: isSmallScreen ? 2 : 4,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Grid container spacing={isSmallScreen ? 2 : 3}>
          {[{
            label: "Productos",
            value: "150+",
            color: '#FFD700'
          },
          {
            label: "Presupuestos",
            value: "300+",
            color: '#2196F3'
          },
          {
            label: "Contratos",
            value: "100+",
            color: '#FFD700'
          },
          {
            label: "Usuarios",
            value: "50+",
            color: '#2196F3'
          }].map((stat, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <StatCard {...stat} />
            </Grid>
          ))}
        </Grid>

                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Footer */}
        <Box component="footer" sx={{ py: 6, bgcolor: 'rgba(255, 215, 0, 0.25)' }}>
          <Container maxWidth="lg">
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box
                component="img"
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Nosotros%20Log-XYcdDZ01OHG3kv1jm3fJr64kvUPEqY.png"
                alt="Nosotros Logo"
                sx={{ width: 100, height: 100, mb: 2, filter: 'drop-shadow(0 0 5px rgba(255,215,0,0.5))' }}
              />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                © 2024 Nosotros Construcciones. Todos los derechos reservados.
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
