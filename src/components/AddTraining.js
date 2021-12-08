import React, { useState, useEffect } from 'react';
import ReactTable from "react-table-6";
import 'react-table-6/react-table.css';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import AppBar from '@mui/material/AppBar';


import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getThemeProps } from '@mui/system';
import Moment from 'react-moment';
import DateAdapter from '@mui/lab/AdapterMoment';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';







export default function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date('2014-08-18T21:11:54'));
    const [training, setTraining] = useState(
        {
            date: "",
            activity: "",
            duration: "",
            customer: ""
        }
    );

    const handleDate = (newValue) => {
        console.log(newValue.toISOString());
        setTraining({ ...training, date: newValue.toISOString() });
    };

    function addDays(date, days) { //from https://stackoverflow.com/questions/563406/add-days-to-javascript-date
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    function tomorrow() {
        var today = new Date();
        return (addDays(today, 1).toISOString())
    }

    const handleClickOpen = () => {
        console.log(props.customer);
        setTraining({
            date: tomorrow(),
            activity: '',
            duration: '',
            customer: props.customer.links[0].href,
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setTraining({ ...training, [event.target.id]: event.target.value })
    }

    const saveTraining = () => {
        console.log('addTraining in AddTrainings.js');
        console.log('The customer is: ');
        console.log(training.customer);
        props.saveTraining(training)
        handleClose();
    }


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Button style={{ margin: 10 }} variant="outlined" onClick={handleClickOpen}>
                Add Activity
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add an activity for {props.customer.firstname} {props.customer.lastname}</DialogTitle>
                <DialogContent>

                    <DateTimePicker
                        value={training.date}
                        onChange={handleDate}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <TextField
                        margin="dense"
                        id="activity"
                        label="Activity"
                        value={training.activity}
                        fullWidth
                        variant="standard"
                        onChange={event => handleInputChange(event)}
                    />
                    <TextField
                        margin="dense"
                        id="duration"
                        label="Duration"
                        value={training.duration}
                        fullWidth
                        variant="standard"
                        onChange={event => handleInputChange(event)}
                    />
                    <TextField
                        margin="dense"
                        id="href"
                        label="href"
                        value={training.customer}
                        fullWidth
                        variant="standard"
                        onChange={event => handleInputChange(event)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={saveTraining}>Save</Button>
                </DialogActions>
            </Dialog>
        </LocalizationProvider>

    )
}