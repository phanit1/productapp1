import '../App.css';
import React, { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import Grid from '@mui/material/Grid';
import "./HomePage.css"
import image from '../image.jpg'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ResponsiveAppBar from './ResponsiveAppBar';
import { makeStyles } from '@mui/styles';
import { Scrollbars } from 'react-custom-scrollbars';


const useStyles = makeStyles({
    customScrollbar: {
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: '#f1f1f1',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#888',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#555',
      },
    },
  });

function HomePage() {
    const [data, setData] = useState([]);
    const history = useNavigate();
    const classes = useStyles();
    const handleClick = (item) => {
        console.log("Handle Clicked ", item)
        // console.log(category,"Category")
        history('/product/category/' + item, { state: { category: item } })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products/categories');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                let json = await response.json();
                setData(json);
            } catch (error) {
                console.log("Error", error)
            }
        };

        fetchData();
    }, []);
    // console.log(data, typeof (data), "Data")

    return (
        <>
        <ResponsiveAppBar />
            <div className={classes.customScrollbar}>
                <h1 align="center">Product Categories Page</h1>
                {data && (
                            <Scrollbars style={{ width: 1150, height: 400 }}>
                    <ul>
                        <div className="card-container">
                            <Grid container spacing={2} className="card-container">
                                {data.map((item,index) => (
                                    <Card sx={{ maxWidth: 345 }} className="card" key={index}>
                                        <CardMedia
                                            sx={{ height: 140 }}
                                            image={image}
                                            title="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {item.name}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" variant="primary" onClick={() => handleClick(item.name)}>Know More</Button>
                                        </CardActions>
                                    </Card>
                                ))}
                            </Grid>
                        </div>
                    </ul>
                    </Scrollbars>
                )}
            </div>
        </>

    )
}

export default HomePage;