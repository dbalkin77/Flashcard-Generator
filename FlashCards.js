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

// Basic Card Input ==================================================

function createBasic () {
    inquirer.prompt([
        {
            name: 'basicFront',
            message: 'Insert question for front of flash card'
        },
        {
            name: 'basicBack',
            message: 'Insert answer for back of flash card'
        }
    ]).then(function(data){
        console.log(data);
         let newFlashCard = new BasicCard(data.basicFront, data.basicBack);
        console.log(newFlashCard);
        // Append input to file to be read later
        fs.appendFile('allFlashCards.txt', newFlashCard, function (err) {
            if (err) {
                throw err;
            }
        })
    });
}


