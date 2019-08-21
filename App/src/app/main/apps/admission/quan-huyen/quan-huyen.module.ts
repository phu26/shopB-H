import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { QuanHuyenRoutingModule } from './quan-huyen-routing.module';
import { QuanHuyenComponent } from './quan-huyen.component';
import { QuanLyQuanHuyenComponent, QuanLyQuanHuyenComponentDialog } from './quan-ly-quan-huyen/quan-ly-quan-huyen.component';
import { MaterialModule } from './material.module';
import { MatProgressSpinnerModule, MatTreeModule } from '@angular/material';
import { DialogModule } from 'app/common/components/dialog/dialog.module';
import { QuanHuyenService } from './quan-huyen.service';
import { TreeModule } from 'angular-tree-component';
import { QuanLyDSDonViHanhChinhComponent } from './quan-ly-dsdon-vi-hanh-chinh/quan-ly-dsdon-vi-hanh-chinh.component';

// import { MatTreeModule } from '@angular/material/tree';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatIconModule, MatFormFieldModule, MatInputModule} from '@angular/material';


@NgModule({
  declarations: [QuanHuyenComponent, QuanLyQuanHuyenComponent,QuanLyQuanHuyenComponentDialog,QuanLyDSDonViHanhChinhComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuanHuyenRoutingModule,
    MaterialModule,
    DialogModule,
    MatProgressSpinnerModule,
    MatTreeModule,
    TreeModule.forRoot()
    // MatTreeModule,
    // MatIconModule,
    // MatDialogModule,
    // MatFormFieldModule,
    // MatInputModule
  ],
  exports: [
    QuanLyQuanHuyenComponent,
    QuanLyQuanHuyenComponentDialog,
    QuanLyDSDonViHanhChinhComponent
    
  ],
  providers: [
    QuanHuyenService    
  ],
  entryComponents: [QuanLyQuanHuyenComponentDialog]
})
export class QuanHuyenModule { }
