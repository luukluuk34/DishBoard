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
import { EntityService } from './models/entity.service';
import { UserService } from './models/user.service';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{
    provide: EntityService,
    useClass: UserService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
