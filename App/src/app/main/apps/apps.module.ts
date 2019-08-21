import { NgModule } from '@angular/core';
import { RouterModule, Router, Routes } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { CommonModule } from '@angular/common';



const routes: Routes = [
    {
        path: '',
        children: [
            {
                path:'',
                redirectTo: '/', pathMatch: 'full'
            },
            {
                path        : 'tuyen-sinh',
                loadChildren: './tuyen-sinh/tuyen-sinh.module#TuyenSinhModule'
            },
            {
                path        : 'admission',
                loadChildren: './admission/admission.module#AdmissionModule'
            },
            {
                path        : 'shop',
                loadChildren: './shop/shop.module#ShopModule'
            },
            {
                path: '**',
                redirectTo: 'page-not-found',
            }
        ]
    }
    
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule
    ],
    declarations: []
})
export class AppsModule
{
}
