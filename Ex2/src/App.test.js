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
    initial: 'question',
    states: {
      question: {
        on: {
          CLICK_GOOD: 'thanks', // TODO (Ex 2a-4)
          CLICK_BAD: 'form', // TODO (Ex 2a-4)
          CLOSE: 'closed',
          ESC: 'closed'
        },
        meta: {
          test: ({ queryByTestId }) => {
            assert.ok(queryByTestId('question-screen'));
          }
        }
      },
      form: {
        on: {
          CLOSE: 'closed',
          SUBMIT: 'thanks',
          ESC: 'closed'
        },
        meta: {
          test: ({ queryByTestId }) => {
            assert.ok(queryByTestId('form-screen'));
          }
        }
      },
      thanks: {
        on: {
          CLOSE: 'closed',
          ESC: 'closed'
        },
        meta: {
          test: ({ queryByTestId }) => {
            assert.ok(queryByTestId('thanks-screen'));
          }
        }
      },
      closed: {
        type: 'final',
        meta: {
          test: ({ queryByTestId }) => {
            assert.isNull(queryByTestId('question-screen'));
            assert.isNull(queryByTestId('thanks-screen'));
            assert.isNull(queryByTestId('form-screen'));

          }
        }
      },
      // TODO (Ex 2a-3)
    }
  });

  /**
   * Creating the app model, which includes the state machine defined above and the programmatic definition for each event.
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
    CLOSE: {
      exec: ({ getByTitle }) => {
        fireEvent.click(getByTitle('close'));
      }
    },
    SUBMIT: {
      exec: ({ getByText }) => {
        fireEvent.click(getByText('Submit'));
      }
    },
    ESC: {
      exec: ({ baseElement }) => {
        fireEvent.keyDown(baseElement, { key: 'Escape' });
      }
    }
    // TODO (Ex 2a-1)
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