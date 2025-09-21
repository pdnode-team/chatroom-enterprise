"use client";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { darken } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Link from "@mui/material/Link";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import HomeIcon from '@mui/icons-material/Home';
import SellIcon from '@mui/icons-material/Sell';

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
      <div style={{alignItems:"center"}}>
        <Stack direction="row" spacing={2} className="app-bar-light">
          <Stack direction="column" className="app-bar-button-container" spacing={0.2}>
            <Button href="/" varaint="contained" color="aqua"
                    sx={{
                      backgroundColor:"aqua.dark",
                      color:"white",
                      borderRadius:"100px",
                      height:"3.4vh",
                      "&:hover": {
                        backgroundColor: (theme) => darken(theme.palette.aqua.dark, 0.2),
                      },
            }}>
              <HomeIcon sx={{fontSize:"2.5vh"}}/>
            </Button>
            <Link href="/" sx={{textDecoration:"none"}}><Typography sx={{color:"#e3e3e3", fontSize:"0.88rem"}}>Home</Typography></Link>
          </Stack>
          <Stack direction="column" className="app-bar-button-container" spacing={0.2}>
            <Button href="/pricing" varaint="contained" color="aqua"
                    sx={{backgroundColor:"aqua.main",
                      color:"white",
                      borderRadius:"100px",
                      height:"3.4vh",
                      "&:hover": {
                        backgroundColor: (theme) => darken(theme.palette.aqua.main, 0.2),
                      },
            }}>
              <SellIcon sx={{fontSize:"2.2vh"}}/>
            </Button>
            <Link href="/pricing" sx={{textDecoration:"none"}}><Typography sx={{color:"#e3e3e3", fontSize:"0.88rem"}}>Pricing</Typography></Link>
          </Stack>
        </Stack>
      </div>
    </ThemeProvider>
  );
}
