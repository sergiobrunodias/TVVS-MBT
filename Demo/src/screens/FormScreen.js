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
    >
      <form data-testid="form-screen">
        <header>Care to tell us why?</header>
        <textarea
          name="response"
          placeholder="Complain here"
        />
        <button>Submit</button>
        <button title="close" type="button" onClick={onClose} />
      </form>
    </Screen>

  );
}

export default FormScreen