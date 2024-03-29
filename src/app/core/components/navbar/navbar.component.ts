import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/features/authentication/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  
  logOut() {
    this.authService.logOut();
  }
}
