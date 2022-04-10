import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { LayoutComponent } from './core/layout/layout.component'
import { AboutComponent } from './pages/about/about.component';
import { IngredientFormComponent } from './pages/entity/ingredient/ingredient-form/ingredient-form.component';
import { IngredientListComponent } from './pages/entity/ingredient/ingredient-list/ingredient-list.component';
import { RecipeDetailComponent } from './pages/entity/recipe/recipe-detail/recipe-detail.component';
import { RecipeFormComponent } from './pages/entity/recipe/recipe-form/recipe-form.component';
import { RecipeInterfaceComponent } from './pages/entity/recipe/recipe-interface/recipe-interface.component';
import { RecipeBookDetailComponent } from './pages/entity/recipeBook/recipe-book-detail/recipe-book-detail.component';
import { RecipeBookFormComponent } from './pages/entity/recipeBook/recipe-book-form/recipe-book-form.component';
import { RecipeBookListComponent } from './pages/entity/recipeBook/recipe-book-list/recipe-book-list.component';
import { UserDetailComponent } from './pages/entity/user/user-detail/user-detail.component';
import { UserEditComponent } from './pages/entity/user/user-edit/user-edit.component';
import { UserInterfaceComponent } from './pages/entity/user/user-interface/user-interface.component';
import { UserListComponent } from './pages/entity/user/user-list/user-list.component';
import { UserLoginComponent } from './pages/entity/user/user-login/user-login.component';
import { UserRegisterComponent } from './pages/entity/user/user-register/user-register.component';
const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children:[
      { path: '', pathMatch: 'full', redirectTo: 'dashboard'},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'about', component: AboutComponent },
      { path: 'login', component: UserLoginComponent },
      { path: 'register', component: UserRegisterComponent },
      { path: 'user-edit/:id', component: UserEditComponent},
      { path: 'user-edit', component: UserEditComponent},
      { path: 'user-detail/:id', 
        component:UserDetailComponent,
        children:[{path:':recipeId', component:RecipeBookDetailComponent}]
      },
      { 
        path: 'user-interface', 
        component:UserInterfaceComponent, 
        children:[{path: ':id', pathMatch: 'full',component: UserDetailComponent}]
      },
      { path: 'recipe-interface', component: RecipeInterfaceComponent}, 
      { path: 'recipe-interface/:id', component:RecipeDetailComponent},
      { path: 'recipe-form',
        component:RecipeFormComponent,
        children:[{path: 'ingredient-list', pathMatch: 'full', component: IngredientListComponent}]
      },
      { path: 'recipe-form/:id', component:RecipeFormComponent},
      { path: 'ingredient-form', 
        component:IngredientFormComponent,
        children:[{path:'ingredient-list', pathMatch: 'full', component:IngredientListComponent}]
      },
      { path: 'ingredient-form/:id', component:IngredientFormComponent },
      { path: 'recipe-book-form', component:RecipeBookFormComponent},
      { path: 'recipe-book-form/:id', component:RecipeBookFormComponent},
      
      { path: 'recipe-book-list', component:RecipeBookListComponent},
      

      
    ]
  },
  { path: '**', redirectTo: '/' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
