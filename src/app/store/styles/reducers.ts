import { createReducer, on } from "@ngrx/store";
import { change, generalStylesUpdate, elementStylesCreate, elementStylesUpdate, elementStylesDelete } from "./actions";
import { IState } from "./interfaces";

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
    on(elementStylesUpdate, (state, elStyles: any) => {
        const index = Object.keys(elStyles)[0] as unknown as number;
        return {...state, elementStyles:{...state.elementStyles, [index]:elStyles[index]}};
    }),
    on(elementStylesDelete, (state, el) => {
        let elements = {...state.elementStyles}
        delete elements[el.key];
        return {...state, elementStyles: elements };
    })
);