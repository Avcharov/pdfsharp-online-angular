import { Action, createAction, props } from '@ngrx/store';
import { PDF_EDIT_ACTION_KEY } from './pdf-edit.store';

export const DELETE_TEXT_ITEM = `${PDF_EDIT_ACTION_KEY} Delete text item`;

export const deleteTextItemAction = createAction(
  DELETE_TEXT_ITEM,
  props<{ itemId: number }>()
);

export const DELETE_IMAGE_ITEM = `${PDF_EDIT_ACTION_KEY} Delete image item`;

export const deleteImageItemAction = createAction(
  DELETE_IMAGE_ITEM,
  props<{ itemId: number }>()
);
