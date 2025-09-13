const notes = [
    {id: 1, title: "Note 1", content: "This is note 1"},
    {id: 2, title: "Note 2", content: "This is note 2"},
    {id: 3, title: "Note 3", content: "This is note 3"},
];

const getNotes = () => {
    return notes;
}

const getNote = (id) => {
    return notes.find(n => n.id == id);
}

const addNote = (title, content) => {
    const newNote = {
        id: notes.length + 1,
        title: title,
        content: content
    };
    notes.push(newNote);
}

const deleteNote = (id) => {
    const index = notes.findIndex(i => i.id == id)
    if (index !== -1){
        notes.splice(index,1);
        return true;
    }
}

module.exports = {
    getNotes,
    getNote,
    addNote,
    deleteNote
};
