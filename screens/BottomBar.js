import React, { Fragment } from 'react'
import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FastfoodRoundedIcon from '@mui/icons-material/FastfoodRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import Paper from '@mui/material/Paper';
import Link from 'next/link'
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import { MaterialUISwitch } from '../darkmode';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export default function Parent({ children, passer }) {

    const blink = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

    const BlinkedBox = styled('div')({
        backgroundColor: '#9eb6de',
        width: 30,
        height: 30,
        animation: `${blink} 1s linear infinite`,
        borderRadius: 25
    });

    const BlinkedText = () => {
        return (
            <div style={{
                animation: `${blink} 1s linear infinite`,
                color: '#9eb6de'
            }}>
                <h5 style={{
                    animation: `${blink} 1s linear infinite`,
                    color: '#9eb6de',
                    marginLeft: 13
                }}>Your Order Is On The Way</h5>
            </div>
        )
    }


    const [value, setValue] = useState();
    const [mode, setMode] = React.useState('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );



    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );

    const ButtonofNav = () => {
        return (
            <Fragment>
                <BottomNavigationAction icon={<Link href='/details'><AnalyticsRoundedIcon style={{ color: '#9eb6de', fontSize: 30 }} /></Link>} value='3' />
                {passer == true ? <><BlinkedBox sx={{ marginTop: 1.6 }} /> <BlinkedText /> </> : null} </Fragment>
        )
    }

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <Box sx={{
                    pb: 7,
                    bgcolor: 'background.default',
                    color: 'text.primary',
                }}>
                    <Container sx={{
                        pb: 3,
                    }}>
                        <IconButton onClick={colorMode.toggleColorMode} color="inherit" sx={{
                            alignSelf: 'flex-end', position: "absolute", right: 20
                        }}>
                            <MaterialUISwitch />
                        </IconButton>
                    </Container>
                    <Container>
                        {children}
                    </Container>
                    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={9}>
                        <BottomNavigation
                            showLabels
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            sx={{ bgcolor: '#080c24' }}
                        >
                            <Link href='/'>
                                <BottomNavigationAction icon={<HomeRoundedIcon style={{ color: '#9eb6de', fontSize: 33 }} />} value='1' />
                            </Link>

                            <Link href='/foods'>
                                <BottomNavigationAction icon={<FastfoodRoundedIcon style={{ color: '#9eb6de', fontSize: 30 }} />} value='2' />
                            </Link>

                            <ButtonofNav />



                        </BottomNavigation>
                    </Paper>
                </Box>
            </ThemeProvider>
        </ColorModeContext.Provider >

    );
}

