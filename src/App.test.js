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
  it('When "Good" is clicked, the Thanks screen should appear', () => {
    const { getByText } = render(<Feedback />);

    // The 'question screen' should appear at first and...
    assert.ok(getByText('How was your experience?'));

    // ... once the 'Good' button is clicked...
    fireEvent.click(getByText('Good'));

    // ... the 'thanks screen' should be visible.
    assert.ok(getByText('Thanks for your feedback.'));
  });

  it('When "Bad" is clicked, the Form screen should appear', () => {
    const { getByText } = render(<Feedback />);

    assert.ok(getByText('How was your experience?'));

    fireEvent.click(getByText('Bad'));

    assert.ok(getByText('Care to tell us why?'));
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
    initial: 'question', // Initial state
    states: { // Each key of 'states' represents a state of the app.
      question: {
        on: { // The 'on' property contains all the possible transitions from a given state.
          CLICK_GOOD: 'thanks', // For example, it is possible to move from the state 'question' to the state 'thanks' by clicking the 'good button'.
          CLICK_BAD: 'form',
          CLOSE: 'closed',
          ESC: 'closed'
        }
      },
      form: {
        on: {
          SUBMIT: 'thanks',
          CLOSE: 'closed',
          ESC: 'closed'
        }
      },
      thanks: {
        on: {
          CLOSE: 'closed',
          ESC: 'closed'
        }
      },
      closed: {
        type: 'final'
      }
    }
  });

  /**
   * Creating the app model, which encompasses both the state machine defined above and the programmatic definition for each event.
   */
  const appModel = createModel(feedbackMachine).withEvents({
    CLICK_GOOD: {
      exec: ({ getByText }) => {
        fireEvent.click(getByText('Good'));
      }
    },
    CLICK_BAD: {
      exec: ({ getByText }) => {
        fireEvent.click(getByText('Bad'));
      }
    },
    SUBMIT: {
      exec: ({ getByPlaceholderText }, event) => {
        fireEvent.change(getByPlaceholderText('Complain here'), {
          target: { value: event.value }
        });
      }
    },
    CLOSE: {
      exec: ({ getByTitle }) => {
        fireEvent.click(getByTitle('close'));
      }
    },
    ESC: {
      exec: ({ baseElement }) => {
        fireEvent.keyDown(baseElement, { key: 'Escape' });
      }
    }
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
  });
});
