/**
 * Example of Manual Testing.
 */
it('When "Good" is clicked, the Thanks screen should appear', () => {
    const { getByText } = render(<Feedback />);

    // The 'question screen' should appear at first and...
    assert.ok(getByText('How was your experience?'));

    // ... once the 'Good' button is clicked...
    fireEvent.click(getByText('Good'));

    // ... the 'thanks screen' should be visible.
    assert.ok(getByText('Thanks for your feedback.'));
});


/**
 * How to define a state machine in a test file.
 */
const stateMachine = createMachine(
    {
        id: 'stateMachineId',
        initial: 'initialState', // Initial state, in our app 'question'
        states: { // Each key of 'states' represents a state of the app.
            initialState: {
                on: { // The 'on' property contains all the possible transitions from a given state.
                    ACTION_NAME: 'nextState' // For example, it is possible to move from the state 'question' to the state 'thanks' by clicking the 'good button'.
                },
                meta: { // The 'meta' property contains additional information about the state.

                    test: ({ getByTestId }) => { // The 'test' property contains a function that is executed when the state is reached.

                        // The 'getByTestId' function is provided by the '@testing-library/react' library. It allows to get elements by their 'data-testid' attribute.
                        // If the test is not found, the function will throw an error and the test will fail.
                        assert.ok(getByTestId('nextState-screen'));

                        // The 'queryByTestId' function allows to find elements by their 'data-testid' attribute and returns null if the element is not found.
                        // It is useful to check if an element is not present in the DOM.
                        assert.isNull(queryByTestId('nextState-screen'));
                    }
                }
            },
            nextState: {
                // ... 
            }
        }
    }
);

/**
 * data-testid example.
 */
<section className="screen" data-testid="nextState-screen">...</section>

/**
 * How to define actions in a test file.
 */
const appModel = createModel(stateMachine).withEvents({
    ACTION_NAME: {
        exec: ({ getByText }) => {
            fireEvent.click(getByText('buttonText'));
        }
    }
});

/**
 * Create tests
 */
describe('App', () => {
    // Define the state machine here

    // Define the actions/model here

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