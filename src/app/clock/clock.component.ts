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
   some = true;
  some2 = true;
  username = localStorage.getItem('currentUser')
  today 
  Wawa = setInterval(()=> this.today = new Date, 1000) //'2017-08-31 01:00 PM'
  xDuration
  xd
  user = this.usersService.getUsers().filter(res => res.name == localStorage.getItem('currentUser'))[0].firstname
  selectedValue: any

  _shiftStart= true
  lastUpdated
  timerInterval
  
  constructor(private usersService: UsersService) {
    this.lastUpdated = new Date()
  }

  TogggleShift() {
    
  this._shiftStart = !this._shiftStart
  if (!this._shiftStart) {
    //start shift
    this.usersService.timeSheet.push(new TS(this.username, new Date, new Date, "", ""))
    let xRow = OpenShift(this.usersService.timeSheet, this.username)
    this.xDuration = "less than a minute"
    this.timerInterval = setInterval(()=>this.xDuration = Timer(this.usersService.timeSheet[xRow].timein), 1000)
    
  
  } else {
    //end shift
    let source = this.usersService.timeSheet
    for (var i in source) {
      if (source[i].username == this.username && source[i].timeout == "") {
        source[i].timeout = new Date
        source[i].total = TotalDuration(source[i].timein, source[i].timeout )
      }
    }
    clearInterval(this.timerInterval)
  }
  }

ngOnInit() {

  // localStorage.clear()
  // localStorage.setItem('currentUser', 'Khaled Jamal')
  this.today = new Date
  // retrieve timesheet to check if the user is online

  if (this.usersService.timeSheet.length == 0) {
     this.usersService.timeSheet = this.usersService.getTimesheets()
  }

  

  // rettrieve if user is online
  if (isUserOnline(this.usersService.timeSheet, localStorage.getItem('currentUser'))) {
    this._shiftStart = !this._shiftStart
    let xRow = OpenShift(this.usersService.timeSheet, localStorage.getItem('currentUser'))
    this.xDuration = Timer(this.usersService.timeSheet[xRow].timein)
    this.timerInterval = setInterval(()=>this.xDuration = Timer(this.usersService.timeSheet[xRow].timein), 1000)
    }
  }

  ngOnDestroy(){
    console.log("I'm goner!")
    clearInterval(this.timerInterval)
  }

   setStyle2() {
  let styles = {
   'width.px': this.some ? '0' : '300',
  };
return styles;
}

toggle() {
   this.some =!this.some;
 }




}

function Calc(y, x) {
  return moment.utc(moment(x, "DD/MM/YYYY HH:mm:ss").diff(moment(y, "DD/MM/YYYY HH:mm"))).format("HH:mm")
}


function Timer(timein) {
  if (moment.preciseDiff(moment(timein).format("LLL"), moment().format("LLL"))=="") {
    return "less than a minute"
  } else{
  return moment.preciseDiff(moment(timein).format("LLL"), moment().format("LLL"))
  }
}


function isUserOnline(array, username): boolean {
  for (var i in array) {
    if (array[i].username == username && array[i].timeout == "") {
      return true
    }
  }
}

function OpenShift(array, username) {
  for (var i in array) {
    if (array[i].username == username && array[i].timeout == "") {
      console.log("yes")
      return i
    }
  }
}


function TotalDuration(timein, timeout) {
  return moment.preciseDiff(moment(timein).format('LLLL'), moment(timeout).format('LLLL'))
}



    //private timeSheet: Array<xUser> = []
    //setInterval(() => this.xDuration = Timer(this.today), 1000)
    //this.xDuration = setInterval(() => console.log(this.xDuration = Timer(this.today)), 1000)
    //setInterval(() => console.log(this.xDuration = this.wow()), 1000)
    // @Team - this creates a new timeSheet instance. Throw it into the DB.
