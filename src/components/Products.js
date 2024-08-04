import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions'
import ResponsiveAppBar from './ResponsiveAppBar';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';



function ProductPage() {
    const [productData, setProductData] = useState([]);
    const [singleProductData, setSingleProductData] = useState({});

    const [openDialogBox, setOpenDialogBox] = useState(false);
    const [open, setOpen] = React.useState(false);

    const location = useLocation();
    const category = location.state;

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const handleClose = () => {
        setOpen(false);
    }

    // const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }

    //     setOpen(false);
    // };


    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(category, "Category")
                console.log(category.category.includes(' '), "True")
                if (category.category.includes(' ')) {
                    category.category = category.category.replace(' ', '-')
                }
                const response = await fetch('https://dummyjson.com/products/category/' + category.category);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                let json = await response.json();
                setProductData(json.products);
            } catch (error) {
                console.log("Error", error)
            }
        };

        fetchData();
    }, []);
    // console.log(data, typeof (data), "Data")
    console.log(category, productData, typeof (productData), "productData")


    const handleDialogBox = async (id) => {
        console.log(id, "Product ID")
        try {
            const response = await fetch('https://dummyjson.com/products/' + id);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            let json = await response.json();
            setSingleProductData(json);
        } catch (error) {
            console.log("Error", error)
        }
        setOpenDialogBox(!openDialogBox)
    }

    const handleEdit = async (id) => {
        console.log(id, "Product ID")
        try {
            const response = await fetch('https://dummyjson.com/products/' + id);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            let json = await response.json();
            setSingleProductData(json);
        } catch (error) {
            console.log("Error", error)
        }
        setOpenDialogBox(!openDialogBox)
    }

    const handleDelete = async (id) => {
        console.log(id, "Product ID")
        setOpen(true);
        try {
            var requestOptions = {
                method: 'DELETE',
                redirect: 'follow'
            };
            const response = await fetch('https://dummyjson.com/products/' + id, requestOptions);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            let json = await response.json();
            console.log(json, "Delete JSON Data")
            setProductData(productData => productData.filter(item => item.id !== id));
        } catch (error) {
            console.log("Error", error)
        }
        // setOpenDialogBox(!openDialogBox)
    }

    return (
        <>
            <ResponsiveAppBar />
            <div align="center">
                <h1>Products Page</h1>
                {
                    productData && (
                        <div style={{ height: 400, width: '60%' }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Id</StyledTableCell>
                                            <StyledTableCell align="right">Product Name</StyledTableCell>
                                            <StyledTableCell align="right">View Product Info</StyledTableCell>
                                            <StyledTableCell align="center">Actions</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {productData.map((product) => (
                                            <StyledTableRow key={product.id}>
                                                <StyledTableCell component="th" scope="row">
                                                    {product.id}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">{product.title}</StyledTableCell>
                                                <StyledTableCell align="right">
                                                    <Button variant="contained" size="small" colored onClick={() => handleDialogBox(product.id)} raised ripple>
                                                        View Product Info
                                                    </Button>
                                                </StyledTableCell>
                                                <StyledTableCell align="right">
                                                    <Button variant="contained" size="small" colored onClick={() => handleDialogBox(product.id)} raised ripple>
                                                        Edit
                                                    </Button>&nbsp;
                                                    <Button align="right" variant="contained" size="small" colored onClick={() => handleDelete(product.id)} raised ripple>
                                                        Delete
                                                    </Button>
                                                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                                        <Alert
                                                            onClose={handleClose}
                                                            severity="success"
                                                            variant="filled"
                                                            sx={{ width: '100%' }}
                                                        >
                                                            Product Deleted Successfully
                                                        </Alert>
                                                    </Snackbar>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Dialog open={openDialogBox} onCancel={handleDialogBox} 
                            
                            PaperProps={{ style: { maxHeight: '70%', minHeight: '80%', width: '50%' } }}
            >
                                <DialogTitle>Product Details</DialogTitle>
                                <DialogContent >
                                    
                                   
                                    <Grid container spacing={2}>
            <Grid item xs={6}>
            <div>
                                        <p>Name : {singleProductData.title}</p>
                                        <p>Price: {singleProductData.price}</p>
                                        <p>Brand: {singleProductData.brand}</p>
                                    </div>
            </Grid>
            <Grid item xs={6}>
            <div style={{ float: 'right' }}>
                                        <img src={singleProductData.thumbnail} alt='Product Thumbnail' />
                                    </div>            </Grid>
        </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button type="button" onClick={handleDialogBox}>
                                        Close
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    )
                }

            </div>
        </>

    )
}

export default ProductPage;