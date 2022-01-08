import React from 'react';
import Screen from '../components/Screen'

function FormScreen({ onSubmit, onClose }) {
  return (
    <Screen
      onSubmit={e => {
        e.preventDefault();
        const { response } = e.target.elements;

        onSubmit({
          value: response
        });
      }}
      onClose={onClose}
    >
      <form data-testid="form-screen">
        <header>Care to tell us why?</header>
        <textarea
          name="response"
          placeholder="Complain here"
          onKeyDown={e => {
            if (e.key === 'Escape') {
              e.stopPropagation();
            }
          }}
        />
        <button>Submit</button>
        <button title="close" type="button" onClick={onClose} />
      </form>
    </Screen>
  );
}

export default FormScreen