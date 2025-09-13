const express = require('express');
const app = express();
const port = 4040;
app.set("view engine", "ejs");

app.set("views", "./views");

app.get('/', (req, res)=>{
    res.render('index');
})

app.get('/notes', (req,res)=> {
    res.render('notes',{
        theTitle: "My Notes",
        notes: notes
    });
})

app.get('/notes/:id', (req,res)=>{
    const id = +req.params.id;
    const note = notes.find(n => n.id == id);
    res.render('note-detail', {
        note: note
    });
});

const notes = [
    {id: 1, title: "Note 1", content: "This is note 1"},
    {id: 2, title: "Note 2", content: "This is note 2"},
    {id: 3, title: "Note 3", content: "This is note 3"},
];

app.use(express.static('public'));

app.listen(port, ()=>{
    console.log(`App listening to http://localhost:${port}`);
});