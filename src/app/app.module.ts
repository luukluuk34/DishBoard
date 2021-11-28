import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './pages/entity/user/user-list/user-list.component';
import { UserDetailComponent } from './pages/entity/user/user-detail/user-detail.component';
import { UserEditComponent } from './pages/entity/user/user-edit/user-edit.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { LayoutComponent } from './core/layout/layout.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { FooterComponent } from './core/footer/footer.component';
import { UserInterfaceComponent } from './pages/entity/user/user-interface/user-interface.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './pages/about/about.component';
import { EntityService } from './core/common/entity.service';
import { UserService } from './pages/entity/user/user.service';
import { RecipeListComponent } from './pages/entity/recipe/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './pages/entity/recipe/recipe-detail/recipe-detail.component';
import { RecipeFormComponent } from './pages/entity/recipe/recipe-form/recipe-form.component';
import { RecipeInterfaceComponent } from './pages/entity/recipe/recipe-interface/recipe-interface.component';
import { RecipeService } from './pages/entity/recipe/recipe.service';
import { RouterTestingModule } from '@angular/router/testing';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LayoutComponent,
    DashboardComponent,
    FooterComponent,
    UserListComponent,
    UserDetailComponent,
    UserEditComponent,
    UserInterfaceComponent,
    AboutComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeFormComponent,
    RecipeInterfaceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterTestingModule,
  ],
  providers: [{
    provide: EntityService,
    useClass: UserService
  },
  {
    provide:EntityService,
    useClass:RecipeService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
