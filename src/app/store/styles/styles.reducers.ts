import { createReducer, on } from "@ngrx/store";
import { change, generalStylesUpdate, elementStylesCreate, elementStylesUpdate, elementStylesDelete } from "./styles.actions";
import { IState } from "./styles.interfaces";

export const initialState: IState = {
    counter: 0,
    generalStyles: {
        label: 'Form Label',
        textColor: '#000000',
        backgroundColor: '#ffffff',
        borderType: 'solid',
        borderColor: '#000000',
    },
    elementStyles: {}
}

export const stylesReducer = createReducer(
    initialState,
    on(change, (state, { id }) => ({
        ...state,
        counter: id
    })),
    on(generalStylesUpdate, (state, genStyles) => ({
        ...state,
        generalStyles: genStyles
    })),
    on(elementStylesCreate, (state, elStyles) => ({
        ...state,
        elementStyles: Object.assign({}, state.elementStyles, elStyles)
    })),
    on(elementStylesUpdate, (state, elStyles) => ({
        ...state, elementStyles:{...state.elementStyles, [elStyles.key]:elStyles.obj[elStyles.key]}
    })),
    on(elementStylesDelete, (state, el) => {
        let elements = {...state.elementStyles};
        delete elements[el.key];
        return {...state, elementStyles: elements };
    })
);