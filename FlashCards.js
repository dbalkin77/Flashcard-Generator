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
        fs.appendFile('allFlashCards.txt', JSON.stringify(newFlashCard), function (err) {
            if (err) {
                throw err;
            }
        })
        inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirm',
                message: 'Do you want to create another basic flash card',
                default: true
            }
        ]).then(function(data){
            if (data.confirm === true) {
                createBasic ();
            }
            else {
                introduction ();
            }
        })
    });
}

// Close Card Input ==================================================

function createCloze () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'clozeFront',
            message: 'Enter full text for flashcard'
        },
        {
            type: 'input',
            name: 'clozeOmit',
            message: 'Enter words that should be omitted from card for studying purposes'
        },
        {
            type: 'input',
            name: 'partialText',
            message: 'Enter original text without cloze stated in previous prompt'
        }
    ]).then(function(data){
        console.log(data);
        let newClozeCard = new ClozeCard(data.clozeFront, data.clozeOmit, data.partialText);
        console.log(newClozeCard);

        fs.appendFile('allFlashCards.txt', JSON.stringify(newClozeCard), function (err) {
            if (err) {
               throw err;
             }
        })
    });


}

