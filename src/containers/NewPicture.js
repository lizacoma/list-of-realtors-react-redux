import React, { useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { useDropzone } from "react-dropzone";
import EditPicture from './EditPicture.js';

import { addPictureAction, updatePictureAction } from '../redux/actions/pictures.js';
import { openOrCloseComponentAction } from '../redux/actions/clients.js';
import { reqUrlPic } from '../redux/constants/reqUrl.js';

const NewPicture = (props) => {
    const {
        allPictures,
        allClients,
        addPictureAction,
        openOrCloseAction,
        openOrClose,
        updatePictureAction
    } = props;
    const userId = document.querySelector('#user_id').getAttribute('value');
    const { forCreate, client } = openOrClose.props;
    const { clientLogo } = client;
    const basicPos = [
        {
            name: 'client-logo',
            width: 30,
            position_x: 65,
            position_y: 11
        },
        {
            name: 'client-brand',
            text: client.client_name,
            position_x: 8,
            position_y: 14
        },
        {
            name: 'client-name',
            text: client.contact_name,
            position_x: 8,
            position_y: 73
        },
        {
            name: 'client-phone',
            text: client.contact_phone,
            position_x: 30,
            position_y: 73
        },
        {
            name: 'client-contact',
            text: client.contact_email,
            position_x: 53,
            position_y: 73
        }
    ];

    const savePicture = async (acceptedFiles) => {
        let form_data = new FormData();
        form_data.append('logo', acceptedFiles[0], acceptedFiles[0].name);

        if (!clientLogo) {
            form_data.append('client_id', client.id);
            form_data.append('author', userId);
            form_data.append('width', basicPos[0].width);
            basicPos.forEach(block => {
                form_data.append(`position_${block.name.split('-')[1]}_x`, block.position_x);
                form_data.append(`position_${block.name.split('-')[1]}_y`, block.position_y);
            });

        addPictureAction(reqUrlPic, form_data)
            .then(res => {
                const picForEditing = {
                    client: {...client, clientLogo: res},
                    forCreate: forCreate ? true : false
                };
                openOrCloseAction('edit-pic', picForEditing);
            });
        } else {
            form_data.append('client_logo_id', clientLogo.id);
            updatePictureAction(reqUrlPic, form_data)
                .then(res => {
                    const picForEditing = {
                        client: {...client, clientLogo: res},
                        forCreate: forCreate ? true : false
                    };
                    openOrCloseAction('edit-pic', picForEditing);
                });
        };
    };

    const cancelСhanges = () => {
        if (!forCreate) {
            openOrCloseAction('edit-client', client);
        } else {
            openOrCloseAction('create-client', client);
        }
    };

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        open
    } = useDropzone(
        {
            noClick: true,
            accept: "image/jpeg,image/png,image/gif",
            onDrop: savePicture
        }
    );

    const activeStyle = {borderColor: '#2196f3'};
    const acceptStyle = {borderColor: '#00e676'};
    const rejectStyle = {borderColor: '#ff1744'};
    const style = useMemo(() => ({
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    return (
        <div className='change-picture'>
            <div className='new-picture-wrapper'>
                <form
                    {...getRootProps({
                            className: 'dropzone',
                            style
                        })}
                        id="upload-container"
                        method="POST">
                    <p>Drag & Drop your Logo Image here</p>
                    <p>Or</p>
                    <label className='custom-file-upload' htmlFor="file-input">
                        <input
                                {...getInputProps()}
                                id="file-input"
                                type="file"
                                name="file"
                                onClick = {open}
                            />
                            Choose file
                    </label>
                    <p>Upload one image only. .jpg, .png or .gif</p>
                </form>
                <button onClick={cancelСhanges}> Cancel </button>
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        state,
        allPictures: state.picturesReducer,
        allClients: state.baseReducer,
        openOrClose: state.openOrCloseComponentReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addPictureAction: (url, data) => dispatch(addPictureAction(url, data)),
        updatePictureAction: (url, data) => dispatch(updatePictureAction(url, data)),
        openOrCloseAction: (key, props) => dispatch(openOrCloseComponentAction(key, props))
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (NewPicture);