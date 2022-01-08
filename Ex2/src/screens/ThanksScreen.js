import React from 'react';
import Screen from '../components/Screen'

function ThanksScreen({ onClose }) {
    return (
        <Screen testid="thanks-screen" onClose={onClose}>
            <header>Thanks for your feedback.</header>
            <button title="close" onClick={onClose} />
        </Screen>
    );
}

export default ThanksScreen;