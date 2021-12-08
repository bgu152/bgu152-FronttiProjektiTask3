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

export default function Customerlist() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers()
    },[])

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content));
    }

    const columns = [{
        Header: 'First name',
        accessor: row => {return `${row.firstname}`},
        id:12
    },
    {
        Header: 'Last name',
        accessor: 'lastname'
    },
    {
        Header: 'Email',
        accessor: 'email'
    }
    ,
    {
        Header: 'Address',
        accessor: 'streetaddress'
    },
    {
        Header: 'Postcode',
        accessor: 'postcode'
    },
    {
        Header: 'City',
        accessor: 'city'
    }
]

    return (
        <div>
            <ReactTable filterable = {true} data={customers} columns={columns} />
        </div>
    )
}