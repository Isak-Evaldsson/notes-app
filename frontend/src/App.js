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

function NotesFetcher(props) {
    useEffect(() => {
        fetch("http://localhost:3001/api/notes")
            .then((res) => res.json())
            .then((notes) => {
                //console.log(notes);
                props.setNotesList(notes);
            });
    })

    return <MateriaList notes={props.notesList} setPage={props.setPage} setList={props.setList}/>
}

function ShowNote(props) {
    const [note, setNote] = useState([]);
    const [content, setContent] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/api/notes/" + props.id)
            .then((res) => res.json())
            .then((note) => {
                setNote(note);
                setContent(note.content)
            });
    })

    return (
        <div>
            <h3>{note.name}</h3>
             <ul>
                {content.map(content => {
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


    if(list) {
        return <NotesFetcher setPage={setPage} setList={setList} setNotesList={setNotesList} notesList={notesList}/>
    } else {
        return <ShowNote id={page} setList={setList}/>
    }
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
                <AddIcon/>
            </Fab>
        </div>
    );
}

export default App;
