import React from 'react';
import useKeyDown from '../utils/KeyEventListener'
import Screen from '../components/Screen'

function QuestionScreen({ onClickGood, onClickBad, onClose }) {
    useKeyDown('Escape', onClose);

    return (
        <Screen testid="question-screen">
            <header>How was your experience?</header>
            <button onClick={onClickGood} data-variant="good">
                Good
            </button>
            <button onClick={onClickBad} data-variant="bad">
                Bad
            </button>
            <button title="close" onClick={onClose} />
        </Screen>
    );
}

export default QuestionScreen;