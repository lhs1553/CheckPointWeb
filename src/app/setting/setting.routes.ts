import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { DashboardComponent } from 'src/app/setting/dashboard/dashboard.component';


const routes: Routes = [
    {
        path: 'setting', component: DashboardComponent, children: [
            {path: 'list', component: DashboardComponent, pathMatch: "full"},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: []
})
export class SettingRoutingModule {
}


