const express = require('express');
const cors = require('cors');
const app = express();

/*
    TODO:
    * fix schema validation (perhaps using joi)
    * backup notes object to class
    * refactoring/ make notes a proper class
*/

app.use(express.json());
app.use(cors());

const port = 3001;
const url = '/api/notes'

const notes = [
    { id: 1, name: 'favorite whiskes', content: ['Laphraoig', 'The Balveine', 'High Coast']}, 
    { id: 2, name: 'groceries', content: ['Apple', 'Pear', 'Milk']},
    { id: 3, name: 'note to self', content: "Clean Kitchen"}
];

app.get(url, function(req, res) {
    res.send(notes)
});

app.get(url + '/:id', function(req, res){
    const note = notes.find(n => n.id === parseInt(req.params.id))
    
    if (!note) return res.status(404).send('The note with the given ID was not found')    

    res.send(note)
});

app.post(url, (req, res) => {
    const name = req.body.name;
    const content = req.body.content;

    if(!name || name.length < 3) {
        return res.status(400).send('Name is requiered and should be minum 3 characters')
    }

    const note = {
        id: notes.length + 1,
        name: req.body.name,
        content: !content ? '' : content 
    };

    notes.push(note);
    res.send(note);
});

app.put(url + '/:id', (req, res) => {
    const note = notes.find(n => n.id === parseInt(req.params.id))
    const name = req.body.name;
    const content = req.body.content;
    
    if (!note) return res.status(404).send('The note with the given ID was not found')

    if(name) {
        note.name = name;
    }
    if(content) {
        note.content = content
    }
    
    res.send(note)
});

app.delete(url + '/:id', (req, res) => {
    const note = notes.find(n => n.id === parseInt(req.params.id))
    if (!note) return res.status(404).send('The note with the given ID was not found')

    const index = notes.indexOf(note);
    notes.splice(index, 1);

    res.send(note)
})

app.listen(port, () => console.log(`Note app server listening on port ${port}...`))