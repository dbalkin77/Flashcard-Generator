const fs = require('fs');
const inquirer = require('inquirer');
const BasicCard = require("./BasicCard.js");
const ClozeCard = require("./ClozeCard.js");


// Function that promops user to either create a basic note card, a cloze note card, or to study created flash cards
function introduction () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: 'What type of flashcard would like to create?',
            choices: ['Basic Flash Card', 'Cloze Flash Card', 'Study Created Cards']
        }
    ]).then(function(answer){
        if (answer.selection === 'Basic Flash Card') {
            createBasic();
        }
        else if (answer.selection === 'Cloze Flash Card') {
            createCloze();
        }
        else
            studyCards();
    })
}

introduction();

// ====================================================================================


