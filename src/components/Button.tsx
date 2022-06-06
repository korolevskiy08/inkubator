import React from 'react';

type ButtonType = {
    title: string
    callback: ()=>void
}

export const Button = (props: ButtonType) => {
    const onClickHundler = () => {
    props.callback()
    }

    return (
        <div>
            <button onClick={onClickHundler}>{props.title}</button>
        </div>
    );
};

