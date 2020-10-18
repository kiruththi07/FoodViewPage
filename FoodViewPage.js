import React,{ useState, useEffect, Fragment } from 'react';
import { makeStyles, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead,InputAdornment, TableRow, Paper, Grid,InputBase,TextField} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import petFoodService from '../Services/petFoodService';
import PetsDetails from './PetsViewPage';
import AddNewFoodItem from './AddNewFoodItem';
import PropTypes from 'prop-types';
import {  useTheme } from '@material-ui/core/styles';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import {Link} from 'react-router-dom';
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert"







const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

                     

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  grid: {
      margin: '35px 150px 20px 50px',
      padding: '10px 10px 10px 10px',
      backgroundColor: "#424242"
  },
  paper: {
    padding: '10px 10px 10px 10px', 
    margin: '10px 10px 10px 10px',
    position: 'inherit'
  },
  search: {
    position: 'relative',
    align:'left',
    },
});

function Alert(props){
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}



function FoodData(Title, Price, 	Description, AvatarUrl ,ImageUrl) {
  return {Title, Price, Description,AvatarUrl,ImageUrl };
}

const rows = [
  FoodData('', '', '',  '',''),
  FoodData('', '',  '',  '',''),
  FoodData('', '',  '',  '',''),
 
  
];

export default function FoodDetails() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(10);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [message, setMessage] = React.useState('');
  const [FoodDetails,setFoodDetails ] = useState([]);
  const [open, setOpen] = React.useState(false);

  const [editFood,setEditFood] = useState();
  // const []


  useEffect(() => {
      petFoodService.getAllPetFoodInPage(0,5)
        .then((res)=>{
          setFoodDetails(res.data.data)
           setCount(res.data.Totalnoofelements)
           console.log(res.data.Totalnoofelements)
          console.log(res)
        })
  },[])



    // const fetchPetFoodById = (id) => {
    //   petFoodService.fetchPetFoodById(id)
    //   .then((res) =>{
    //     console.log(res)
    //     setEditFood(res.data)
    //     console.log(res.data)
        
    //   })


    // }








  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    petFoodService.getAllPetFoodInPage(newPage,5)
        .then((res)=>{
          setFoodDetails(res.data.data)
          setCount(res.data.Totalnoofelements)
          console.log(res.data.Totalnoofelements)
        })
  };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // export default function UpdateDetails() {
  //   // const classes = useStyles();
  //   // const [open, setOpen] = React.useState(false);
  


  //   const handleClick = () => {
  //     setOpen(true);
  //   };


    const deletePetFood = (id) =>{
      petFoodService.deletePetFood(id)
      .then((res) =>{
        setFoodDetails(FoodDetails.filter(FoodDetails => FoodDetails.id !== id));
        setMessage('Food deleted Successfully.')
        setOpen(true)
    },
    (error)=> {
      setMessage('deleted fail.')
      setOpen(true)
    });
    }

    const handleClose = (event, reson) =>{
      if (reson === "clickaway"){
        return;
      }

      setOpen(false);
    }

  return (
      <div>
        {console.log(count)}
    <Grid className={classes.grid}>
      <Paper className = {classes.paper}>

        <div>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal:'right'}}>
            <Alert onClose={handleClose} severity="error">
              {message}
            </Alert>
          </Snackbar>
        </div>

        <h1>AllFoodDetails</h1>
        <div className={classes.search}>
            <div className={classes.searchIcon} style = {{float: 'right'}}>
 
            
            {/* <TextField
        // className={classes.margin}
        id="input-with-icon-textfield"
        label="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon/>
            
            </InputAdornment>
          ),
        }}
      /> */}
              
            </div>
        </div>
        
        <TableContainer>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
          <TableCell align="left"><b>Actions</b></TableCell>
            <TableCell align="left"><b>Title</b></TableCell>
            <TableCell align="left"><b>Price</b></TableCell>
            <TableCell align="left"><b>Description</b></TableCell>
            <TableCell align="left"><b>AnimalType</b></TableCell>
             {/* <TableCell align="left"><b>AvatarUrl</b></TableCell> 
             <TableCell align="left"><b>ImageUrl</b></TableCell>  */}



          </TableRow>
        </TableHead>
        <TableBody>

          {FoodDetails.map((row) => (

          // key={row.id}>
          //   <TableCell component="th" scope="row">
          //     {row.id}

            <TableRow>
              
              <TableCell>
              
             

              <IconButton>
              <DeleteIcon
                color="default"
                align="left"
                inputProps={{ 'aria-label': 'DeleteIcon with default color' }}
                onClick = {()=>deletePetFood(row.id)}
              />
              
              </IconButton>
              
              <IconButton href ={ `/edit/${row.id}`}>
              {/* <Link to={`/edit/${row.id}`}> */}

                <EditIcon
                color="default"
                align="left"
                inputProps={{ 'aria-label': 'DeleteIcon with default color' }}
                // onClick = {() =>fetchPetFoodById(row.id)}
              />
             
              {/* <AddNewFoodItem/> */}
             

              {/* </Link> */}
              </IconButton>

              
              </TableCell>
              
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="left">{row.price}</TableCell>
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="left">{row.animalType}</TableCell>
              {/* <TableCell align="left">{row.avatarUrl}</TableCell>
              <TableCell align="left">{row.imageUrl}</TableCell> */}
              
            
            </TableRow>
          ))}
          
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5]}
              //colSpan={3}
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              // SelectProps={{
              //   inputProps: { 'aria-label': 'rows per page' },
              //   native: true,
              // }}
              onChangePage={handleChangePage}
              // onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>

      </Table>

     
    </TableContainer>

    
    
      </Paper>
    </Grid>
    </div>
    
  );
}

