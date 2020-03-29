import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/log';
import { LogService } from '../../services/log.service';


@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  id: string;
  text: string;
  date:any;
  isNew: boolean = true;

  constructor(private logService: LogService) { }

  ngOnInit(): void {
    //subsribe to the selected Log Observable
    this.logService.selectedLog.subscribe((log)=>{
      if(log.id !== null){
        this.id = log.id;
        this.text = log.text;
        this.date = log.date; 
        this.isNew = false;
      }
        
    });
  }

  onSubmit(){
    //Check if new Log
    if(this.isNew){
      //Create a new Log
      const newLog = {
        id : this.generateId(),
        text: this.text,
        date : new Date()
      };
      //Add Log usig a function in Our Service
      this.logService.addLog(newLog);

    }else{
      //Create log to be Updated
      const updLog = {
        id: this.id,
        text: this.text,
        date: new Date()
      };
      
      this.logService.updateLog(updLog);
    }
      //Reset State
      this.clearState();
  }
  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  clearState(){
    this.id = '';
    this.text = '';
    this.date = null
    this.isNew = true;

    this.logService.clearState();
  }

  onClearBuuton(){
    this.id = '';
    this.text = '';
    this.date = null
    this.isNew = true;
  }
}
