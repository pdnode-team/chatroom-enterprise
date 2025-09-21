"use client";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import Image from "next/image";
import * as React from 'react';

// 使调色板包含自定义颜色
declare module '@mui/material/styles' {
  interface Palette {
    ochre: Palette['primary'];
  }
  interface PaletteOptions {
    ochre?: PaletteOptions['primary'];
  }
}

// 更新按钮的颜色选项来包含自定义颜色
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    ochre: true;
  }
}

// 定义主题
let theme = createTheme({
  // 将主题自定义写在这里
});

// 创建新调色板
theme = createTheme(theme, {
  palette: {
    ochre: theme.palette.augmentColor({
      color: {
        main: '#E3D026',
      },
      name: 'ochre',
    }),
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <title>PdNode Chat Enterprise - Instant messaging service for business</title>
      <div>
        <Stack direction="row" spacing={2} className="app-bar-light">
          <Button varaint="contanined" color="ochre">Home</Button>
          <Button varaint="contanined" color="ochre">Pricing</Button>
        </Stack>
      </div>
    </ThemeProvider>
  );
}
