import React from 'react';
import { Feedback } from './App';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { assert } from 'chai';

/**
 * Manual testing.
 */

describe('manual tests', () => {

  it('When "Good" is clicked, the question screen should close', () => {
    const { queryByTestId, getByText } = render(<Feedback />);

    // The 'question screen' should appear at first and...
    assert.ok(queryByTestId('question-screen'));

    // ... once the 'Good' button is clicked...
    fireEvent.click(getByText('Good'));

    // ... the question screen should close.
    assert.isNull(queryByTestId('question-screen'));

  });


  it('When "Bad" is clicked, the question screen should close', () => {
    const { queryByTestId, getByText } = render(<Feedback />);

    assert.ok(queryByTestId('question-screen'));
    fireEvent.click(getByText('Bad'));
    assert.isNull(queryByTestId('question-screen'));

  });

  it('When "Close button" is clicked, the question screen should close', () => {
    const { queryByTestId, getByTitle } = render(<Feedback />);

    assert.ok(queryByTestId('question-screen'));
    fireEvent.click(getByTitle('close'));
    assert.isNull(queryByTestId('question-screen'));
  });

});