import { createReducer, on } from "@ngrx/store";
import { initialPdfEditState } from "./pdf-edit.store";
import { addImageItemAction, deleteImageItemAction, deleteTextItemAction, setDocumentPageAction, updateImageItemsAction } from "./pdf-edit.actions";

export const pdfEditReducer = createReducer(initialPdfEditState,
    on(deleteImageItemAction, (state, { itemId }) => {
        return {
            ...state,
            imageItems: state.imageItems.filter(i => i.id !== itemId)
        }
    }),
    on(addImageItemAction, (state, { item }) => {
        return {
            ...state,
            imageItems: [...state.imageItems, item]
        }
    }),
    on(deleteTextItemAction, (state, { itemId }) => {
        return {
            ...state,
            textItems: state.textItems.filter(i => i.id !== itemId)
        }
    }),
    on(setDocumentPageAction, (state, { pageNum }) => {
        return {
            ...state,
            pageNum: pageNum
        }
    }),
    on(updateImageItemsAction, (state, { newImageItems }) => {
        return {
            ...state,
            imageItems: state.imageItems.map(item =>
                newImageItems.find(newItem => newItem.id === item.id) || item
            )
        }
    }),

);