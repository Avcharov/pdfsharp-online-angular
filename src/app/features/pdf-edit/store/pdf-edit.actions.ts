import { Action, createAction, props } from '@ngrx/store';
import { PDF_EDIT_ACTION_KEY } from './pdf-edit.store';
import { ImageItem } from '../models/item';

export const DELETE_TEXT_ITEM = `${PDF_EDIT_ACTION_KEY} Delete text item`;

export const deleteTextItemAction = createAction(
  DELETE_TEXT_ITEM,
  props<{ itemId: number }>()
);

export const ADD_IMAGE_ITEM = `${PDF_EDIT_ACTION_KEY} Add image item`;

export const addImageItemAction = createAction(
  ADD_IMAGE_ITEM,
  props<{ item: ImageItem }>()
);

export const DELETE_IMAGE_ITEM = `${PDF_EDIT_ACTION_KEY} Delete image item`;

export const deleteImageItemAction = createAction(
  DELETE_IMAGE_ITEM,
  props<{ itemId: number }>()
);

export const SET_DOCUMENT_PAGE = `${PDF_EDIT_ACTION_KEY} Set document page`;

export const setDocumentPageAction = createAction(
  SET_DOCUMENT_PAGE,
  props<{ pageNum: number }>()
);

export const UPDATE_IMAGE_ITEMS = `${PDF_EDIT_ACTION_KEY} Update image items`;

export const updateImageItemsAction = createAction(
  UPDATE_IMAGE_ITEMS,
  props<{ newImageItems: ImageItem[] }>()
);
