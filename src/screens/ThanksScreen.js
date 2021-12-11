import React, { useReducer, useEffect } from 'react';
import useKeyDown from '../utils/KeyEventListener'
import Screen from '../components/Screen'

function ThanksScreen({ onClose }) {
    useKeyDown('Escape', onClose);

    return (
        <Screen>
            <header>Thanks for your feedback.</header>
            <button title="close" onClick={onClose} />
        </Screen>
    );
}

export default ThanksScreen;