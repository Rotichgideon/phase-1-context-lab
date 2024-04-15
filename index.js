function createEmployeeRecord ([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords (employeeData) {
    return employeeData.map(createEmployeeRecord);
}

function createTimeInEvent (dateStamp) {
    const [date, time] = dateStamp.split(" ");
    const hour = parseInt(time, 10);

    this.timeInEvents.push ({
        type: "TimeIn",
        date,
        hour,
    });

    return this;
}

function createTimeOutEvent (dateStamp) {
    const [date, time] = dateStamp.split(" ");
    const hour = parseInt(time, 10);

    this.timeOutEvents.push ({
        type: "TimeOut",
        date,
        hour,
    });

    return this;
}

function hoursWorkedOnDate (date) {
    const timeIn = this.timeInEvents.find((e) => e.date === date);
    const timeOut = this.timeOutEvents.find((e) => e.date === date);

    if (timeIn && timeOut) {
        const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
        return hoursWorked;
    }

    return 0;
}

function wagesEarnedOnDate (date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    const wagesEarned = hoursWorked * this.payPerHour;

    return wagesEarned;
}

function findEmployeeByFirstName(EmployeesNames, firstName) {
    return EmployeesNames.find(employeeRecord => employeeRecord.firstName === firstName);
}

function calculatePayroll (employees) {
    const payroll = employees.map(employee => allWagesFor.call(employee))
    return payroll.reduce((totalPayroll, employeeData) => {
        return totalPayroll + employeeData
    }, 0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}