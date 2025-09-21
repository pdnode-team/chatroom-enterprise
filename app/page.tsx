"use client";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Link from "@mui/material/Link";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import HomeIcon from '@mui/icons-material/Home';

import Image from "next/image";
import * as React from 'react';

// 使调色板包含自定义颜色
declare module '@mui/material/styles' {
  interface Palette {
    aqua: Palette['primary'];
  }
  interface PaletteOptions {
    aqua?: PaletteOptions['primary'];
  }
}

// 更新按钮的颜色选项来包含自定义颜色
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    aqua: true;
  }
}

// 定义主题
let theme = createTheme({
  // 将主题自定义写在这里
});

// 创建新调色板
theme = createTheme(theme, {
  palette: {
    aqua: theme.palette.augmentColor({
      color: {
        main: '#0085cc',
      },
      name: 'aqua',
    }),
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <title>PdNode Chat Enterprise - Instant messaging service for business</title>
      <div>
        <Stack direction="row" spacing={2} className="app-bar-light">
          <Stack direction="column" className="app-bar-button-container" spacing={0.4}>
            <Button href="/" varaint="contained" sx={{bgcolor:"aqua.dark", color:"white", borderRadius:"100px"}}>Home</Button>
            <Link href="/" sx={{textDecoration:"none"}}><Typography sx={{color:"white", fontSize:"0.9rem"}}>Home</Typography></Link>
          </Stack>
          <Button varaint="contained" sx={{bgcolor:"aqua.main", color:"white"}}>Pricing</Button>
        </Stack>
      </div>
    </ThemeProvider>
  );
}
