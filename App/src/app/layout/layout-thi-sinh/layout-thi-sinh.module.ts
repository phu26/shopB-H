import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutThiSinhComponent, LayoutThiSinhHIUComponent, LayoutThiSinhSONAComponent, LayoutThiSinhYersinComponent, LayoutThiSinhNeuComponent, LayoutThiSinhQnuComponent, LayoutThiSinhLawComponent, LayoutThiSinhDnuComponent } from './layout-thi-sinh.component';
//import { ContentModule } from '../components/content/content.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, MatSelectModule } from '@angular/material';
import { PipeHtmlCssPipe } from './pipe-html-css.pipe';
//import { FuseSharedModule } from '@fuse/shared.module';
//import { FuseSearchBarModule, FuseShortcutsModule } from '@fuse/components';

@NgModule({
  declarations: [LayoutThiSinhComponent
    
    , LayoutThiSinhHIUComponent
    , LayoutThiSinhSONAComponent
    ,LayoutThiSinhYersinComponent
    ,LayoutThiSinhNeuComponent
    ,LayoutThiSinhQnuComponent
    ,LayoutThiSinhLawComponent
    ,LayoutThiSinhDnuComponent, PipeHtmlCssPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatSelectModule
   // FuseSharedModule,
  //  FuseSearchBarModule,
   // FuseShortcutsModule
  ],
  exports: [LayoutThiSinhComponent
    , LayoutThiSinhHIUComponent
    , LayoutThiSinhSONAComponent
    ,LayoutThiSinhYersinComponent
    ,LayoutThiSinhNeuComponent
    ,LayoutThiSinhQnuComponent
    ,LayoutThiSinhLawComponent
    ,LayoutThiSinhDnuComponent
  ]
    
})
export class LayoutThiSinhModule { }
