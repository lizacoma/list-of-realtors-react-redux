import React, { useState } from 'react';
import Draggable, { DraggableCore } from 'react-draggable';

const DraggbleBlock = (props) => {
    const { dragHandlers, onSubmit, content, wrapper, fullPos } = props;
    const [stateContent, setContent] = useState(content);
    const [child, setChild] = useState(false);

    const dragHandleImage = (e) => {
        e.preventDefault();
        const childBlock = document.querySelector(`.${stateContent.name}`);
        setChild(childBlock);
        let childX = child.getBoundingClientRect().left;
        let childY = child.getBoundingClientRect().top;


        const { top, left, width, height } = wrapper.getBoundingClientRect();
        const position = {
            x: Math.round((childX - left) / width * 100),
            y: Math.round((childY - top) / height * 100)
        } ;
        onSubmit(position, stateContent.name);
    };

    return (
        <Draggable
            bounds="parent"
            onDrag={dragHandleImage}
            {...dragHandlers}>

            {stateContent.logo ?
                <div className = {stateContent.name}
                      style={
                        {position: 'absolute',
                        width: `${content.width}%`,
                        top: `${stateContent.position_y}%`,
                        left: `${stateContent.position_x}%`,
                        bottom: fullPos.bottom_pos,
                        right: fullPos.right_pos
                        }
                      }>
                        <img
                            className='client-logo'
                            src = {stateContent.logo}
                            style = {{width: '100%'}}
                        />
                </div>
                :
                <div className = {stateContent.name}
                     style={{
                         top: `${stateContent.position_y}%`,
                         left: `${stateContent.position_x}%`}
                     }>
                    <p>{stateContent.text}</p>
                </div>
            }
        </Draggable>
    )
};

export default DraggbleBlock;