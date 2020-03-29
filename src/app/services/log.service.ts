import { Injectable } from '@angular/core';
import { Log } from '../models/log';
import { BehaviorSubject,  Observable} from 'rxjs';
import { of } from 'rxjs';
//MACA1-0210
@Injectable({
  providedIn: 'root'
})
export class LogService {

  logs : Log[];

  private logSource = new BehaviorSubject<Log>({id: null, text:null, date: null});
  selectedLog = this.logSource.asObservable();


  private stateSource = new BehaviorSubject<boolean>(true);
  selectedState =  this.stateSource.asObservable();


  constructor() { 
   /* this.logs = [
      {id: '1', text: 'Generated Components', date: new Date('10/20/2019 10:25:20')},
      {id: '2', text: 'Added Bootstrap', date:new Date('10/22/2019 09:25:20')},
      {id: '3', text: 'Added Logs Components', date:new Date('10/25/2019 12:30:50')}
    ];
    */
   this.logs = [];
  }

  getLogs(): Observable<Log[]>{
    if(localStorage.getItem('logs') === null){
      this.logs = [];
    }
    else{
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    return of(this.logs.sort((a,b) => {
      return b.date = a.date;
    })
    );
  }
  setFormLog(log: Log){
    this.logSource.next(log);
  }

  addLog(log: Log){
    //Add new Item at the begining of the array
    this.logs.unshift(log);

    //Add to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(log: Log){
    this.logs.forEach((curr, indx) => {
      if(log.id === curr.id){
        this.logs.splice(indx, 1);
      }

    });
    this.logs.unshift(log);
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  deleteItem(log: Log){
    this.logs.forEach((curr, indx) => {
      if(log.id === curr.id){
        this.logs.splice(indx, 1);
      }
    });
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState(){
    this.stateSource.next(true);
  }

}