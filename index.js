// Your code here
// Create an employee record
function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  // Create employee records from an array of arrays
  function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord);
  }
  
  // Create a timeIn event for an employee
  function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employee.timeInEvents.push({
      type: 'TimeIn',
      date: date,
      hour: parseInt(hour, 10),
    });
    return employee;
  }
  
  // Create a timeOut event for an employee
  function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    employee.timeOutEvents.push({
      type: 'TimeOut',
      date: date,
      hour: parseInt(hour, 10),
    });
    return employee;
  }
  
  // Calculate the hours worked on a specific date for an employee
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  // Calculate wages earned on a specific date for an employee
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  // Calculate all wages for an employee
  function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(event => event.date);
    const totalWages = dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
  }
  
  // Calculate payroll for an array of employees
  function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
  }
  
  // Sample data
  const employeesData = [
    ['Grace', 'Hopper', 'programmer', 15],
    ['Ada', 'Lovelace', 'mathematician', 20],
  ];
  
  const employees = createEmployeeRecords(employeesData);
  
  createTimeInEvent(employees[0], '2018-01-01 900');
  createTimeOutEvent(employees[0], '2018-01-01 1700');
  createTimeInEvent(employees[1], '2018-01-01 1000');
  createTimeOutEvent(employees[1], '2018-01-01 1800');
  
  console.log(allWagesFor(employees[0])); // Output: 120
  console.log(allWagesFor(employees[1])); // Output: 160
  console.log(calculatePayroll(employees)); // Output: 280
  
