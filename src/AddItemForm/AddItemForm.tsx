import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormType = {
    addItem: (title: string) => void
}

const AddItemForm: React.FC<AddItemFormType> = ({addItem}) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onKeyDownAddTaskItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddTaskItem()
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        error && setError(false)
    }

    const onClickAddTaskItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    return (
        <div>
            <input
                value={title}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddTaskItem}
                className={error ? "error" : ""}
            />
            <button onClick={onClickAddTaskItem}>+</button>
            {error && <div style={{color: "red"}}>Title is required!</div>}
        </div>
    );
};

export default AddItemForm;