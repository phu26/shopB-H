import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoadingProcessesService } from '../loading-processes.service';
import { MatBottomSheet } from '@angular/material';
import { LoadingProcessesExpandComponent } from './loading-processes-expand/loading-processes-expand.component';

@Component({
  selector: 'app-loading-processes',
  templateUrl: './loading-processes.component.html',
  styleUrls: ['./loading-processes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoadingProcessesComponent implements OnInit {

  processList: LoadingProcessObj[] = [];
  constructor(private loadingProcess: LoadingProcessesService,private _bottomSheet: MatBottomSheet ) { }

  ngOnInit() {
    this.loadingProcess.getProcesses().subscribe(processList=>{
      this.processList = processList;
    }
    );


  }
  expandProcess(){
    let a =  this._bottomSheet.open(LoadingProcessesExpandComponent);
    a.instance.processList = this.processList;
  }

}

export class LoadingProcessObj{
  processId: number = null;
  processName: string ="";
  completedValue: number = 0;
  dotTuyenSinhId: number = null;
  /**
   *
   */
  constructor(LoadingProcessObj?) {
    LoadingProcessObj = LoadingProcessObj || {};
    this.processId = LoadingProcessObj.processId || 0;
    this.processName = LoadingProcessObj.processName || "";
    this.completedValue = LoadingProcessObj.completedValue || 0;
    this.dotTuyenSinhId = LoadingProcessObj.dotTuyenSinhId || null;
  }
}