import React, { useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { List, ListItem, ListItemText, Button } from '@material-ui/core'
import './App.css';


function MateriaList(props) {
    const { notes } = props;
    if (!notes || notes.length === 0) return <p>Empty</p>

    return (
        <List>
            {notes.map((note, index) => {
                return (
                    <ListItem button onClick={() => {
                        props.setPage(index)
                        props.setList(false)}}>
                        <ListItemText primary={note.name}/>
                    </ListItem>
                );
            })}
        </List>
    )
}

function ShowNote(props) {
    return (
        <div>
            <h3>{props.note.name}</h3>
             <ul>
                {props.note.content.map(content => {
                    return <li>{content}</li>
                })}
            </ul>
            <Button variant="contained" onClick={() => props.setList(true)}>Go back</Button>    
        </div>
    );
}

function Page() {
    const [notesList, setNotesList] = useState([]);
    const [list, setList] = useState(true);
    const [page, setPage] = useState(0);

    useEffect(() => {
        fetch("http://localhost:3001/api/notes")
            .then((res) => res.json())
            .then((notes) => {
                console.log("Fetched notes from server");
                setNotesList(notes);
            });
    })

    if(list) {
        return <MateriaList notes={notesList} setPage={setPage} setList={setList}/>
    } else {
        return <ShowNote note={notesList[page]} setList={setList}/>
    }
}

function postNote(name, content) {
    const data = {name: name, content: content }

    fetch("http://localhost:3001/api/notes", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => {
        console.log("Request complete! response:", res);
    });          
}

function App() {
    return (
        <div className="App">
            <AppBar position='sticky'>
                <Toolbar>
                    <Typography variant="h6" className='Header'>
                        Notes App
                    </Typography>
                </Toolbar>
            </AppBar>
            <Page/>
            <Fab style ={{position : 'fixed', bottom : '15px', right : '15px'}} color = 'primary'> 
                <AddIcon onClick={() => {
                    postNote('Test Note', ['Test Data'])                               
                }}/>
            </Fab>
        </div>
    );
}

export default App;
