import React from 'react';
import Screen from '../components/Screen'

function ThanksScreen({ onClose }) {
    // TODO (Ex 3)
    
    return (
        <Screen testid="thanks-screen">
            <header>Thanks for your feedback.</header>
            <button title="close" onClick={onClose} />
        </Screen>
    );
}

export default ThanksScreen;