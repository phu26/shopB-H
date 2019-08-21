import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TraCuuComponent } from './tra-cuu.component';
import { MatDatepickerModule, 
  MatNativeDateModule, 
  MatOptionModule, 
  MatSelectModule, 
  MatIconModule, 
  MatCardModule,
  MatInputModule, 
  MatAutocompleteModule, 
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatSortModule,
  MatRippleModule,
  MatSnackBarModule,
  MatDialogModule,
  MatCheckboxModule
} from '@angular/material';
import { NguyenVongService } from '../nguyen-vong/nguyen-vong.service';

@NgModule({
  declarations: [TraCuuComponent],
  imports: [
  CommonModule,
  MatDatepickerModule,
  MatNativeDateModule, 
  MatOptionModule, 
  MatSelectModule, 
  MatIconModule, 
  MatCardModule,
  MatInputModule, 
  MatAutocompleteModule, 
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatSortModule,
  MatRippleModule,
  MatSnackBarModule,
  MatDialogModule,
  MatCheckboxModule
  ],
  providers:[
    MatDatepickerModule,
    NguyenVongService
  ],
  exports:[]
})
export class TraCuuModule { }
