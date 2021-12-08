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
    const [trainings_done, setTrainings_done] = useState([]);

    useEffect(() => {
        fetchData();

    }, []);
    useEffect(() => {
        customerNames();

    }, [trainings]);


    const customerNames = async () => {
        let i = 0;
        let list = trainings;
        for (i; i < trainings.length; i++) {

            try {
                const response = await fetch(trainings[i].customerHref)
                const json = await response.json();
                list[i].customerFirstname = json.firstname;
                list[i].customerLastname = json.lastname;
            } catch (error) {
                console.error(error);
            }
            console.log(list[i].customerLastname);
        }
        setTrainings_done(list);

        console.log(list)
    }


    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json())
            .then(

                data => {
                    const results = data.content.map(row => (
                        {
                            activity: row.activity,
                            duration: row.duration,
                            date: row.date,
                            customerHref: `${row.links[2].href}`,
                            href: `${row.links[0].href}`,
                            customerFirstname: 'default',
                            customerLastname: 'default',

                        }))
                    setTrainings(results);
                })
    }

    const deleteTraining = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link, { method: 'DELETE' })
                .then(res => fetchData())
                .catch(err => console.error(err))
        }
    }

    const columns = [{
        Header: 'Activity',
        accessor: 'activity'
    }
        ,
    {
        id: '1',
        Header: 'Date',
        accessor: row => {
            let pvm = new Date(row.date);
            return format(pvm, 'Pp');
        }
    },
    {
        Header: 'Duration',
        accessor: 'duration'
    },

    {
        id: '2',
        Header: 'Customer',
        accessor: row => { return `${row.customerFirstname}` + " " + `${row.customerLastname}` }
    },
    {
        sortable: false,
        filterable: false,
        width: 150,
        accessor: 'href',
        Cell: row => <Button color='secondary' onClick={() => deleteTraining(row.value)}>Delete</Button>
    }
    ]

    return (
        <div>
            <ReactTable filterable={true} data={trainings_done} columns={columns} />
        </div>
    )
}