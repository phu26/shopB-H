import { Component, OnInit } from '@angular/core';
import { SignalrService } from '../signalr.service';
import { HttpClient } from '@angular/common/http';
import * as signalR from "@aspnet/signalr";

@Component({
  selector: 'app-loading-signalr',
  templateUrl: './loading-signalr.component.html',
  styleUrls: ['./loading-signalr.component.scss']
})
export class LoadingSignalrComponent implements OnInit {

  ngOnInit() {
  }

  Loading() {
    this.StartProgress()
  }

  Send() {
    alert('Send');
  }


  private hubConnection: signalR.HubConnection

  Jobs = []

  constructor(public httpClient: HttpClient, private signalrService: SignalrService) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:61186/jobprogress")
      .configureLogging(signalR.LogLevel.Information)
      .build();

  }

  public startConnection = (jobids) => {

    this.hubConnection.on("progress",

      (car) => {
        if (car.i === 100) {
          document.getElementById(car.jobId).innerText = "Finished!";
        } else {
          document.getElementById(car.jobId).innerText = `${car.i}%`;
        }
      });

    this.hubConnection.start().then(() => {

      console.log('Connection started');

      jobids.forEach(element => {
        this.hubConnection.invoke("AssociateJob", element)
      });

    })
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  StartProgress() {

    this.httpClient.post('http://localhost:61186/api/v1.0/Signalrs/StartProgress', null).subscribe
      (data => {
        //render danh sach jobids
        this.Jobs = data as any[string];
        this.startConnection(data);
      }, err => {
        console.error(err)
      }
      );
  }

}

