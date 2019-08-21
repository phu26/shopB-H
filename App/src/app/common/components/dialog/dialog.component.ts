import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector   : 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls  : ['./dialog.component.scss']
})
export class DialogComponent
{
    public message: string;
    public title: string;
    public btnOK: string = 'OK';
    public btnCancel: string= 'Hủy';

    /**
     * Constructor
     *
     * @param {MatDialogRef<DialogComponent>} dialogRef
     */
    constructor(
        public dialogRef: MatDialogRef<DialogComponent>
    )
    {
    }

}
