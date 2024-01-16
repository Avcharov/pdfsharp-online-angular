import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { AuthLoginComponent } from './components/auth-popup/auth-login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthenticationRoutingModule } from './authentication.routing.module';
import { AuthSignupComponent } from './components/auth-signup/auth-signup.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild({ extend: true }),
    SharedModule,
    FormsModule,
    AuthenticationRoutingModule
  ],
  declarations: [AuthPageComponent, AuthLoginComponent,AuthSignupComponent]
})
export class AuthenticationModule { }
