const fs = require("fs");
const chalk = require("chalk");


const addNote = (myNote, category) => {
    const allnotes = loadNotes(category);
    allnotes.push({reminder: myNote});
    saveNotes(allnotes, category);
    
}

const loadNotes = (category) =>{
    try {
        const dataBuffer = fs.readFileSync(`src/${category}.json`);
        const notesJson  = dataBuffer.toString();
        return JSON.parse(notesJson);
    } catch (error){
        return [];
    }
};

const saveNotes = (allNotes, category) => {
    const notesJson = JSON.stringify(allNotes);
    fs.writeFileSync(`src/${category}.json`, notesJson);
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
