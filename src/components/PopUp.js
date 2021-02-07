import React, { useState } from 'react';

const PopUp = (props) => {
    const { onDelete, onSubmit, isDelete, onClose } = props;
    const [newName, setNewName] = useState('');

    const content = {
        title: isDelete ? 'Delete this Client' : 'Duplicate this Client',
        main_information: isDelete ? 'Are you sure you want to delete this Client?' : 'Type a new name for this Client',
        warning_message: isDelete ? 'This action cannot be undone' : 'You can edit this Client later',
        button_text: isDelete ? 'Delete' : 'Duplicate'
    };

    const handleChange = event => {
        setNewName(event.target.value);
    };

    const handleSubmit = async () => {
        if (isDelete) {
            onDelete();
        } else {
            onSubmit(newName);
        };
        onClose(false, false);
    };

    return (
        <div className='pop-up-wrapper'>
            <div className='hidden-background' onClick = {() => onClose(false, false)} />
            <div className='pop-up-content'>
                
                <i className="far fa-question-circle"/>
                <div className='title'>
                    <h4>{content.title}</h4>
                </div>

                <p>{content.main_information}</p>
                {!isDelete ? <input
                    placeholder='Text hint...'
                    value = {newName}
                    onChange = {handleChange}
                /> : ''}
                <p>{content.warning_message}</p>

                <div className='buttons-wrapper'>
                    <button onClick={() => onClose(false, false)}> Cancel </button>
                    <button onClick={handleSubmit}>
                        {content.button_text}
                    </button>
                </div>
            </div>
        </div>
    )
};

export default PopUp;