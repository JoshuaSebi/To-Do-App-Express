const express = require('express');
const app = express();
const port = 4040;



app.use(express.static('public'));

app.listen(port, ()=>{
    console.log(`App listening to http://localhost:${port}`);
});