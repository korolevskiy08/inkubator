import React, {useState} from 'react';

type EditTitleType = {
    title: string
}

export const EditTitle = ({title}:EditTitleType) => {

const [editMode, setEditMode] = useState(false)

    return (
        <div>

        </div>
    );
};

export default EditTitle;