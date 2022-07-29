export type TFormElement = {
    type: string,
    id: number,
    placeholder: string,
    color: string,
    width: number,
    height: number,
    required: boolean,
    border: string,
    fontWeight: string | number,
    fontSize: string | number,
    options: string[]
}

export type TForm = {
    label: string,
    textColor: string,
    backgroundColor: string,
    borderType: string,
    borderColor: string
}