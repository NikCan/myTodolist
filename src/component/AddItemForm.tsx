import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type AddItemFormProps = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormProps) {
    const {addItem} = props
    const [error, setError] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onInputsKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") onClickAddItemHandler()
        if (e.key === "Escape") setTitle("")
    }
    const onClickAddItemHandler = () => {
        const trimmedTitle = title.trim()
        title.trim() ? addItem(trimmedTitle)
            : setError(true)
        setTitle("")
    }

    return <div>
        <TextField id="outlined-basic"
                   label="Enter text"
                   variant="outlined"
                   error={error}
                   value={title}
                   onChange={onChangeTitleHandler}
                   onKeyDown={onInputsKeyDownHandler}/>
        <IconButton aria-label="add" onClick={onClickAddItemHandler}>
            <AddBox color="primary" fontSize="large"/>
        </IconButton>
        {error && <div className={"error"}>You need to use correct name!</div>}
    </div>
}
