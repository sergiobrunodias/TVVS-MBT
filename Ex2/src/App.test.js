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
          CLICK_GOOD: 'closed', // TODO (Ex 2)
          CLICK_BAD: 'closed', // TODO (Ex 2)
          CLOSE: 'closed'
        },
        meta: {
          test: ({ queryByTestId }) => {
            assert.ok(queryByTestId('question-screen')); 
          }
        }
      },
      closed: {
        type: 'final',
        meta: { 
          test: ({ queryByTestId }) => { // Tests to be executed while in the 'question' state
            assert.isNull(queryByTestId('question-screen'));
          }
        }
      },
      // TODO (Ex 2)
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
    // TODO (Ex 2)
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