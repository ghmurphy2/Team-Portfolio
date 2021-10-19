// create three different prompts
// create a card template for each of the worker type
// place cards into template html with function

const fs = require('fs');
const inquirer = require('inquirer');
const genHTML = require('./genHTML')
const Team = require('./lib/team');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern')
const Manager = require('./lib/manager')

const managerQuestions = [
  {
    name: 'managerName',
    type: 'input',
    message: 'What is the manager\'s name?',
    required: 'true'
  },
  {
    name: 'managerId',
    type: 'input',
    message: 'What is the manager\'s employee ID?',
    required: 'true'
  },
  {
    name: 'managerEmail',
    type: 'input',
    message: 'What is the manager\'s email address?',
    required: 'true'
  },
  {
    name: 'managerOffice',
    type: 'input',
    message: 'What is the manager\'s office number?',
    required: 'true'
  },
]

const nextChoice = [
  {
    name: 'nextChoice',
    type: 'list',
    choices: ['Engineer', 'Intern', 'I\'m done!'],
    message: 'What type of employee do you want to add?',
    required: 'true'
  }
]

const engineerQuestions = [
  {
    name: 'name',
    type: 'input',
    message: 'What is the engineer\'s name?',
    required: 'true'
  },
  {
    name: 'id',
    type: 'input',
    message: 'What is the engineer\'s employee ID?',
    required: 'true'
  },
  {
    name: 'email',
    type: 'input',
    message: 'What is the engineer\'s email address?',
    required: 'true'
  },
  {
    name: 'github',
    type: 'input',
    message: 'What is the engineer\'s GitHub username?',
    required: 'true'
  },
]

const internQuestions = [
  {
    name: 'name',
    type: 'input',
    message: 'What is the intern\'s name?',
    required: 'true'
  },
  {
    name: 'id',
    type: 'input',
    message: 'What is the intern\'s employee ID?',
    required: 'true'
  },
  {
    name: 'email',
    type: 'input',
    message: 'What is the intern\'s email address?',
    required: 'true'
  },
  {
    name: 'school',
    type: 'input',
    message: 'What is the intern\'s school?',
    required: 'true'
  },
]

const myTeam = new Team()

function genHTML(data){
  genHTML(data);
}

function otherPrompts(choice) {
  if (choice === 'Engineer') {
    inquirer.prompt(engineerQuestions)
      .then(result => {
        let engineer = new Engineer(result.name, result.id, result.email, result.github)
        myTeam.addEngineer(engineer)
        choices()
      })
  } else if (choice === 'Intern'){
    inquirer.prompt(internQuestions)
      .then(result => {
        let intern = new Intern(result.name, result.id, result.email, result.school)
        myTeam.addIntern(intern)
        choices()
      })
  } else {
    console.log('Done! Generating HTML')
    createHTML(JSON.stringify(myTeam));
  }
};

const choices = _=> {
  inquirer.prompt(nextChoice)
    .then(choiceObj => {return choiceObj.nextChoice})
    .then(choice => otherPrompts(choice))
};

function init(){
  inquirer.prompt(managerQuestions)
  .then(response => {
    const newMan = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerOffice)
    myTeam.setManager(newMan)
    choices();
  })
  .catch(err=> {throw new Error(err)})
};

init()