const express = require('express');
const app = express();

app.use(express.json());

const port = 3001;

const notes = [
    { id: 1, name: 'favorite whiskes', content: ['Laphraoig', 'The Balveine', 'High Coast']}, 
    { id: 2, name: 'groceries', content: ['Apple', 'Pear', 'Milk']},
    { id: 3, name: 'note to self', content: "Clean Kitchen"}
];

app.get('/api/notes', function(req, res) {
    res.send(notes)
});

app.get('/api/notes/:id', function(req, res){
    const note = notes.find(n => n.id === parseInt(req.params.id))
    
    if (!note) res.status(404).send('The note with the given ID was not found')
    res.send(note)
});

app.post('/api/notes', (req, res) => {
    const note = {
        id: notes.length + 1,
        name: req.body.name,
        content: req.body.content
    };

    notes.push(note);
    res.send(note);
});

app.listen(port, () => console.log(`Note app server listening on port ${port}...`))