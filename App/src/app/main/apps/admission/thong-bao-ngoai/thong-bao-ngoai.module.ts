import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThongBaoNgoaiRoutingModule } from './thong-bao-ngoai-routing.module';
import { ThongBaoNgoaiComponent } from './thong-bao-ngoai.component';
import { ThongBaoNgoaiService } from './thong-bao-ngoai.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatButtonModule, MatSnackBarModule } from '@angular/material';

@NgModule({
  declarations: [ThongBaoNgoaiComponent],
  imports: [
    CommonModule,
    ThongBaoNgoaiRoutingModule,
    FormsModule,
    HttpClientModule, AngularEditorModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers:[ThongBaoNgoaiService]
})
export class ThongBaoNgoaiModule { }
