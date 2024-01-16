import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteMessagesAction, logInUserAction, signInUserAction, toggleLoginPopupAction } from '../../../../core/store/auth.actions';
import { UserModel } from '../../models/user-model';
import { selectIsLoginPage, selectMessages } from '../../../../core/store/auth.selector';
import * as _ from 'lodash';
import { RoleModel } from '../../models/role-model';
import { RoleEnum } from '../../enums/role-enum';
import { MessageModel } from 'src/app/shared/models/message-model';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  isLoginPage = true;
  messages = <MessageModel[]>[];
  authRole = new RoleModel(1, RoleEnum.AUTHUSER, 'Authenticated User')

  constructor(private store: Store) { }

  ngOnInit() {
    this.getDataFromStore();
  }

  getDataFromStore() {
    this.store.select(selectIsLoginPage).subscribe(isLoginPage => this.isLoginPage = _.cloneDeep(isLoginPage));

    this.store
    .select(selectMessages)
    .subscribe((messages) => (this.messages = messages));
  }

  toggleSignUpPopup() {
    this.store.dispatch(toggleLoginPopupAction({ isLoadingPage: !this.isLoginPage }));
  }

  logIn(user: UserModel) {
    user.role = this.authRole;

    this.store.dispatch(logInUserAction({ user: {...user} }));
  }

  signIn(user: UserModel) {
    user.role = this.authRole;
    this.store.dispatch(signInUserAction({ user: {...user} }));

  }

  deleteMessages() {
    this.store.dispatch(deleteMessagesAction());
  }

}
