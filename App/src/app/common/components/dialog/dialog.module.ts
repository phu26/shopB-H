import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { DialogComponent } from './dialog.component';
 
@NgModule({
    declarations: [
        DialogComponent
    ],
    imports: [
        MatDialogModule,
        MatButtonModule
    ],
    entryComponents: [
        DialogComponent
    ],
})
export class DialogModule
{
}
