import React, { useState, useEffect } from 'react';

import NewClientForm from './NewClientForm.js';
import EditClientPage from './EditClientPage.js';
import EditPicture from './EditPicture.js';
import NewPicture from './NewPicture.js';
import { connect } from 'react-redux';
import { openOrCloseComponentAction } from '../redux/actions/clients.js';

const CreateOrEdit = (props) => {
    const { openOrCloseAction, openOrClose } = props;
    const { clientName } = openOrClose.props;
        return (
            <div className = 'create-or-edit'>
                {clientName ? <h3 className='client-name-saved'> {clientName} has been saved</h3> : ''}
                {openOrClose.key === 'create-or-edit' ?
                    <div className='choice-form-wrapper'>
                        {console.log('openOrClose.props ', openOrClose.props)}
                        <button onClick={() => openOrCloseAction('create-client')}>Create new Client</button>
                        <p>Or</p>
                        <button onClick={() => openOrCloseAction('edit-client')}>Edit an existing Client</button>
                    </div>
                    : ''}

                {openOrClose.key === 'create-client' ? <NewClientForm /> : ''}
                {openOrClose.key === 'edit-client' ? <EditClientPage /> : ''}
                {openOrClose.key === 'create-pic' ? <NewPicture logo = {openOrClose.props}/> : ''}
                {openOrClose.key === 'edit-pic' ? <EditPicture logo = {openOrClose.props}/> : ''}
            </div>
        )
    };

const mapStateToProps = state => {
    return {
        state,
        openOrClose: state.openOrCloseComponentReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        openOrCloseAction: (key, props) => dispatch(openOrCloseComponentAction(key, props))
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (CreateOrEdit);