import React, { useReducer } from 'react';
import ThanksScreen from './screens/ThanksScreen'
import QuestionScreen from './screens/QuestionScreen'
import FormScreen from './screens/FormScreen'

function feedbackReducer(state, event) {
  switch (state) {
    case 'question':
      switch (event.type) {
        case 'GOOD':
          return 'thanks';
        case 'BAD':
          return 'form';
        case 'CLOSE':
          return 'closed';
        default:
          return state;
      }
    case 'form':
      switch (event.type) {
        case 'SUBMIT':
          return 'thanks';
        case 'CLOSE':
          return 'closed';
        default:
          return state;
      }
    case 'thanks':
      switch (event.type) {
        case 'CLOSE':
          return 'closed';
        default:
          return state;
      }
    default:
      return state;
  }
}

export function Feedback() {
  const [state, send] = useReducer(feedbackReducer, 'question');

  switch (state) {
    case 'question':
      return (
        <QuestionScreen
          onClickGood={() => send({ type: 'GOOD' })}
          onClickBad={() => send({ type: 'BAD' })}
          onClose={() => send({ type: 'CLOSE' })}
        />
      );
    case 'form':
      return (
        <FormScreen
          onSubmit={value => send({ type: 'SUBMIT', value })}
          onClose={() => send({ type: 'CLOSE' })}
        />
      );
    case 'thanks':
      return <ThanksScreen onClose={() => send({ type: 'CLOSE' })} />;
    case 'closed':
    default:
      return null;
  }
}

export function App() {
  return (
    <main className="app">
      <Feedback />
    </main>
  );
}

export default App;
