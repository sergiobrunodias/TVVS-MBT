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
        initial: 'initialState', // Initial state
        states: { // Each key of 'states' represents a state of the app.
            initialState: {
                on: { // The 'on' property contains all the possible transitions from a given state.
                    ACTION_NAME: 'nextState' // Defines that it is possible to move from the state 'initialState' to the state 'nextState' by executing the 'ACTION_NAME' action.
                },
                meta: { // The 'meta' property contains additional information about the state.

                    test: ({ getByTestId, queryByTestId }) => { // The 'test' property contains a function that is executed when the state is reached.

                        // The 'getByTestId' function is provided by the '@testing-library/react' library.
                        // It can be used to get DOM elements by their 'data-testid' attribute. 
                        // In our case, we are passing the 'data-testid' as 'testid' to the 'Screen' component.

                        // If the element is not found, the function will throw an error and the test will fail.
                        assert.ok(getByTestId('initialState-screen'));

                        // The 'assert.isNull' is useful to check if an element is not present in the DOM.
                        // In this case, it is better to use the 'queryByTestId' function instead, since it returns null if the element is not found.
                        assert.isNull(queryByTestId('initialState-screen'));
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
            // The 'getByTitle' function might be useful to get DOM elements by their 'title' attribute.
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