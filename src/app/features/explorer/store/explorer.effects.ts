import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { getProjectsAction, getProjectsFailAction, getProjectsSuccessAction } from "./explorer.actions";
import { ProjectService } from "../services/project.service";
import { catchError, map, mergeMap, of } from "rxjs";
import { MessageModel } from "src/app/shared/models/message-model";

//export const AUTHENTICATED_USER = 'authenticatedUser';

@Injectable()
export class ExplorerEffects {
    getProjects = createEffect(() =>
        this.actions.pipe(
            ofType(getProjectsAction),
            mergeMap((props) => {
                return this.projectService.getUsersProjects(props.userId).pipe(
                    map((projects) => getProjectsSuccessAction({ projects })),
                    catchError((errorResponse) => {
                        const error = MessageModel.fromJson(errorResponse);
                        return of(getProjectsFailAction({ message: error }));
                    })
                );
            }
            )
        )
    );
    
    constructor(
        private actions: Actions,
        private projectService: ProjectService,
        private store: Store,
        private router: Router
    ) { }
}
