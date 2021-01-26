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
    const allNotes = loadNotes("house").concat(loadNotes("paperwork"),loadNotes("studying"),loadNotes("work"));
    console.log(allNotes)
    allNotes.map((note,i) =>{
        console.log(chalk.red(`${i + 1}. ${note.reminder}\n`));
    });
};


const removeNote = (noteToDelete, category) => {
    const allNotes = loadNotes(`${category}`);


    try {
        const newNotes = allNotes.filter(note =>  note.reminder != noteToDelete);
        console.log(`Succesfully removed ${noteToDelete}`)
        saveNotes(newNotes, category);

    } catch (error) {
        console.log("Number out of range, probably.")
    }

}
module.exports = {
    addNote,
    listNotes,
    removeNote,
    loadNotes,
}
