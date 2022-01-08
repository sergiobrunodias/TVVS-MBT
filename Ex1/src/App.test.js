import React from 'react';
import { Feedback } from './App';
import { createMachine } from 'xstate';
import { createModel } from '@xstate/test';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { assert } from 'chai';

/**
 * Manual testing.
 */

describe('manual tests', () => {

  // TODO (Ex 1a-i)
  it('When "Good" is clicked, the question screen should close', () => {
    const { /* Function(s) to be used */ } = render(<Feedback />);
    assert.ok(/* TODO */);

    // The 'question screen' should appear at first and...

    // ... once the 'Good' button is clicked...

    // ... the question screen should close.

  });

  // TODO (Ex 1a-ii)
  it('When "Bad" is clicked, the question screen should close', () => {
    const { /* Function(s) to be used */ } = render(<Feedback />);
    assert.ok(/* TODO */);

  });

  // TODO (Ex 1a-iii)
  it('When "Close button" is clicked, the question screen should close', () => {
    const { /* Function(s) to be used */ } = render(<Feedback />);
    assert.ok(/* TODO */);


  });

});

/**
 * Model-based testing.
 */
describe('feedback app', () => {

  /**
   * Defining a state machine that represents the behavior of the app.
   */
  const feedbackMachine = createMachine({
    id: 'feedback',
    // TODO (Ex 1b-ii)
  });

  /**
   * Creating the app model, which includes the state machine defined above and the programmatic definition for each event.
   */
  const appModel = createModel(feedbackMachine).withEvents({
    // TODO (Ex 1b-i)
  });

  /**
   * Automatic test generation based on the model constructed.
   */
  describe('automated tests', () => {
    const testPlans = appModel.getSimplePathPlans();

    testPlans.forEach((plan) => {

      describe(plan.description, () => {
        afterEach(cleanup);

        plan.paths.forEach((path) => {
          it(path.description, () => {
            const rendered = render(<Feedback />);
            return path.test(rendered);
          });
        });
      });
    });

    // TODO (Ex 1b-iii) - uncomment the code snippet below

    /* 
    it('should have full coverage', () => {
      return appModel.testCoverage();
    }); 
    */
  });
});