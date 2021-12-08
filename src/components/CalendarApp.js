import React, { useState, useEffect } from 'react';
import ReactTable from "react-table-6";
import 'react-table-6/react-table.css';
import { formatDistance, formatRelative, subDays } from 'date-fns'
import AppBar from '@mui/material/AppBar';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay'
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";



import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getThemeProps } from '@mui/system';
import requirePropFactory from '@mui/utils/requirePropFactory';

//followed https://www.youtube.com/watch?v=lyRP_D0qCfk&ab_channel=DarwinTech

export default function CalendarApp() {
    const [trainings, setTrainings] = useState([]);
    const [trainings_done, setTrainings_done] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        customerNames();

    }, [trainings]);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json())
            .then(

                data => {
                    const results = data.content.map(row => (
                        {
                            title: row.activity,
                            duration: row.duration,
                            customerHref: `${row.links[2].href}`,
                            start: row.date,

                        }))
                    setTrainings(results);
                })
    }    

    const customerNames = async () => {
        let i = 0;
        let list = trainings;
        let pvm = new Date();
        for (i; i < trainings.length; i++) {
            pvm = new Date(list[i].start);
            list[i].start = pvm;
            list[i].end = new Date(pvm.getTime() + 60000*list[i].duration)
            const response = await fetch(trainings[i].customerHref)
            const json = await response.json();
            list[i].customerFirstname = json.firstname;
            list[i].customerLastname = json.lastname;
            list[i].title = list[i].title + ", " + list[i].customerFirstname + " " + list[i].customerLastname;
        }
        setTrainings_done(list);
    }

    const locales = { "en-US": require("date-fns/locale/eu") }

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales
    })

    return (
        <div>
            <Calendar localizer={localizer}
                events={trainings_done}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, margin: "50px" }}
            />
        </div>
    )
}