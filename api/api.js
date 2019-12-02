var express = require("express");
var fs = require("fs");
var bodyParser = require('body-parser');

var cors = require('cors');
const app = express()
const port = 3000

app.use(cors());
app.use(bodyParser.json());

var employees = [];

function loadDatabase() {
    try {
        const employeeData = fs.readFileSync("employees.json", "utf8");
        employees = JSON.parse(employeeData);
    }
    catch (err) {
    }
}

function getEmployee(id) {
    for (employee of employees) {
        if (employee.id == id) {
            return employee;
        }
    }

    return null;
}

function updateDatabaseFile() {
    fs.writeFileSync("employees.json", JSON.stringify(employees));
}

function addEmployee(employee, id = null) {
    employee['id'] = id || employees.length + 1;
    employees.push(employee);
    console.log(employee); updateDatabaseFile();
}

function _removeEmployee(employeeId) {
    for (const [index, employee] of employees.entries()) {
        if (employee.id == employeeId) {
            employees.splice(index, 1);
        }
    }

    return null;
}

function removeEmployee(employeeId) {
    _removeEmployee(employeeId);
    updateDatabaseFile();
}

function updateEmployee(employee) {
    _removeEmployee(employee.id);
    addEmployee(employee, employee.id);
}

function validEmployee(employee) {
    if (!("firstname" in employee)) {
        return false;
    }
    else if (!("lastname" in employee)) {
        return false;
    }
    else if (!("address" in employee)) {
        return false;
    }
    else if (!("basesalary" in employee)) {
        return false;
    }
    else if (!("city" in employee)) {
        return false;
    }
    else if (!("country" in employee)) {
        return false;
    }
    else if (!("email" in employee)) {
        return false;
    }
    else if (!("postalcode" in employee)) {
        return false;
    }
    else {
        return true;
    }
}

loadDatabase();

app.get('/api/employees', (req, res) => {
    res.json(employees);
})

app.get('/api/employees/:id', (req, res) => {
    const id = req.params.id;
    const employee = getEmployee(id);

    if (employee == null) {
        res.json({ response: "Employee ID does not exist" });
    }
    else {
        res.json(employee);
    }

})

app.post('/api/employees', (req, res) => {
    const newEmployee = req.body;
    if (validEmployee(newEmployee)) {
        addEmployee(newEmployee);

        res.json({ response: "Success" });
    }
    else {
        res.send("Invalid Employee!");

    }
})

app.put('/api/employees/:id', (req, res) => {
    const updatedEmployee = req.body;
    if (getEmployee(parseInt(req.params.id)) != null) {
        updatedEmployee['id'] = parseInt(req.params.id);
        updateEmployee(updatedEmployee);

        res.json({ response: "Success" });
    }
    else {
        res.send("Invalid Employee!");
    }
})

app.delete('/api/employees/:id', (req, res) => {
    const employeeId = req.params.id;

    if (getEmployee(employeeId) != null) {
        removeEmployee(employeeId);

        res.json({ response: "Success" });
    }
    else {
        res.send("Employee does not exist!");
    }

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))