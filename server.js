const express = require('express');
const app = express();
const port = 4040;
app.set("view engine", "ejs");
const database = require('./views/database.js');

app.set("views", "./views");
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res)=>{
    res.render('index');
})

app.get('/notes', (req,res)=> {
    res.render('notes',{
        theTitle: "My Notes",
        notes: database.getNotes()
    });
})

app.get('/new', (req,res)=>{
    res.render('createNote');
});


app.post('/new', (req,res)=>{
    const title = req.body.title;
    const content = req.body.content;
    database.addNote(title,content);
    res.redirect('/notes');
});

app.get('/notes/:id', (req,res)=>{
    const id = +req.params.id;
    const note = database.getNotes().find(n => n.id == id);
    res.render('note-detail', {
        note: note
    });
});

app.use(express.static('public'));

app.listen(port, ()=>{
    console.log(`App listening to http://localhost:${port}`);
});