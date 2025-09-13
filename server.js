const express = require('express');
const app = express();
const port = 4040;
app.set("view engine", "ejs");
const database = require('./views/database.js');

app.set("views", "./views");
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//render home page
app.get('/', (req, res)=>{
    res.render('index');
})


//Render create note page
app.get('/new', (req,res)=>{
    res.render('createNote');
});

//Handle new note creation
app.post('/new', (req,res)=>{
    const title = req.body.title;
    const content = req.body.content;
    database.addNote(title,content);
    res.redirect('/notes');
});

//Handle note deletion
app.post('/notes/:id/delete', (req,res)=>{
    const id = +req.params.id;
    database.deleteNote(id);
    res.redirect('/notes');
});

//Render each note page
app.get('/notes/:id', (req,res)=>{
    const id = +req.params.id;
    const note = database.getNote(id);
    if (!note) {
        // if no note found, show error page or message
        return res.status(404).send("Note not found");
    }
    res.render('note-detail', {
        note: note
    });
});

//Search notes
app.get('/notes', (req,res)=>{
    const query = req.query.searchTerm;
    const results = database.getNotes(query);
    res.render('notes.ejs', {
        theTitle: query ? `Search results for "${query}"` : "All Notes",
        notes: results
    });
});


app.use(express.static('public'));

app.listen(port, ()=>{
    console.log(`App listening to http://localhost:${port}`);
});