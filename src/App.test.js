import React from 'react';
import { Feedback } from './App';
import { Machine } from 'xstate';
import { createModel } from '@xstate/test';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { assert } from 'chai';

describe('manual tests', () => {
  it('When "Good" is clicked, the Thanks screen should appear', () => {
    const { getByText } = render(<Feedback />);

    assert.ok(getByText('How was your experience?'));

    fireEvent.click(getByText('Good'));

    assert.ok(getByText('Thanks for your feedback.'));
  });

  it('When "Bad" is clicked, the Form screen should appear', () => {
    const { getByText } = render(<Feedback />);

    assert.ok(getByText('How was your experience?'));

    fireEvent.click(getByText('Bad'));

    assert.ok(getByText('Care to tell us why?'));
  });
});

describe('feedback app', () => {
  const feedbackMachine = Machine({
    id: 'feedback',
    initial: 'question',
    states: {
      question: {
        on: {
          CLICK_GOOD: 'thanks',
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

  const appModel = createModel(feedbackMachine).withEvents({
    CLICK_GOOD: {
      exec: ({getByText}) => {
        fireEvent.click(getByText('Good'));
      }
    },
    CLICK_BAD: {
      exec: ({getByText}) => {
        fireEvent.click(getByText('Bad'));
      }
    },
    SUBMIT: {
      exec: ({getByPlaceholderText}, event) => {
        fireEvent.change(getByPlaceholderText('Complain here'), {
          target: { value: event.value }
        });
      }
    },
    CLOSE: {
      exec: ({getByTitle}) => {
        fireEvent.click(getByTitle('close'));
      }
    },
    ESC: {
      exec: ({baseElement}) => {
        fireEvent.keyDown(baseElement, { key: 'Escape' });
      }
    }
  });

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
