import { Component, OnInit } from '@angular/core'
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  runningMode: string = ''
  Url: string = ''
  version: string = ''

  ngOnInit() {
    this.runningMode = environment.production ? 'production' : 'development'
    this.Url = environment.url
    //this.version = environment.version
  }
}
