import { Component, OnInit } from '@angular/core';
import { LoadingProcessObj } from '../loading-processes.component';
import { LoadingProcessesService } from '../../loading-processes.service';

@Component({
  selector: 'app-loading-processes-expand',
  templateUrl: './loading-processes-expand.component.html',
  styleUrls: ['./loading-processes-expand.component.scss']
})
export class LoadingProcessesExpandComponent implements OnInit {

  processList: LoadingProcessObj[] = [];
  constructor(private loadingProcess: LoadingProcessesService ) { }

  ngOnInit() {
    this.loadingProcess.getProcesses().subscribe(processList=>{
      this.processList = processList;
    }
    );


  }

}
