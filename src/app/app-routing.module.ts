import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { LayoutComponent } from './core/layout/layout.component'
import { AboutComponent } from './pages/about/about.component';
import { RecipeDetailComponent } from './pages/entity/recipe/recipe-detail/recipe-detail.component';
import { RecipeFormComponent } from './pages/entity/recipe/recipe-form/recipe-form.component';
import { RecipeInterfaceComponent } from './pages/entity/recipe/recipe-interface/recipe-interface.component';
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
      { path: 'about', component: AboutComponent },
      { path: 'user-edit/:id', component: UserEditComponent},
      { path: 'user-edit', component: UserEditComponent},
      { path: 'user-detail/:id', component:UserDetailComponent},
      { 
        path: 'user-interface', 
        component:UserInterfaceComponent, 
        children:[{path: ':id', pathMatch: 'full', component: UserDetailComponent}]
      },
      { path: 'recipe-interface', component: RecipeInterfaceComponent}, 
      { path: 'recipe-interface/:id', component:RecipeDetailComponent},
      { path: 'recipe-form',component:RecipeFormComponent},
      { path: 'recipe-form/:id', component:RecipeFormComponent}
    ]
  },
  { path: '**', redirectTo: '/' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
