import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid, Button, useMediaQuery, useTheme } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";


export default function HeroSection() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const canvasRef = useRef(null);

  
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
        speedY: Math.random() * 3 - 1.5
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

  return (
    <Box 
      className="relative min-h-[90vh] flex items-center justify-center"
      sx={{
        color: "#0a3a3a",
        overflow: "hidden",
        position: "relative",
        backdropFilter: 'blur(5px)',
        marginTop: "-100px", // Adjust this value based on your AppBar height
        paddingTop: "64px", // Add padding equal to the AppBar height
        height:"100%"
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
      <Container
        maxWidth="lg"
        className="relative z-20"
        sx={{
          paddingLeft: { xs: 2, md: 6 },
          paddingRight: { xs: 2, md: 6 },
          textAlign: "center",
          position: "relative", // Asegura que el contenido se ubique sobre el canvas
          
        }}
      >
        <Grid container spacing={4} alignItems="center" sx={{ position: "relative", justifyContent: "center" }}>
          <Grid item xs={12} md={7}>
            <Box
              component="img"
              src="./log1.png"
              alt="Nosotros Construcciones Logo"
              sx={{
                width: "100%",
                maxWidth: 350,
                height: "auto",
                borderRadius: "20px",
                boxShadow: "0 0 50px rgba(255, 215, 0, 0.3)",
                transition: "all 0.5s ease",
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%": {
                    boxShadow: "0 0 0 0 rgba(255, 215, 0, 0.7)",
                  },
                  "70%": {
                    boxShadow: "0 0 0 20px rgba(255, 215, 0, 0)",
                  },
                  "100%": {
                    boxShadow: "0 0 0 0 rgba(255, 215, 0, 0)",
                  },
                },
                "&:hover": {
                  transform: "scale(1.05) rotate(2deg)",
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={7}>
          <Typography
      variant={isSmallScreen ? "h4" : "h2"}
      component="h1"
      sx={{
        color: "black",
        fontWeight: "bold",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        fontFamily: "'Orbitron', sans-serif",
        marginBottom: 2,
        position: "relative",
        display: "inline-block",
        width: "100%", // Ocupa el 100% del contenedor
        textAlign: "center", // Asegura que esté centrado
        lineHeight: isSmallScreen ? "1.1" : "1.2", // Ajuste en la altura de la línea
        "&::after": {
          content: "''",
          position: "absolute",
          bottom: "-10px",
          left: "50%",
          width: isSmallScreen ? "100%" : "50%",
          height: "2px",
          background: "linear-gradient(90deg, transparent, #FFD700, transparent)",
          transform: "translateX(-50%)",
        },
      }}
    >
      NOSOTROS CONSTRUCCIONES
    </Typography>
            <Typography
              variant={isSmallScreen ? "subtitle1" : "h5"}
              sx={{
                color: 'rgba(0, 0, 0, 0.8)', // Color de texto más oscuro para contraste
                mb: 4,
                fontWeight: "300",
                fontStyle: "italic",
                letterSpacing: "0.1em",
                textShadow: "0 0 5px rgba(0, 0, 0, 0.3)", // Sombra más tenue para mejorar la legibilidad
              }}
            >
              Sistema integral de gestión para proyectos de construcción
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                px: 4,
                py: 2,
                fontSize: isSmallScreen ? "1rem" : "1.25rem",
                backgroundColor: "rgba(255, 215, 0, 0.8)",
                color: "background.default",
                borderRadius: "50px",
                boxShadow: "0 0 20px rgba(255, 215, 0, 0.5)",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: "''",
                  position: "absolute",
                  top: "-50%",
                  left: "-50%",
                  width: "200%",
                  height: "200%",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  transform: "rotate(45deg)",
                  transition: "all 0.3s ease",
                },
                "&:hover": {
                  backgroundColor: "rgba(255, 215, 0, 1)",
                  transform: "scale(1.05)",
                  boxShadow: "0 0 30px rgba(255, 215, 0, 0.7)",
                  "&::before": {
                    left: "100%",
                  },
                },
              }}
            >
              Comenzar Ahora
            </Button>
          </Grid>
        </Grid>
      </Container>
      {/* Efecto de partículas con fondo transparente */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}
