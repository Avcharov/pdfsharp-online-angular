import { Component, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { environment } from 'src/environments/environment';
import { UserModel } from '../../models/user-model';
import { HttpClient } from '@angular/common/http';
//import * as google from 'google-one-tap';


@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})

export class AuthLoginComponent implements OnInit {

  @Input() user = new UserModel();

  @Output() openSignUpPopupEvent = new EventEmitter();
  @Output() logInEvent = new EventEmitter<UserModel>();


  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  onLogin() {
  }

  openSignUp() {
    this.openSignUpPopupEvent.emit();
  }

  logIn() {
    this.logInEvent.emit(this.user);
  }

  // async handleCredentialResponse(response: CredentialResponse) {
  //   await this.authService.LoginWithGoogle(response.credential).subscribe(
  //     (x: any) => {
  //       localStorage.setItem("token", x.token);
  //       this._ngZone.run(() => {
  //         this.router.navigate(['/editor']);
  //       })
  //     },
  //     (error: any) => {
  //       debugger
  //       console.log(error);
  //     }
  //   )
  // }


}
