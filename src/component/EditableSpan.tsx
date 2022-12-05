import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string
    callBack: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")
    const onDoubleClickHandler = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onBlurHandler = () => {
        setEditMode(false)
        props.callBack(title)
    }
    const onEnterDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            setEditMode(false)
            props.callBack(title)
        }
    }
    return <>
        {editMode ? <TextField variant="outlined"
                               size="small"
                               onChange={onChangeInputHandler}
                               onBlur={onBlurHandler}
                               onKeyDown={onEnterDownHandler}
                               value={title}
                               autoFocus/> :
            <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>}
    </>

}