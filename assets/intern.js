class Intern {
    constructor(name, id, email, github){
      if (!name || !id || !email || !github){
        throw new Error('Please enter all information for this Engineer!')
      } else {
        this.name = name;
        this.id = id;
        this.email = email;
        this.github = github;
        this.role = 'Engineer'
      }
    }
    role(){
      return this.role;
    }
    id(){
      return this.id;
    }
    email(){
      return this.email;
    }
    github(){
      return this.github;
    }
  }