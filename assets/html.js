const fs = require('fs');

const generateCards = (objArray)=>new Promise((resolve, reject)=>{
    if (objArray.length !== 0){
      let cardsArr = [];
      let engOrInt = objArray[0].school ? 'Intern' : 'Engineer'
      for (let obj of objArray){
        let schoolOrGit = obj.school ? `<p>School: ${obj.school}</p>` : `<p><a href="https://github.com/${obj.github}" target="_blank">GitHub</a></p>`
        cardsArr.push(`<div class="card">
        <h2>${engOrInt}</h2>
        <h1>${obj.name}</h1>
        <h3>Employee ID: ${obj.id}</h3>
        <p><a href="mailto:${obj.email}" target="_blank">Email</a></p>
        ${schoolOrGit}
    </div>`)
      }
      resolve(cardsArr);
    } else {
      reject(new Error(err));
    }
  })

function createDocument(info, cards){
  let containers;
  if (cards.length === 1){
    containers = `<div class="container">
    ${cards[0].join('\n')}
  </div>`
  } else {
    containers = `<div class="container">
    ${cards[0].join('\n')}
  </div>
  <div class="container">
    ${cards[1].join('\n')}
  </div>`
  }
  return `<!DOCTYPE html>
  <html>
  <head>
  <title>My Team</title>
  <link rel="stylesheet" href="style.css">
  </head>
  <body>
  <header>
    <h1>My Team</h1>
  </header>
  <div class="container">
    <div class="card">
      <h2>Manager</h2>
      <h1>${info.managerName}</h1>
      <h3>Employee ID: ${info.managerId}</h3>
      <p><a href="mailto:${info.managerEmail}" target="_blank">Email</a></p>
      <p>Office #: ${info.managerOffice}</p>
    </div>
  </div>
  ${containers}
  </body>
  </html>
  `
}

function html(data){
  const parsed = JSON.parse(data);
  const manager = parsed.manager;
  let promises = [];
  if (parsed.interns.length !== 0 && parsed.engineer.length !== 0) {
    promises.push(generateCards(parsed.engineer))
    promises.push(generateCards(parsed.intern))
  } else if (parsed.interns.length === 0) {
    promises.push(generateCards(parsed.engineer))
  } else {
    promises.push(generateCards(parsed.intern))
  }
  Promise.all(promises)
    .then(result => fs.writeFile('./dist/myTeam.html', createDocument(manager, result), err => err ? console.error(err): null));
}

module.exports = html;