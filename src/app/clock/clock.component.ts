import { Component, OnInit } from '@angular/core';
import { DatePipeComponent } from '../shared/date.pipe';
import { Observable } from 'rxjs/Rx';
import { UsersService, xUser, TS } from '../shared/users.service';
//import { UserService } from '../ServicesAPI/User.Service';
var moment = require('moment');
require('moment-precise-range-plugin');


@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styles: []
})


export class ClockComponent {
  
  today 
  Wawa = setInterval(()=> this.today = new Date, 1000) //'2017-08-31 01:00 PM'
  xDuration
  xd
  user: string = localStorage.getItem('currentUser')
  
  _shiftStart: boolean = true
  lastUpdated
  timerInterval
  
  constructor(private usersService: UsersService) {
    this.lastUpdated = new Date()
  }

  TogggleShift() {
  this._shiftStart = !this._shiftStart
  if (!this._shiftStart) {
    //start shift
    this.usersService.timeSheet.push(new TS(localStorage.getItem('currentUser'), new Date, new Date, "Open", ""))
    let xRow = OpenShift(this.usersService.timeSheet, 'Khaled Jamal')
    this.xDuration = "Less than a minute"
    this.timerInterval = setInterval(()=>this.xDuration = Timer(this.usersService.timeSheet[xRow].timein), 1000)
    
  
  } else {
    //end shift
    let x = updateTime(this.usersService.timeSheet, 'Khaled Jamal')

    clearInterval(this.timerInterval)
  }
  }

ngOnInit() {

  this.today = new Date
  // retrieve timesheet to check if the user is online
  
  if (this.usersService.timeSheet) {
    console.log("Hello1")
  } else {
    console.log("Hello2")
    this.usersService.timeSheet = this.usersService.getTimesheets()
  }

  

  // rettrieve if user is online
  if (isUserOnline(this.usersService.timeSheet, "Khaled Jamal")) {
    this._shiftStart = !this._shiftStart
    let xRow = OpenShift(this.usersService.timeSheet, 'Khaled Jamal')
    this.xDuration = Timer(this.usersService.timeSheet[xRow].timein)
    this.timerInterval = setInterval(()=>this.xDuration = Timer(this.usersService.timeSheet[xRow].timein), 1000)
    }
  }

  ngOnDestroy(){
    console.log("I'm goner!")
    clearInterval(this.timerInterval)
  }
}

function Calc(y, x) {
  return moment.utc(moment(x, "DD/MM/YYYY HH:mm:ss").diff(moment(y, "DD/MM/YYYY HH:mm"))).format("HH:mm")
}


function updateTime(array, x) {
  for (var i in array) {
    if (array[i].username == x && array[i].timeout == "Open") {
      array[i].timeout = new Date
      return i
      //break;
    }
  }
}


function Timer(timein) {
  if (moment.preciseDiff(moment(timein).format("LLL"), moment().format("LLL"))=="") {
    return "Less than a minute"
  } else{
  return moment.preciseDiff(moment(timein).format("LLL"), moment().format("LLL"))
  }
}


function isUserOnline(array, username): boolean {
  for (var i in array) {
   
    if (array[i].username == username && array[i].timeout == "Open") {
      return true
    }
  }
}

function OpenShift(array, username) {
  for (var i in array) {
    if (array[i].username == username && array[i].timeout == "Open") {
      return i
    }
  }
}





    //private timeSheet: Array<xUser> = []
    //setInterval(() => this.xDuration = Timer(this.today), 1000)
    //this.xDuration = setInterval(() => console.log(this.xDuration = Timer(this.today)), 1000)
    //setInterval(() => console.log(this.xDuration = this.wow()), 1000)
    // @Team - this creates a new timeSheet instance. Throw it into the DB.
