import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState} from "react";

export type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false)

    let onDoubleClick = () => {
        setEditMode(true)
    }

    let onChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
        setEditMode(false)
    }

    return (
        <>
            {editMode
                ? <input onBlur={onKeyPressHandler} value={props.value} onChange={onChange} />
                : <span onDoubleClick={onDoubleClick}>{props.value}</span>}
        </>
    )
}

export default EditableSpan;