import React, { useReducer } from 'react';

import QuestionScreen from './screens/QuestionScreen'

function feedbackReducer(state, event) {
  switch (state) {
    case 'question':
      switch (event.type) {
        case 'GOOD':
          return 'closed';
        case 'BAD':
          return 'closed';
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
