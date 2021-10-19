class Manager {
    constructor(name, id, email, github){
      if (!name || !id || !email || !github){
        throw new Error('Please enter all information for this employee!')
      } else {
        this.name = name;
        this.id = id;
        this.email = email;
        this.github = github;
        this.role = 'Manager'
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