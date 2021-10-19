const Engineer = require('./engineer');
const Intern = require('./intern');
const Manager = require('./manager');

class Team {
  constructor(){
    this.manager = undefined;
    this.engineers = [],
    this.interns = []
  }
  setManager = function(managerObject){
    if (managerObject instanceof Manager){
      (this.manager) = managerObject;
    } else {
      throw new Error('Please make sure it\'s an instance of the Manager class!')
    }
  }
  addEngineer = function(engineer){
    if (engineer instanceof Engineer){
      (this.engineers).push(engineer)
    } else {
      throw new Error('Please make sure it\'s an instance of the Engineer class!')
    }
  }
  addIntern = function(intern){
    if (intern instanceof Intern){
      (this.interns).push(intern)
    } else {
      throw new Error('Please make sure it\'s an instance of the Intern class!')
    }

  }
}

module.exports = Team;