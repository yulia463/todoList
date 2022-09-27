import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox, ContactlessOutlined, ControlPoint} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}


const AddItemForm = (props: AddItemFormPropsType) => {
    let [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div>
            <h3></h3>
            <TextField variant={'outlined'}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       error={!!error}
                       label={'Title'}
                       helperText={error}

            />
            <IconButton
                color={'secondary'}
                onClick={addItem}>
                {/*<ControlPoint>*/}

                {/*</ControlPoint>*/}
                <AddBox/>
            </IconButton>


        </div>
    )
}
export default AddItemForm