import { Action, createAction, props } from '@ngrx/store';
import { MessageModel } from 'src/app/shared/models/message-model';
import { ResetPassword } from 'src/app/features/authentication/services/models/reset-password.model';
import { EXPLORER_ACTION_KEY } from './explorer.store';
import { ProjectModel } from '../models/project-model';

export const GET_PROJECTS = `${EXPLORER_ACTION_KEY} Get Projects`;
export const GET_PROJECTS_SUCCESS_TYPE = `${EXPLORER_ACTION_KEY} Get Projects Success`;
export const GET_PROJECTS_FAIL_TYPE = `${EXPLORER_ACTION_KEY} Get Projects Fail`;

export const getProjectsAction = createAction(
    GET_PROJECTS,
    props<{ userId: number }>()
);

export const getProjectsSuccessAction = createAction(
    GET_PROJECTS_SUCCESS_TYPE,
    props<{ projects: ProjectModel[] }>()
);

export const getProjectsFailAction = createAction(
    GET_PROJECTS_FAIL_TYPE,
    props<{ message: MessageModel }>()
);

