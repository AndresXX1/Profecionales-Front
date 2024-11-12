import React from "react";
import { Button as MuiButton } from "@mui/material";
import { cn } from './utils'; // Si tienes alguna utilidad para combinar clases, como cn()

const Button = React.forwardRef(({ className, variant, size, children, ...props }, ref) => (
  <MuiButton
    ref={ref}
    variant={variant || "contained"} // Predeterminado a 'contained'
    size={size || "medium"} // Predeterminado a 'medium'
    className={cn(className)}
    {...props}
  >
    {children}
  </MuiButton>
));

Button.displayName = "Button";

export default Button;
