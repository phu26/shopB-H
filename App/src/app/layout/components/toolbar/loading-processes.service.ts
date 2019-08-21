import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoadingProcessObj } from './loading-processes/loading-processes.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingProcessesService {

  public processList: LoadingProcessObj[] = [];
  private subject = new Subject<LoadingProcessObj[]>();

  constructor() { }
  public getProcesses() {
    return this.subject.asObservable();
  }
  public addProcess(process: LoadingProcessObj) {
    this.processList.push(process);
    this.subject.next(this.processList);
  }
  public clearProcess(process: LoadingProcessObj) {
    const index = this.processList.indexOf(process, 0);
    if (index > -1) {
      this.processList.splice(index, 1);
    }
    this.subject.next(this.processList);
  }
  public clearAll(){
    this.processList = [];
    this.subject.next(this.processList);
  }
}
