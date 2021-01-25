const fs = require("fs");
const chalk = require("chalk");


const addNote = myNote => {
    const allnotes = loadNotes();
    allnotes.push({reminder: myNote});
    saveNotes(allnotes);
    
}

const loadNotes = () =>{
    try {
        const dataBuffer = fs.readFileSync("src/notes.json");
        const notesJson  = dataBuffer.toString();
        return JSON.parse(notesJson);
    } catch (error){
        return [];
    }
};

const saveNotes = allNotes => {
    const notesJson = JSON.stringify(allNotes);
    fs.writeFileSync("src/notes.json", notesJson);
}

const listNotes = () => {
    const allNotes = loadNotes();
    allNotes.map((note,i) =>{
        console.log(chalk.red(`${i + 1}. ${note.reminder}\n`));
    });
};

const removeNote = noteToDelete => {
    const allNotes = loadNotes();

    try {
        const removedItem = allNotes.splice(noteToDelete - 1, 1);
        console.log(`Succesfully removed ${removedItem[0].reminder}`)
    } catch (error) {
        console.log("Number out of range, probably.")
    }
    saveNotes(allNotes);
}
module.exports = {
    addNote,
    listNotes,
    removeNote,
}
