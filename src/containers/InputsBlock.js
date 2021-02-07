import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
    AddClientAction,
    UpdateClientAction,
    DeleteClientAction,
    openOrCloseComponentAction
} from '../redux/actions/clients.js';
import { reqUrl } from '../redux/constants/reqUrl.js';

const InputsBlock = (props) => {
    const {
        client,
        allClients,
        forCreate,
        openOrClose,
        openOrCloseAction,
        addClientAct,
        updateClientAct,
        deleteClientAct,
        afterUpdate
    } = props;

    const emptyClient = {
        client_name: '',
        contact_name: '',
        contact_phone: '',
        contact_email: '',
        url_click: ''
    }

    const clientId = !forCreate ? client.id : '';
    const [stateСlient, setStateClient] = useState(client.id ? client : emptyClient);
    const [savedClassName, setClassName] = useState('');

    useEffect( () => {
        if (client.id) setStateClient({...client});
        setClassName('');
    }, [clientId]);

    const handleChange = event => {
        setStateClient({
            ...stateСlient,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async () => {
        if (stateСlient === emptyClient) return;

        if (!stateСlient.id) {
            await addClientAct(reqUrl, {...stateСlient})
                .then(res => {
                    openOrCloseAction('create-pic', { client: res, forCreate: forCreate ? true : false });
                });
        } else {
            const clientForReq = {...stateСlient};
            delete clientForReq.clientLogo;

            await updateClientAct(reqUrl, {...clientForReq})
                .then(res => {
                    if (forCreate) {
                        const fullRes = { client: res, forCreate: true };
                        openOrCloseAction('create-pic', fullRes);
                    } else {
                        setClassName('saved');
                        setTimeout(() => setClassName(''), 2000);
                        afterUpdate({...res, clientLogo: stateСlient.clientLogo});
                    };
                });
        };
    };

    const cancelCreate = async () => {
        if (forCreate) {
            const data = {id: stateСlient.id};
            deleteClientAct(reqUrl, data);
        };
        openOrCloseAction('create-or-edit');
    };

        return (
            <div className='forms-wrapper'>
                <div >
                    {forCreate ?
                        <form>
                            <p>Client name - appears in your client library only</p>
                            <input name = 'client_name'
                                   value = {stateСlient.client_name}
                                   onChange = {handleChange}
                            />
                        </form>
                        : ''}
                    <form>
                        <p>Contact name</p>
                        <input name = 'contact_name'
                               value = {stateСlient.contact_name}
                               onChange = {handleChange}
                        />
                    </form>
                    <form>
                        <p>Contact phone number</p>
                        <input name = 'contact_phone'
                               value = {stateСlient.contact_phone}
                               onChange = {handleChange}
                        />
                    </form>
                    <form>
                        <p>Contact email</p>
                        <input name = 'contact_email'
                               value = {stateСlient.contact_email}
                               onChange = {handleChange}
                        />
                    </form>
                    <form>
                        <p>Click through URL</p>
                        <input name = 'url_click'
                               value = {stateСlient.url_click}
                               onChange = {handleChange}
                        />
                    </form>
                </div>
                <div className='save-cancel-wrapper'>
                    {forCreate ?
                        <button className = 'last-button' onClick={cancelCreate}> Cancel </button>
                        : ''}
                    <button className = 'last-button' onClick = {handleSubmit}>
                        {forCreate ? 'Save and upload image' : 'Save'}
                    </button>
                    {forCreate ? '' : <p className={savedClassName}> Contact details saved </p>}
                </div>
            </div>
        )
    }

const mapStateToProps = state => {
    return {
        state,
        allClients: state.baseReducer,
        openOrClose: state.openOrCloseComponentReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addClientAct: (url, data) => dispatch(AddClientAction(url, data)),
        updateClientAct: (url, data) => dispatch(UpdateClientAction(url, data)),
        deleteClientAct: (url, data) => dispatch(DeleteClientAction(url, data)),
        openOrCloseAction: (key, props) => dispatch(openOrCloseComponentAction(key, props))
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (InputsBlock);