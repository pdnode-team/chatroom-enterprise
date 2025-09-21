import { createTheme, ThemeProvider } from '@mui/material/styles';

import Image from "next/image";
import * as React from 'react';

// Augment the palette to include an ochre color
declare module '@mui/material/styles' {
  interface Palette {
    ochre: Palette['primary'];
  }

  interface PaletteOptions {
    ochre?: PaletteOptions['primary'];
  }
}

// Update the Button's color options to include an ochre option
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    ochre: true;
  }
}

export default function Home() {
  return (
    <React.Fragment>

    </React.Fragment>
  );
}
