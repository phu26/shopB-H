import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import {
    MatPaginator, MatSort,
    MatDialog,
    MatDialogRef,
    MatSnackBar
} from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { DialogComponent } from 'app/common/components/dialog/dialog.component';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ShopComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  @ViewChild('filter')
  filter: ElementRef;
  confirmDialogRef: MatDialogRef<DialogComponent>;
  constructor() { }

  ngOnInit() {
  }

}
