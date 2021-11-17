import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { LayoutComponent } from './core/layout/layout.component'
import { UserDetailComponent } from './pages/entity/user/user-detail/user-detail.component';
import { UserEditComponent } from './pages/entity/user/user-edit/user-edit.component';
import { UserInterfaceComponent } from './pages/entity/user/user-interface/user-interface.component';
import { UserListComponent } from './pages/entity/user/user-list/user-list.component';
const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children:[
      { path: '', pathMatch: 'full', redirectTo: 'dashboard'},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user-list', component: UserListComponent},
      { path: 'user-list/:id', component:UserDetailComponent },
      { path: 'user-edit/:id', component: UserEditComponent},
      { path: 'user-edit', component: UserEditComponent},
      { 
        path: 'user-interface', 
        component:UserInterfaceComponent, 
        children:[{path: ':id', pathMatch: 'full', component: UserDetailComponent}]}
    ]
  },
  { path: '**', redirectTo: '/' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
