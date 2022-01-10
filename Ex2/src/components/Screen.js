import React from 'react';
import useKeyDown from '../utils/KeyEventListener'

function Screen({ children, onSubmit, onClose, testid }) {

    // TODO (Ex 2b) - uncomment the statement below
    useKeyDown('Escape', onClose);

    if (onSubmit) {
        return (
            <section onSubmit={onSubmit} className="screen">
                {children}
            </section>
        );
    }
    return <section className="screen" data-testid={testid}>{children}</section>;
}

export default Screen;