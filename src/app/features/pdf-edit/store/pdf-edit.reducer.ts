import { createReducer, on } from "@ngrx/store";
import { initialPdfEditState } from "./pdf-edit.store";
import { deleteImageItemAction, deleteTextItemAction, setDocumentPageAction } from "./pdf-edit.actions";

export const pdfEditReducer = createReducer(initialPdfEditState,
    on(deleteImageItemAction, (state, { itemId }) => {
        return {
            ...state,
            imageItems: state.imageItems.filter(i => i.id !== itemId)
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
    })
);