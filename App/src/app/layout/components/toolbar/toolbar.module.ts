import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, MatSelectModule, MatProgressBarModule, MatBottomSheetModule } from '@angular/material';

import { FuseSearchBarModule, FuseShortcutsModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { ToolbarComponent } from 'app/layout/components/toolbar/toolbar.component';
import { LoadingProcessesComponent } from './loading-processes/loading-processes.component';
import { LoadingProcessesExpandComponent } from './loading-processes/loading-processes-expand/loading-processes-expand.component';

@NgModule({
    declarations: [
        ToolbarComponent,
        LoadingProcessesComponent,
        LoadingProcessesExpandComponent
    ],
    imports     : [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        MatSelectModule,
        FuseSharedModule,
        FuseSearchBarModule,
        FuseShortcutsModule,
        MatProgressBarModule,
        MatBottomSheetModule
    ],
    exports     : [
        ToolbarComponent
    ],
    entryComponents: [
        LoadingProcessesExpandComponent
    ]
})
export class ToolbarModule
{
}
