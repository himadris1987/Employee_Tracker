var mysql = require ("mysql");
var inquirer = require ("inquirer");
var console =
const { allowedNodeEnvironmentFlags } = require("process");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Ringosocks1!",
    database: "employeeDB"
});

connection.connect (function (err){
    if (err) throw err;
    runTracker();
});

function runTracker(){
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "Add departments",
            "Add roles",
            "Add employees",
            "View departments",
            "View roles",
            "View employees",
            "Upadte employee roles",
            "Delete deparments",
            "Delete roles",
            "Delete Employees"
        ]
    }).then (function (answer){
        switch (answer.action){
            case "Add departments":
                addDep();
                break;
            case "Add roles":
                addRoles();
                break;
            case "Add employees":
                addEmp();
                break;
            case "View departments":
                viewDep();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "View Employees":
                viewEmp();
                break;
            case "Update employee roles":
                upEmpRoles();
                break;
            case "Delete departments":
                deleteDep();
                break;
            case "Delete roles":
                deleteRoles();
                break;
            case "Delete employees":
                deleteEmp();
                break;
        }
    });
    function addDep(){
        inquirer.prompt ([
            {
                name: "newdep",
                type: "input",
                message : "What deparment would you like to add?"
            }
        ]).then(function (answer){
            connection.query(
                "INSERT INTO Departments SET ?",
                {
                    department: answer.newdept
                }
            );
            var query = "SELECT * FROM Departments";
            connection.query (query, function (err,res){
                if (err) throw err;
                console.table ("All Departments", res);
                runTracker();
            })
        })
    }

    function addRoles(){
        inquirer.prompt ([
            {
                name: "title",
                type: "input",
                message : "What role would you like to add?"
            },
                {name: "dept",
                type: "input",
                message: "What depeartment does this role fit in?"
            }
        ]).then(function (answer){
            connection.query(
                "INSERT INTO Roles SET ?",
                {
                    title: answer.title,
                    department_id: answer.dept
                }
            );
            var query = "SELECT * FROM Roles";
            connection.query (query, function (err,res){
                if (err) throw err;
                console.table ("All Roles", res);
                runTracker();
            })
        })
    }

    function addEmp(){
        inquirer.prompt ([
            {
                name: "first_name",
                type: "input",
                message: "Please enter Employee's first name"
            },
            {
                name: "last_name",
                type: "input",
                message: "Please enter Employee's last name"
            },
            {
                name: "middle_initial",
                type: "input",
                message: "Please enter Employee's middle initial"
            },
            {
                name: "id",
                type: "list",
                message: "What is this Employee's id?"
            }
                

        ]).then(function (answer){
            
            connection.query(
                "INSERT INTO Employee SET ?",
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    middle_initial: answer.middle_initial,
                    id: answer.id

                }
            );
            var query = "SELECT * FROM Employee";
            connection.query (query, function (err,res){
                if (err) throw err;
                console.table ("All Employee", res);
                runTracker();
            })
        })
    }

