import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormType = {
    addItem: (title: string) => void
   }

function AddItemForm(props: AddItemFormType) {
    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null)
    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle('');
        } else {
            setError('Title is required');
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };
    const onKeyPressPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }
    return (
        <div className="App">
            <TextField
                variant={'filled'}
                label="Введите задание"
                id="outlined-size-small"
                defaultValue=""
                size="small"
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton  color="primary"
                    onClick={addTask}><AddBox/></IconButton>
            {/*{error && <div className='error-message'>{error}</div>}*/}
        </div>
    )
}

export default AddItemForm;
