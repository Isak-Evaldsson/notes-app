import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import './App.css';


function List(props) {
    const { notes } = props;
    if (!notes || notes.length === 0) return <p>Empty</p>

    return (
        <ul>
            {notes.map((note) => {
                return (
                    <li>
                        <span>{note.name}</span>
                    </li>
                );
            })}
        </ul>
    )
}

function NotesList() {
    const [notesList, setNotesList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/api/notes")
            .then((res) => res.json())
            .then((notes) => {
                console.log(notes);
                setNotesList(notes);
            });
    })

    return <List notes={notesList} />
}

function App() {


    return (
        <div className="App">
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant="h6" className='Header'>
                        Notes App
          </Typography>
                </Toolbar>
            </AppBar>
            <NotesList />
            <Button variant='contained' color='primary'>Create Entry</Button>
        </div>
    );
}

export default App;
