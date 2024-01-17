import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EXPLORER_ACTION_KEY, ExplorerState } from "./explorer.store";


export const selectExplorerState = createFeatureSelector<ExplorerState>(EXPLORER_ACTION_KEY);

export const selectProjects = createSelector(
  selectExplorerState,
    (state: ExplorerState) => state.projects
);

// export const selectIsLoginPage = createSelector(
//     selectAuthState,
//     (state: AuthState) => state.isLoginPage
// );

// export const selectIsForgotPasswordModelOpen = createSelector(
//     selectAuthState,
//     (state: AuthState) => state.isForgotPasswordModelOpen
//   );
// export const selectMessages = createSelector(
//     selectAuthState,
//     (state: AuthState) => state.messages
//   );