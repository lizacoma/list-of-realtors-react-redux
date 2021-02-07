import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Draggable, { DraggableCore } from 'react-draggable';

import DraggableBlock from '../components/DraggableBlock.js';

import { openOrCloseComponentAction } from '../redux/actions/clients.js';
import { updatePictureAction } from '../redux/actions/pictures.js';
import { reqUrlPic } from '../redux/constants/reqUrl.js';

const EditPicture = (props) => {
    const { updatePictureAction, openOrCloseAction, openOrClose } = props;
    const { client, forCreate } = openOrClose.props;

    const [statePicture, setPicture] = useState(client.clientLogo ? client.clientLogo : {});
    const [wrapper, setWrapper] = useState(false);
    const [activeDrags, setActiveDrags] = useState(0);

    const draggableItems = [
        {
            name: 'client-logo',
            logo: statePicture.logo || null,
            width: statePicture.width || 30,
            position_x:  statePicture.position_logo_x || 65,
            position_y:  statePicture.position_logo_y || 11,
        },
        {
            name: 'client-brand',
            text: client.client_name,
            position_x:  statePicture.position_brand_x || 8,
            position_y:  statePicture.position_brand_y || 14
        },
        {
            name: 'client-name',
            text: client.contact_name,
            position_x:  statePicture.position_name_x || 8,
            position_y:  statePicture.position_name_y || 73
        },
        {
            name: 'client-phone',
            text: client.contact_phone,
            position_x:  statePicture.position_phone_x || 30,
            position_y:  statePicture.position_phone_y || 73
        },
        {
            name: 'client-contact',
            text: client.contact_email,
            position_x:  statePicture.position_contact_x || 53,
            position_y:  statePicture.position_contact_y || 73
        }
    ];
    const [blocksStyle, setBlocksStyle] = useState(draggableItems);
    const [posRB, setPosRB] = useState({
        bottom_pos: '',
        right_pos: ''
    });

    useEffect( () => {
        const wrap = document.querySelector('.edit-logo-block');
        setWrapper(wrap);
    }, [!wrapper]);

    const handleScale = (event) => {
        const { top, bottom, left, right } = document.querySelector(`.client-logo`).getBoundingClientRect();
        const wrapTop = wrapper.getBoundingClientRect().top;
        const wrapBottom = wrapper.getBoundingClientRect().bottom;
        const wrapLeft = wrapper.getBoundingClientRect().left;
        const wrapRight = wrapper.getBoundingClientRect().right;
        let newArr = [];
        console.log('POSIT ', top, bottom, left, right);

        if (bottom <= wrapBottom) {
            newArr = blocksStyle.map(block => {
                if (block.name === 'client-logo') {
                    return {
                        ...block,
                        width: event.target.value
                }
                }
                return block
            });
            setBlocksStyle(newArr);
            setPosRB({bottom_pos: wrapBottom});

        } else if (right <= wrapRight) {
            newArr = blocksStyle.map(block => {
                if (block.name === 'client-logo') {
                    return {
                        ...block,
                        width: event.target.value,
                }
                }
                return block
            });
            setBlocksStyle(newArr);
            setPosRB({right_pos: wrapRight});
        } else {
            newArr = blocksStyle.map(block => {
                if (block.name === 'client-logo') {
                    return {
                        ...block,
                        width: event.target.value
                    }
                }
                return block
            });
            setBlocksStyle(newArr);
        };

        console.log('newArr', newArr);

    };

    const savePosition = (pos, name) => {
        const newArr = blocksStyle.map(block => {
            if (block.name === name) {
                return {
                    ...block,
                    position_x: pos.x,
                    position_y: pos.y
                }
            }
            return block
        });
        setBlocksStyle(newArr);
    };

    const handleSubmit = async () => {
        let form_data = new FormData();
        form_data.append('client_logo_id', statePicture.id);
        form_data.append('width', blocksStyle[0].width);

        blocksStyle.forEach(block => {
            form_data.append(`position_${block.name.split('-')[1]}_x`, block.position_x);
            form_data.append(`position_${block.name.split('-')[1]}_y`, block.position_y);
        });

        updatePictureAction(reqUrlPic, form_data)
            .then(res => {
                if (!forCreate) {
                    openOrCloseAction('edit-client', {...client, clientLogo: res});
                } else {
                    openOrCloseAction('create-or-edit', {clientName: client.client_name});
                }
            });
    };

    const cancelСhanges = () => {
        if (!forCreate) {
            openOrCloseAction('edit-client', client);
        } else {
            const fullProp = {
                client: {...client, clientLogo: statePicture},
                forCreate: true
            }
            openOrCloseAction('create-pic', fullProp);
        }
    };

    const onStart = () => {setActiveDrags(activeDrags + 1)};
    const onStop = () => {setActiveDrags(activeDrags - 1)};
    const dragHandlers = {onStart: onStart, onStop: onStop};

    return (
        <div className='change-picture'>
            <div className='edit-picture-wrapper'>
                <h4>Scale Image. Drag and drop Name, Number and Contact.</h4>
                <div className='scale-input'>
                    <span> Scale image </span>
                    <input
                        type='range'
                        onChange={handleScale}
                        step="1"
                        min='10'
                        max="100"
                        value={blocksStyle[0].width}
                    />
                </div>
                <div className="edit-logo-block" style={{position:"relative"}}>
                    {blocksStyle.map((dndBlock, index) => {
                        return (
                            <DraggableBlock
                                key={index}
                                content = {dndBlock}
                                fullPos = {posRB}
                                wrapper = {wrapper}
                                dragHandlers = {dragHandlers}
                                onSubmit = {savePosition}/>
                        )
                    })}
                </div>
                <p>Recommended maximum size</p>
                <div className='save-cancel-wrapper'>
                    <button onClick={cancelСhanges}>Cancel</button>
                    <button onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        state,
        openOrClose: state.openOrCloseComponentReducer,
        allPictures: state.picturesReducer,
        allClients: state.baseReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updatePictureAction: (url, data) => dispatch(updatePictureAction(url, data)),
        openOrCloseAction: (key, props) => dispatch(openOrCloseComponentAction(key, props))
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (EditPicture);