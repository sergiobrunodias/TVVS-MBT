import React from 'react';
import { Feedback } from './App';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { assert } from 'chai';

/**
 * Manual testing.
 */

describe('manual tests', () => {

  it('When "Good" is clicked, the question screen should close', () => {
    const { /* Function(s) to be used */ } = render(<Feedback />);

    // The 'question screen' should appear at first and...
    // TODO (Ex 3)


    // ... once the 'Good' button is clicked...
    // TODO (Ex 3)

    // ... the question screen should close.
    // TODO (Ex 3)
  });

  
  it('When "Bad" is clicked, the question screen should close', () => {
    // TODO (Ex 3)
  });

  it('When "Close button" is clicked, the question screen should close', () => {
    // TODO (Ex 3)
  });

});