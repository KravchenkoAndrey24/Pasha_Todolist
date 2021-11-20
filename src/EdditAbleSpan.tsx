import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

export type EdditAbleSpanType = {
    title: string
    onChange: (newValue: string) => void
}

export function EdditAbleSpan(props: EdditAbleSpanType) {
    let [editMode, seteditMode] = useState(false)
    let [title, setTitle] = useState(props.title)
    const activateEditmode = () => {
        seteditMode(true)
        setTitle(props.title)
    }
    const activateViwMode = () => {
        seteditMode(false)
        props.onChange(title)
    }
    const changeTitle=(e:ChangeEvent<HTMLInputElement>)=>{
       setTitle( e.currentTarget.value)
    }

    return editMode
        ? <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViwMode}/>
        : <span onDoubleClick={activateEditmode}>{props.title}</span>
}