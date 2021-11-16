import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
    '.btn-link { color: rgba(255,255,255,.5); text-decoration: none; }',
    // tslint:disable-next-line: max-line-length
    '.btn-link.focus, .btn-link:focus, .btn-link.hover, .btn-link:hover { color: rgba(255,255,255,.75); text-decoration: none; box-shadow: none; }'
  ]
})
export class NavbarComponent {
  @Input() title: string = ''
  isNavbarCollapsed = true
}
