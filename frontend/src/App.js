import React, { useState, useEffect, Children } from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { List, ListItem, ListItemText } from '@material-ui/core'
import './App.css';


function MateriaList(props) {
    const { notes } = props;
    if (!notes || notes.length === 0) return <p>Empty</p>

    return (
        <List>
            {notes.map((note) => {
                return (
                    <ListItem button>
                        <ListItemText primary={note.name}/>
                    </ListItem>
                );
            })}
        </List>
    )
}

function NotesFetcher() {
    const [notesList, setNotesList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/api/notes")
            .then((res) => res.json())
            .then((notes) => {
                console.log(notes);
                setNotesList(notes);
            });
    })

    return <MateriaList notes={notesList}/>
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
            <NotesFetcher />
            <Button variant='contained' color='primary'>Create Entry</Button>
        </div>
    );
}

export default App;
