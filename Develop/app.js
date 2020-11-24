const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");




let employees = []

const next = () => {
  inquirer.prompt({
    type: 'list',
    name: 'choice',
    message: 'What would you like to do now?',
    choices: ['Enter another team member', 'Finish']
  })
    .then(({ choice }) => {
      switch (choice) {
        case 'Enter another team member':
          addEmployee()
          break
        case 'Finish':
          fs.writeFile(path.join(__dirname, 'output', 'team.html'), render(employees), err => {
            if (err) { console.log(err) }
          })
          break
      }
    })
    .catch(err => console.log(err))
}

const makeManager = ({ name, id, email }) => {
  inquirer.prompt([
    {
      type: 'number',
      name: 'officeNumber',
      message: 'What is the managers office Number?'
    }
  ])
    .then(({ officeNumber }) => {
      employees.push(new Manager(name, id, email, officeNumber))
      next()
    })
    .catch(err => console.log(err))
}

const makeEngineer = ({ name, id, email }) => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'github',
      message: 'What is the engineers github?'
    }
  ])
    .then(({ github }) => {
      employees.push(new Engineer(name, id, email, github))
      next()
    })
    .catch(err => console.log(err))
}
const makeIntern = ({ name, id, email }) => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'school',
      message: 'What is the interns school?'
    }
  ])
    .then(({ school }) => {
      employees.push(new Intern(name, id, email, school))
      next()
    })
    .catch(err => console.log(err))
}

const addEmployee = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message: 'What tpye of employee profile',
      choices: ['Manager', 'Engineer', 'Intern']
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the employee?'
    },
    {
      type: 'number',
      name: 'id',
      message: 'What is the employees ID?'
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is the employees email?'
    }
  ])
    .then(employee => {
      switch (employee.type) {
        case 'employee':
          employees.push(new Employee(employee.name, employee.id, employee.email))
          next()
          break
        case 'Manager':
          makeManager(employee)
          break
        case 'Engineer':
          makeEngineer(employee)
          break
        case 'Intern':
          makeIntern(employee)
          break
      }
    })
    .catch(err => console.log(err))
}

addEmployee()










// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
