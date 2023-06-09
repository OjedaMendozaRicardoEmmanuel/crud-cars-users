import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  constructor(private apiService: ApiService, private router: Router) {}

  logout() {
    this.apiService.logout();
    this.router.navigate(['login']);
  }
}
