import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { authInfoGetUserAction, authInfoGetUserFailAction, authInfoGetUserSuccessAction, getUsersAction, getUsersActionSuccess, logInUserAction, logInUserFailAction, logInUserSuccessAction, signInUserAction, signInUserFailAction, signInUserSuccessAction } from "./auth.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { Store } from "@ngrx/store";
import { AuthService } from "../../features/authentication/services/auth.service";
import { MessageModel } from "src/app/shared/models/message-model";
import { Router } from "@angular/router";

export const AUTHENTICATED_USER = 'authenticatedUser';

@Injectable()
export class AuthEffects {
    signIn = createEffect(() =>
        this.actions.pipe(
            ofType(signInUserAction),
            mergeMap((props) => {
                return this.authService.signUp(props.user).pipe(
                    map((user) => signInUserSuccessAction({ user })),
                    catchError((errorResponse) => {
                        const error = MessageModel.fromJson(errorResponse);
                        return of(signInUserFailAction({ message: error }));
                    })
                );
            }
            )
        )
    );

    logIn = createEffect(() =>
        this.actions.pipe(
            ofType(logInUserAction),
            mergeMap((props) => {
                return this.authService.logIn(props.user).pipe(
                    map((res) => {
                        this.authService.setToken(res.accessToken);
                        this.authService.setRefreshToken(res.refreshToken);
                        this.router.navigateByUrl('/editor');
                        return logInUserSuccessAction()
                    }),
                    catchError((errorResponse) => {
                        const error = MessageModel.fromJson(errorResponse);
                        return of(logInUserFailAction({ message: error }));
                    })
                );
            }
            )
        )
    );

    logInUserSuccess = createEffect(() =>
        this.actions.pipe(ofType(logInUserSuccessAction),
            map(() => {
                const upn = this.authService.getUpn();
                this.store.dispatch(authInfoGetUserAction({ upn }));

                return authInfoGetUserAction({ upn });
            })
        ));

    getUsers = createEffect(() =>
        this.actions.pipe(ofType(getUsersAction),
            mergeMap(() => {

                return this.authService.getUsers().pipe(
                    map((users) => getUsersActionSuccess({ users }))
                );
            })
        ));


    authInfoGetUser = createEffect(() =>
        this.actions.pipe(
            ofType(authInfoGetUserAction),
            mergeMap(({ upn }) =>
                this.authService.getUserByUpn(upn).pipe(
                    map((user) => {
                        localStorage.setItem(AUTHENTICATED_USER, JSON.stringify(user));
                        return authInfoGetUserSuccessAction({ user })
                    }),
                    catchError((errorResponse) => {
                        const error = MessageModel.fromJson(errorResponse);
                        return of(authInfoGetUserFailAction({ message: error }));
                    })
                )
            )
        )
    );
    constructor(
        private actions: Actions,
        private authService: AuthService,
        private store: Store,
        private router: Router
    ) { }
}
