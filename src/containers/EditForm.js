import React, { useState, useEffect } from 'react';
import InputsBlock from './InputsBlock.js';
import PopUp from '../components/PopUp.js';

import { connect } from 'react-redux';
import { DeleteClientAction, AddClientAction, openOrCloseComponentAction } from '../redux/actions/clients.js';
import { addPictureAction } from '../redux/actions/pictures.js';

import { reqUrl, reqUrlPic } from '../redux/constants/reqUrl.js';

const EditForm = (props) => {
    const {
        client,
        openOrCloseAction,
        deleteClientAct,
        addPicture,
        duplicateClientAct
    } = props;

    const [stateСlient, setStateClient] = useState(client);
    const [showPopUp, setShowPopUp] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const clientLogo = stateСlient.clientLogo ? stateСlient.clientLogo : {};
    const { contact_email, contact_phone, contact_name, client_name } = stateСlient;

    const logoStyle = clientLogo ?
        {width: `${clientLogo.width}%`, top: `${clientLogo.position_logo_y}%`, left: `${clientLogo.position_logo_x}%`}
        : {};
    const brandStyle = clientLogo ?
        {top: `${clientLogo.position_brand_y}%`, left: `${clientLogo.position_brand_x}%`}
        : {};
    const nameStyle = clientLogo ?
        {top: `${clientLogo.position_name_y}%`, left: `${clientLogo.position_name_x}%`}
        : {};
    const phoneStyle = clientLogo ?
        {top: `${clientLogo.position_phone_y}%`, left: `${clientLogo.position_phone_x}%`}
        : {};
    const contactStyle = clientLogo ?
        {top: `${clientLogo.position_contact_y}%`, left: `${clientLogo.position_contact_x}%`}
        : {};

    useEffect( () => {
        setStateClient({...client});
    }, [client.id]);

    const openOrClosePopUp = (bool, context) => {
        setShowPopUp(bool);
        setIsDelete(context);
    };

    const duplicateClient = async (newName) => {
        const newClient = {...stateСlient,
            client_name: newName
        };
        delete newClient.id;
        delete newClient.author;
        delete newClient.clientLogo;

        duplicateClientAct(reqUrl, newClient)
            .then(res => {
                let newLogo = new FormData();
                newLogo.append('client_id', res.id);
                newLogo.append('logo', clientLogo.logo);
                newLogo.append('author', clientLogo.autor);
                newLogo.append('width', clientLogo.width);

                newLogo.append('position_logo_x', clientLogo.position_logo_x);
                newLogo.append('position_logo_y', clientLogo.position_logo_y);
                newLogo.append('position_name_x', clientLogo.position_name_x);
                newLogo.append('position_name_y', clientLogo.position_name_y);
                newLogo.append('position_phone_x', clientLogo.position_phone_x);
                newLogo.append('position_phone_y', clientLogo.position_phone_y);
                newLogo.append('position_brand_x', clientLogo.position_brand_x);
                newLogo.append('position_brand_y', clientLogo.position_brand_y);
                newLogo.append('position_contact_x', clientLogo.position_contact_x);
                newLogo.append('position_contact_y', clientLogo.position_contact_y);

                newLogo.append("double", true);

                addPicture(reqUrlPic, newLogo);
            }
        );
    };

    const updateLogo = (newClient) => {
        setStateClient(newClient);
    };

    const deleteClient = async  () => {
        const data = {id: stateСlient.id};
        deleteClientAct(reqUrl, data);
    };


    return (
        <div className='edit-client-form'>
            <h3>{client_name}</h3>
            <div className='logo-wrapper'>
                <p className='client_name'
                   style={brandStyle}>
                    {client_name}
                </p>
                <p className='contact_name'
                   style={nameStyle}>
                    {contact_name}
                </p>
                <p className='contact_phone'
                   style={phoneStyle}>
                    {contact_phone}
                </p>
                <p className='contact_email'
                   style={contactStyle}>
                    {contact_email}
                </p>
                {clientLogo.logo ? <img className='client-logo'
                      src={clientLogo.logo}
                      style={logoStyle}
                />
                : ''}
            </div>
            <div className='information-wrapper'>
                <InputsBlock client = {stateСlient} afterUpdate = {updateLogo}/>
                <div className='buttons-wrapper'>
                    <div>
                        <button onClick={() => openOrCloseAction('create-pic', {client: stateСlient, forCreate: false})}>
                            Upload new Logo image
                        </button>
                        <button onClick={() => openOrCloseAction('edit-pic', {client: stateСlient})}> Edit layout </button>
                        <button onClick={() => openOrClosePopUp(true, false)}> Duplicate Client </button>
                        <button onClick={() => openOrClosePopUp(true, true)}> Delete this Client </button>
                    </div>
                    <button className='last-button' onClick={() => openOrCloseAction('create-or-edit')}>Done</button>
                </div>
            </div>
            {showPopUp ?
            <PopUp
                isDelete = {isDelete}
                onClose = {openOrClosePopUp}
                onSubmit = {duplicateClient}
                onDelete = {deleteClient}/>
            : ''}
        </div>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        openOrCloseAction: (key, props) => dispatch(openOrCloseComponentAction(key, props)),
        deleteClientAct: (url, data) => dispatch(DeleteClientAction(url, data)),
        duplicateClientAct: (url, data) => dispatch(AddClientAction(url, data)),
        addPicture: (url, data) => dispatch(addPictureAction(url, data))
    };
};

export default connect(null, mapDispatchToProps) (EditForm);