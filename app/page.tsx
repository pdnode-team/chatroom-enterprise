import { createTheme, ThemeProvider } from '@mui/material/styles';

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

let theme = createTheme({
  // Theme customization goes here as usual, including tonalOffset and/or
  // 函数augmentColor()依赖此局部变量
});

// 定义主题
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
    </ThemeProvider>
  );
}
