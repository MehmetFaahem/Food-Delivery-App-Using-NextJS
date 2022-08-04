import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Container, Modal, Box, Avatar, Grid } from '@mui/material';
import axios from 'axios';
import Stack from '@mui/material/Stack';

import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

import { useEffect, useState } from 'react';
import Parent from '../screens/BottomBar';
import MenuBar from '../screens/Menu';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#080c24',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

export default function MultiActionAreaCard() {

    const [foods, setFoods] = useState([])
    const [drinks, setDrinks] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/api/foodsData')
            .then(function (response) {
                setFoods(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:3001/api/drinksData')
            .then(function (response) {
                setDrinks(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    const [open, setOpen] = React.useState(false)
    const [food, setFood] = React.useState('')
    const [drink, setDrink] = React.useState('')
    const [selectedLocation, setSelectedLocation] = React.useState('')

    const [show, setShow] = React.useState(false)
    const handleOpen = (food, drink) => {
        setOpen(true)
        setFood(food)
        setDrink(drink)
    }

    const [passer, setPasser] = React.useState(false)

    const handleModal = async () => {
        const response = await fetch('http://localhost:3001/api/catchedData', {
            method: 'POST',
            body: JSON.stringify({ food, selectedLocation }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data)
        setOpen(false)
        setShow(true)
    }

    const handleClose = () => {
        setOpen(false);
        setShow(false)
        setPasser(true)
    }

    const Modaler = () => {
        return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <Stack direction="row" alignItems='center'>
                        <Container>
                            <h2 id="parent-modal-title" style={{
                                color: '#ccd0f0'
                            }}>Confirm Your Order</h2>
                            <h1 style={{ color: 'white' }}>{food.name || drink.name}</h1>
                            <h1 style={{ color: 'white' }}>{food.price || drink.price} $</h1>
                        </Container>
                        <Container>
                            <Avatar alt="Travis Howard" variant="rounded" src={food.image} sx={{ width: 100, height: 100, border: 2, borderColor: 'white' }} />
                        </Container>
                    </Stack>

                    <Container>
                        <MenuBar setSelectedLocation={setSelectedLocation} selectedLocation={selectedLocation} />
                    </Container>

                    <Button sx={{
                        left: 300,
                        backgroundColor: 'white',
                        fontWeight: 'bold'
                    }} onClick={handleModal}>Confirm</Button>
                </Box>
            </Modal>
        )
    }

    const Modalest = () => {
        return (
            <Modal
                open={show}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <Container>
                        <h2 id="parent-modal-title" style={{
                            color: '#ccd0f0'
                        }}>Your Order Is Placed !</h2>
                        <h1 style={{ color: 'white' }}> Now you can see delivery process and set time through DashBoard</h1>


                        <SentimentVerySatisfiedIcon style={{ fontSize: 30, color: 'white' }} />
                    </Container>
                    <Button sx={{
                        left: 300,
                        backgroundColor: 'white',
                        fontWeight: 'bold'
                    }} onClick={handleClose}>Okay</Button>
                </Box>
            </Modal>
        )
    }

    return (
        <Parent passer={passer}>
            <Stack direction="row" spacing={2} sx={{
                padding: 17
            }}>
                <Container>
                    {
                        foods.map((food, index) => (
                            <Card sx={{ maxWidth: 345, mb: 7 }} key={index}>
                                <CardActionArea onClick={() => handleOpen(food)}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={food.image}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {food.name}
                                        </Typography>
                                        <Typography variant="h6" color="text.secondary">
                                            Price: {food.price}$
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button
                                        onClick={() => handleOpen(food)}
                                        variant="contained" style={{
                                            backgroundColor: '#080c24',
                                            marginTop: 4,
                                            color: 'white',
                                            marginLeft: 2.5
                                        }} startIcon={<ArrowCircleRightIcon style={{ fontSize: 26, }} />}>
                                        Pick
                                    </Button>
                                </CardActions>
                            </Card>
                        ))
                    }
                </Container>
                <Container>
                    {
                        drinks.map((drink, index) => (

                            <Card sx={{ maxWidth: 345, mb: 7 }} key={index}>
                                <CardActionArea onClick={() => handleOpen(drink)}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={drink.image}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {drink.name}
                                        </Typography>
                                        <Typography variant="h6" color="text.secondary">
                                            Price: {drink.price}$
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions onClick={() => handleOpen(drink)}>
                                    <Button variant="contained" style={{
                                        backgroundColor: '#080c24',
                                        marginTop: 4,
                                        color: 'white',
                                        marginLeft: 2.5
                                    }} startIcon={<ArrowCircleRightIcon style={{ fontSize: 26, }} />}>
                                        Pick
                                    </Button>
                                </CardActions>
                            </Card>
                        ))
                    }


                </Container>
                <Modaler />
                <Modalest />
            </Stack>
        </Parent>
    );
}
