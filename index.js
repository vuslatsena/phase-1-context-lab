let createEmployeeRecord = function(employee) {
    return {
      firstName: employee[0],
      familyName: employee[1],
      title: employee[2],
      payPerHour: employee[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  }
  
  let createEmployeeRecords = function(employees) {
    return employees.map(function(employee) {
      return createEmployeeRecord(employee)
    })
  }
  
  let createTimeInEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
  
    this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    })
  
    return this
  }
  
  let createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
  
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    })
  
    return this
  }
  
  let hoursWorkedOnDate = function(date) {
    let inEvent = this.timeInEvents.find(function(e){
      return e.date === date
    })
  
    let outEvent = this.timeOutEvents.find(function(e){
      return e.date === date
    })
  
    return (outEvent.hour - inEvent.hour) / 100
  }
  
  let wagesEarnedOnDate = function(date) {
    let rawWage = hoursWorkedOnDate.call(this, date) * this.payPerHour
    return parseFloat(rawWage.toString())
  }
  
  let allWagesFor = function() {
    let eligibleDates = this.timeInEvents.map(function(e){
      return e.date
    })
  
    let payable = eligibleDates.reduce(function(memo, d){
      return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)
  
    return payable
  }
  
  let findEmployeeByFirstName = function(employees, firstName) {
    return employees.find(function(employee) {
      return employee.firstName === firstName
    })
  }
  
  let calculatePayroll = function(employees) {
    return employees.reduce(function(memo, employee){
      return memo + allWagesFor.call(employee)
    }, 0)
  }
  