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
  const feedbackMachine = createMachine(
    {
      id: 'stateMachineId',
      initial: 'initialState', // Initial state
      states: { // Each key of 'states' represents a state of the app.
        initialState: {
          on: { // The 'on' property contains all the possible transitions from a given state.
            CLICK_GOOD: 'closed',
            CLICK_BAD: 'closed',
            CLOSE: 'closed' // Defines that it is possible to move from the state 'initialState' to the state 'nextState' by executing the 'ACTION_NAME' action.
          },
          meta: { // The 'meta' property contains additional information about the state.

            test: ({ queryByTestId }) => { // The 'test' property contains a function that is executed when the state is reached.

              assert.ok(queryByTestId('question-screen'));

            }
          }
        },
        closed: {
          meta: {
            type: 'final',
            test: ({ queryByTestId }) => {
              assert.isNull(queryByTestId('question-screen'));
            }
          }
        }
      }
    }
  );

  /**
   * Creating the app model, which includes the state machine defined above and the programmatic definition for each event.
   */
  const appModel = createModel(feedbackMachine).withEvents({
    CLOSE: {
      exec: ({ getByTitle }) => {
        fireEvent.click(getByTitle('close'));
      },
    },
    CLICK_GOOD: {
      exec: ({ getByText }) => {
        fireEvent.click(getByText('Good'));
      }
    },
    CLICK_BAD: {
      exec: ({ getByText }) => {
        fireEvent.click(getByText('Bad'));
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

    // TODO (Ex 1b-iii) - uncomment the code snippet below

    it('should have full coverage', () => {
      return appModel.testCoverage();
    });

  });
});