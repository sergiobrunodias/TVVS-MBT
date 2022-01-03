import React from 'react';
import { Feedback } from './App';
import { createMachine } from 'xstate';
import { createModel } from '@xstate/test';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { assert } from 'chai';

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
        on: { 
          CLICK_GOOD: 'thanks', 
          CLICK_BAD: 'form',
          CLOSE: 'closed',
          // TODO (Ex 3)
        },
        meta: {
          test: ({ getByTestId }) => {
            assert.ok(getByTestId('question-screen'));
          }
        }
      },
      form: {
        on: {
          SUBMIT: 'thanks',
          CLOSE: 'closed',
          // TODO (Ex 3)
        },
        meta: {
          test: ({ getByTestId }) => {
            assert.ok(getByTestId('form-screen'));
          }
        }
      },
      thanks: {
        on: {
          CLOSE: 'closed',
          // TODO (Ex 3)
        },
        meta: {
          test: ({ getByTestId }) => {
            assert.ok(getByTestId('thanks-screen'));
          }
        }
      },
      closed: {
        type: 'final',
        meta: {
          test: ({ queryByTestId }) => {
            assert.isNull(queryByTestId('question-screen'));
            assert.isNull(queryByTestId('form-screen'));
            assert.isNull(queryByTestId('thanks-screen'));
          }
        }
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
      exec: async ({ getByText }) => {
        fireEvent.click(getByText('Submit'));
      }
    },
    CLOSE: {
      exec: ({ getByTitle }) => {
        fireEvent.click(getByTitle('close'));
      }
    },
    // TODO (Ex 3)
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

    it('should have full coverage', () => {
      return appModel.testCoverage();
    });
  });
});