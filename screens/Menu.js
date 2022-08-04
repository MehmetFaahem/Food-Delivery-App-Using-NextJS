import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Container } from '@mui/system';
import { Stack, Typography } from '@mui/material';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';

const options = [
    'Barek Mollar Mor',
    'Kashemer Mor',
    'Alauddin Store',
    'Mirpur 10',
    'Mirpur 2',
    'Jhilpar',
    'PirerBagh',
    'Edu Care School',
    'Agargaon',
    'Chapra Mosque',
    'Paka Mosque',
    'Mirpur 11',
    'Pallabi',
    'Monipur',
];

const ITEM_HEIGHT = 48;

export default function MenuBar(params) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [location, setLocation] = React.useState('Set Location')
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const [FinalLocation, setFinalLocation] = React.useState('Set Location')

    const TheLocation = params.selectedLocation

    useEffect(() => {
        setFinalLocation(TheLocation)
    }, [TheLocation])

    const handleClose = async (option) => {
        setAnchorEl(null);
        await params.setSelectedLocation(option)
        console.log(option);
        setLocation(option)
        setFinalLocation(FinalLocation)
    };


    return (
        <div style={{
            position: 'absolute',
            top: 240,
            left: 47
        }}>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                sx={{
                    color: 'white'
                }}
            >
                {FinalLocation}
                {
                    !FinalLocation ? <Stack direction='row'>
                        <Typography variant='h5'>Set Location</Typography>
                        <EditLocationAltIcon sx={{ marginLeft: 1, fontSize: 30, marginBottom: 1 }} />
                    </Stack> : <CheckCircleIcon sx={{ marginLeft: 2 }} />
                }
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '30ch',
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option} selected={option === 'Monipur'} onClick={() => handleClose(option)}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
    console.log(anchorEl);
}


