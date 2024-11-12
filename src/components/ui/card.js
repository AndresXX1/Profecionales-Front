import React from "react";
import { Card as MuiCard, CardContent, CardHeader, CardActions } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(MuiCard)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: "15px",
  boxShadow: `0 0 20px ${theme.palette.primary.main}20`,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: `0 10px 30px ${theme.palette.primary.main}5, 0 0 0 5px rgba(255, 215, 0, 0.5)`, // Added yellow shadow
  },
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

const Card = React.forwardRef(({ className, children, ...props }, ref) => (
  <StyledCard ref={ref} className={className} {...props}>
    {children}
  </StyledCard>
));

Card.displayName = "Card";


const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  '& .MuiCardHeader-title': {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  '& .MuiCardHeader-subheader': {
    color: theme.palette.text.secondary,
  },
  '& .MuiCardHeader-avatar': {
    backgroundColor: theme.palette.background.default,
    borderRadius: '50%',
    padding: theme.spacing(1),
    boxShadow: `0 0 10px ${theme.palette.primary.main}40`, // Reduced opacity from 66 to 40
  },
}));
const CardHeaderComponent = React.forwardRef(({ className, ...props }, ref) => (
  <StyledCardHeader ref={ref} className={className} {...props} />
));

CardHeaderComponent.displayName = "CardHeader";

const CardContentComponent = React.forwardRef(({ className, children, ...props }, ref) => (
  <CardContent ref={ref} className={className} {...props}>
    {children}
  </CardContent>
));

CardContentComponent.displayName = "CardContent";

const CardActionsComponent = React.forwardRef(({ className, children, ...props }, ref) => (
  <CardActions ref={ref} className={className} {...props}>
    {children}
  </CardActions>
));

CardActionsComponent.displayName = "CardActions";

export { Card, CardHeaderComponent as CardHeader, CardContentComponent as CardContent, CardActionsComponent as CardActions };