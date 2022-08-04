import React, { useState, useEffect } from 'react'
import { Container, Modal, Stack, Button, Divider } from '@mui/material'
import Parent from '../screens/BottomBar'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Link from 'next/link';

function Analytics() {

    const [selectedFoods, setSelectedFoods] = useState([])

    const deleteFood = async (foodID) => {
        const response = await fetch(`https://kheyedekhen.vercel.app/api/catchedData`, {
            method: 'DELETE',
            body: JSON.stringify({ foodID }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        console.log(data)
        console.log('Item Deleted Successfully')
        console.log(foodID)



    }

    useEffect(() => {

        axios.get('https://kheyedekhen.vercel.app/api/catchedData')
            .then(function (response) {
                setSelectedFoods(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [selectedFoods])

    function DefaultScreen() {
        return (
            <Container sx={{ alignItems: 'center', justifyContent: 'center', marginTop: 20, justifyItems: 'center', alignContent: 'center', marginBottom: 40 }}>
                <Typography variant='h4' textAlign='center'>
                    You Have Not Any Order In Processing OR You Have Not Order Any Food Yet
                    <Divider sx={{ marginTop: 5 }} />
                    <Link href='/foods'>
                        <Button variant='contained' sx={{ backgroundColor: '#080c24', color: 'white', marginTop: 10, padding: 2 }} >Please Select Food</Button>
                    </Link>
                </Typography>
            </Container>
        )
    }

    if (!selectedFoods.length) {
        return (
            <Parent>
                <DefaultScreen />
            </Parent>
        )
    } else {
        return (
            <Parent>

                <Stack direction="row" spacing={2} sx={{
                    padding: 10
                }}>
                    <Container>
                        {
                            selectedFoods.map((food, index) => (

                                <Container key={index}>
                                    <Card sx={{ display: 'flex', justifyContent: 'space-between', }}>

                                        <Box sx={{ display: 'flex' }}>
                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                <Typography component="div" variant="h5">
                                                    {food.food.name}
                                                </Typography>
                                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                                    {food.food.price}$
                                                </Typography>
                                            </CardContent>
                                        </Box>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 150, height: 100 }}
                                            image={food.food.image}
                                            alt="YO YO"
                                        />
                                    </Card>
                                    <Container sx={{ marginBottom: 6, marginTop: 1, justifyContent: 'flex-end', }}>
                                        <Button onClick={() => deleteFood(food.id)} variant='contained' sx={{ backgroundColor: '#080c24', right: 23, color: 'white' }} >Remove</Button>
                                    </Container>
                                </Container>

                            ))
                        }
                    </Container>
                </Stack>

            </Parent>
        )
    }

}

export default Analytics
