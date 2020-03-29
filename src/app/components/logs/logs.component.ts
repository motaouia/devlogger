import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/log';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  logs : Log[];
  selectedLog : Log;
  loaded:boolean = false;

  constructor(private logService: LogService) { }

  ngOnInit(): void {

    this.logService.selectedState.subscribe(clear => {
      if(clear){
        console.log("!!!!=====!!!");
        this.selectedLog = {
          id : '',
          text: '',
          date: ''
        };
      }
    });
    this.logService.getLogs().subscribe((logs) => {
        this.logs = logs;
        this.loaded = true;
    });
    
  }

  pickLog(log: Log){
    this.logService.setFormLog(log);
    
    this.selectedLog = log;
    console.log('Seeelected Loooog');
    console.log(this.selectedLog);
  }
  onDelete(log:Log){
    if(confirm('Do you want really to delete this Item?')){
      this.logService.deleteItem(log);
    }
    
  }

}
