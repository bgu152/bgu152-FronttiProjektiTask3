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





export default function Trainingslist() {
    const [trainings, setTrainings] = useState([]);
    const [trainings_done,setTrainings_done] = useState([]);

    useEffect(() => {
        console.log('useEffect1')
        fetchData();

    }, []);
    useEffect(() => {
        console.log('useEffect2')
        customerNames();

    }, [trainings]);


const customerNames = async () => {
    console.log('customerNames');
    let i=0;
    let list=trainings;
    for(i;i < trainings.length;i++){
        const response = await fetch(trainings[i].customerHref)
        const json = await response.json();
        list[i].customerFirstname = json.firstname;
        list[i].customerLastname = json.lastname;
        console.log(list);
      }
      setTrainings_done(list);
   }


    const fetchData = () => {
        console.log('fetchData');
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json())
            .then(

                data => {
                    const results = data.content.map((row, index) => (
                        {
                            id: index,
                            activity: row.activity,
                            duration: row.duration,
                            date: row.date,
                            customerHref: row.links[2].href,
                            customerFirstname: 'default',
                            customerLastname: 'default'
                        }))
                    setTrainings(results);
                })
            .then(results => console.log(results))
    }


    const columns = [{
        Header: 'Activity',
        accessor: 'activity'
    }
        ,
    {
        id:'1',
        Header: 'Date',
        accessor: row => 
        {
            let year = row.date.substring(0,4); 
            let month = row.date.substring(5,7)-1;
            let day = row.date.substring(8,10);
            let hour = row.date.substring(11,13);
            let minutes = row.date.substring(14,16);
            let pvm = new Date(year,month, day,hour);
            return  format(pvm,'Pp') ;
        }
    },
    {
        Header: 'Duration',
        accessor: 'duration'
    },

    {
        id:'2',
        Header: 'Customer',
        accessor: row => {return `${row.customerFirstname}` + " "  + `${row.customerLastname}`}
    }
    ]

    return (
        <div>
            <ReactTable filterable = {true} data={trainings} columns={columns} />
        </div>
    )
}