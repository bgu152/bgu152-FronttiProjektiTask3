import './App.css';
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getThemeProps } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import{
  BrowserRouter,
  Routes,
  Route,
  Link
  }from "react-router-dom";


import Trainingslist from './components/trainings';
import Customerlist from './components/customers';


function App() {

  const pages = ['Traning sessions', 'Customers'];
  return (
    <div className="App">
      <AppBar position = "static">
        <Typography variant = 'h6'>
          Appbar
        </Typography>
        </AppBar>

        <BrowserRouter>
          <Link to="/">Training sessions</Link> {' '}
          <Link to="/customers">Customers</Link> {' '}
          <Routes>
            <Route exact path ="/" element ={<Trainingslist/>}/>
            <Route path="/customers" element={<Customerlist/>}/>
          </Routes>
      </BrowserRouter>
        {/* <Customerlist/> */}
      {/* <Trainingslist/> */}
    </div>
  );
}

export default App;
