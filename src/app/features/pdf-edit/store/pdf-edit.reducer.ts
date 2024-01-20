import { createReducer, on } from "@ngrx/store";
import { initialPdfEditState } from "./pdf-edit.store";
import { addImageItemAction, addImageItemSuccessAction, deleteImageItemAction, deleteTextItemAction, getImagesSuccessAction, setDocumentPageAction, updateImageItemsAction } from "./pdf-edit.actions";

export const pdfEditReducer = createReducer(initialPdfEditState,
    on(deleteImageItemAction, (state, { imageId }) => {
        return {
            ...state,
            imageItems: state.imageItems.filter(i => i.id !== imageId)
        }
    }),
    on(addImageItemAction, (state, { image }) => {
        return {
            ...state,
            //imageItems: [...state.imageItems, image]
        }
    }),
    on(addImageItemSuccessAction, (state, { image }) => {
        return {
            ...state,
            //imageItems: [...state.imageItems, image]
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
    on(getImagesSuccessAction, (state, { images }) => {
        return {
            ...state,
            imageItems: [...state.imageItems, ...images.filter(image2 => !state.imageItems.some(image1 => image1.id === image2.id))]
        }
    }),

);