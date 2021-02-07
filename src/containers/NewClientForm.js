import React, { useState } from 'react';
import InputsBlock from './InputsBlock.js';
import NewPicture from './NewPicture.js';
import { connect } from 'react-redux';

const NewClientForm = (props) => {
const { openOrClose } = props;

    return (
        <div className='new-client-wrapper'>
            { openOrClose.key === 'create-client' ?
                <InputsBlock forCreate = {true} client = {openOrClose.props}/>
                : '' }
        </div>
    )
};

const mapStateToProps = state => {
    return {
        state,
        openOrClose: state.openOrCloseComponentReducer
    };
};

export default connect(mapStateToProps) (NewClientForm);