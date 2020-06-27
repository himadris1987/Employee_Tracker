var mysql = require ("mysql");
var inquirer = require ("inquirer");
var consoletable = require ("console.table");
// const { allowedNodeEnvironmentFlags } = require("process");

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
                    department: answer.newdep
                }
            );
            var query = "SELECT * FROM Departments";
            connection.query (query, function (err,res){
                if (err) throw err;
                console.log("All Departments" + res);
                console.table(res);
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
                message: "What department does this role fit in?"
            }
        ]).then(function (answer){
            connection.query(
                "INSERT INTO Roles SET ?",
                {
                    title: answer.title,
                    department_id: answer.dept
                }
            );
            var query = "SELECT * FROM Roles, Departments";
            query += "FROM Roles INNER JOIN department";
            connection.query (query, function (err,res){
                if (err) throw err;
                console.log ("All Roles")
                console.table ( res);
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

    function viewEmp(){
        var query = "SELECT * FROM Employee";
        connection.query (query, function (err, res){
        if (err) throw err;
        console.log (res.length + "showing employees");
        console.table ("All Employee:", res);
        runTracker();
    })
}

function viewDep(){
    var query = "SELECT * FROM Departments";
    connection.query (query, function (err, res){
    if (err) throw err;
    console.log (res.length + "showing deparments");
    console.table ("All Departments:", res);
    runTracker();
})
}

function viewRoles(){
    var query = "SELECT * FROM Roles";
    connection.query (query, function (err, res){
    if (err) throw err;
    console.log (res.length + "showing roles");
    console.table ("All Roles:", res);
    runTracker();
})
}

function upEmpRoles(){
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Who's id does this new role belong to?"

        },
        {
            name: "title",
            type: "input",
            message: "What is the new title of this role"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the new salary of this role"
        },
        {
            name: "deparment",
            type:"input",
            message: "What is the new department of this role"
        }
    ]).then(function (answer){
        connection.query (
            "UPDATE Roles SET ? WHERE ?",
            {
                id: answers.id,
                title: answers.title,
                salary: answers.salary,
                department: answers.department,
            }
        );
        var query = "SELECT FROM Roles";
        connection.query (query, function (err, res){
            if (err) throw err;
            console.table ("Updated Roles", res);
            runTracker();
        })

    })
}
}