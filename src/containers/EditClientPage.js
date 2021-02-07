import React, { useState, useEffect } from 'react';
import EditForm from './EditForm.js';

import { connect } from 'react-redux';
import { clientsFatchDataAction, openOrCloseComponentAction } from '../redux/actions/clients.js';
import { picturesFatchDataAction } from '../redux/actions/pictures.js';
import { connectClientsWithPic } from '../redux/actions/baseAction.js';

import { reqUrlForGetting, urlGettingPic } from '../redux/constants/reqUrl.js';

const EditClientPage = (props) => {
    const {
        getAllClients,
        getAllPictures,
        allClients,
        allPictures,
        connectAll,
        ClientsInfo,
        openOrClose,
        openOrCloseAction
    } = props;


    const [activeClient, setActive] = useState(false);
    const [clients, setClients] = useState(allClients);

    const user_id = document.querySelector('#user_id').getAttribute('value');
    const data = {
        user_id: user_id,
    };

    useEffect( () => {
        getAllClients(reqUrlForGetting, data);
        getAllPictures(urlGettingPic, data);
    }, []);// getting all data

    useEffect( () => {
        if (clients.length > allClients.length) setActive(false);
        setClients(allClients);
    }, [allClients]); //after delete

    useEffect( () => {
        if (ClientsInfo.length) {
            connectAll(ClientsInfo, allPictures);
            console.log('connectAll!');
        }
    }, [allPictures, ClientsInfo]); // to connect pictures and clients

    useEffect( () => {
        if (openOrClose.props.id) {
            const clientAfterUpd = allClients.find(client => client.id === openOrClose.props.id);
            setActive(openOrClose.props);
        }
    }, [allPictures]);

    const showClientForm = (client) => {
        if (!activeClient || activeClient.id !== client.id) setActive(client);
    };

    return (
        <div className='edit-client-wrapper'>
                <div className='all-clients-wrapper'>
                    <h3>Choose a Client to Edit</h3>
                    <div className='list-wrapper'>
                        <ul>
                            {allClients.map(client => {
                                return (<li key={client.id}
                                            className={activeClient && client.id === activeClient.id ? 'active' : ''}
                                            onClick={() => showClientForm(client)}>
                                        {client.client_name}
                                    </li>)
                            })}
                        </ul>
                    </div>
                </div>
                    {activeClient ? <EditForm client = {activeClient} /> : ''}
        </div>
    )
};

const mapStateToProps = state => {
    return {
        state,
        ClientsInfo: state.clientReducer,
        allPictures: state.picturesReducer,
        allClients: state.baseReducer,
        openOrClose: state.openOrCloseComponentReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllClients: (url, data) => dispatch(clientsFatchDataAction(url, data)),
        getAllPictures: (url, data) => dispatch(picturesFatchDataAction(url, data)),
        connectAll: (clients, logos) => dispatch(connectClientsWithPic(clients, logos)),
        openOrCloseAction: (key, props) => dispatch(openOrCloseComponentAction(key, props))
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (EditClientPage);