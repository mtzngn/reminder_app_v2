const figlet = require('figlet');
var inquirer = require('inquirer');
const { addNote, removeNote, listNotes, loadNotes } = require('../utils/notes');
const chalk = require("chalk");

const topLevelQuestion = [
    { type: "list",
    name: "options",
    message: "what would you like to do?",
    choices: ["add", "list", "remove", "exit"]}
]
const categoryQuestion = [
    { type: "list",
    name: "options",
    message: "what would you like to do?",
    choices: ["work", "house", "studying", "paperwork"]}
]
const addQuestion = [
    {type: "input", name:"add", message:"what would you like to add?"}
]

const removeCategory = [
    { type: "list",
    name: "options",
    message: "from which category?",
    choices: ["work", "house", "studying", "paperwork"]}
]

const main = () => {
    console.log(chalk.green(figlet.textSync("Reminder App v2", {font:'big'})));
    app()
}
const app = async() => {
    const answers = await inquirer.prompt(topLevelQuestion)
    if (answers.options == "add") {
        const category = await inquirer.prompt(categoryQuestion)
        const answer = await inquirer.prompt(addQuestion)
        addNote(answer.add, category.options)
        console.log("Adding a note...")
        app();
    } else if (answers.options == "list") {
        listNotes()
        console.log("listing notes...")
        app();
    } else if (answers.options == "remove") {
        const answerCategory = await inquirer.prompt(removeCategory)

        const whatToRemove = loadNotes(answerCategory.options).map((category)=>{return category.reminder})
        const removeQuestion = [
            { type: "list",
            name: "options",
            message: "which note would you like to remove",
            choices: whatToRemove}
        ]

        const answer = await inquirer.prompt(removeQuestion)
        removeNote(answer.options, answerCategory.options)

        console.log("removing a note...")
        app();
    } else if (answers.options == "exit") {
        console.log("see you later...")
    } else {console.log("Invlaid command...")}

}
main()