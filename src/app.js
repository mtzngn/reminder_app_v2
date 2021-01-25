const figlet = require('figlet');
var inquirer = require('inquirer');
const { addNote, removeNote, listNotes } = require('../utils/notes');

const topLevelQuestion = [
    { type: "list",
    name: "options",
    message: "what would you like to do?",
    choices: ["add", "list", "remove", "exit"]}
]

const addQuestion = [
    {type: "input", name:"add", message:"what would you like to add?"}
]
const removeQuestion = [
    {type: "input", name:"remove", message:"what would you like to remove?"}
]

const main = () => {
    console.log(figlet.textSync("Reminder App v2"));
    app()
}
const app = async() => {
    const answers = await inquirer.prompt(topLevelQuestion)
    if (answers.options == "add") {
        const answer = await inquirer.prompt(addQuestion)
        addNote(answer.add)
        console.log("Adding a note...")
        app();
    } else if (answers.options == "list") {
        listNotes()
        console.log("listing notes...")
        app();
    } else if (answers.options == "remove") {
        const answer = await inquirer.prompt(removeQuestion)
        removeNote(answer.remove)
        console.log("removing a note...")
        app();
    } else if (answers.options == "exit") {
        console.log("Exiting...")
    } else {console.log("Invlaid command...")}

}
main()