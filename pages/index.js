import { Typography, Button } from "@mui/material";
import Container from '@mui/material/Container';
import Parent from "../screens/BottomBar";
import Link from 'next/link'
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react'
import Component from "../components/login";
const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export default function Home() {

  const theme = useTheme();

  const colorMode = React.useContext(ColorModeContext);

  return (
    <Parent>
      <Box>
        <Container sx={{
          pt: 2, bgcolor: 'background.default',
          color: 'text.primary', paddingBottom: 100
        }}>

          <Container>
            {theme.palette.mode === 'dark' ? <Typography variant="h1" sx={{
              fontSize: 40,
              fontWeight: 'bold',
              color: '#080c24', mt: 3
            }}>
              Do you want check the nutration of foods?
            </Typography> : <Typography variant="h1" sx={{
              fontSize: 40,
              fontWeight: 'bold',
              color: '#ff6a00', mt: 3
            }}>
              Do you want check the nutration of foods?
            </Typography>}

            {theme.palette.mode === 'light' ? <Typography variant="h2" sx={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#bf7845',
              pt: 1,
              letterSpacing: 6
            }}>
              Before ordering your snacks...
            </Typography> : <Typography variant="h2" sx={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#bf7845',
              pt: 1,
              letterSpacing: 6
            }}>
              Before ordering your snacks...
            </Typography>}

            {theme.palette.mode === 'light' ? <Link href='/nutrations'>
              <Button variant="contained" sx={{
                mt: 5,
                backgroundColor: '#080c24',
                color: 'white'
              }}>Let's Check</Button>
            </Link> : <Link href='/nutrations'>
              <Button variant="contained" sx={{
                mt: 5,
                backgroundColor: 'white',
                color: '#080c24'
              }}>Let's Check</Button>
            </Link>}

          </Container>
        </Container>
      </Box>
      {/* <Component /> */}
    </Parent >
  )
}


