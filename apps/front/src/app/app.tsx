import React from 'react';
import { useRecoilState } from 'recoil';

import { stepState } from './atoms';
import { Step } from './types';

import Wizard from './components/Wizard';
import WizardStep from './components/Wizard/Step';

export const App: React.FunctionComponent = () => {
  const [stepIndex, setStepIndex] = useRecoilState(stepState);

  const handleNextClick = (step) => () => {
    setStepIndex(step);
  };

  const handleSubmitSelectedCuisines = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <header>
        <h1>aila</h1>
      </header>
      <main>
        <Wizard stepIndex={stepIndex}>
          <WizardStep>
            <h2>Asian / Non-Asian ?</h2>
            <button onClick={handleNextClick(Step.Cuisine)}>Next</button>
          </WizardStep>
          <WizardStep>
            <h2>What are you craving?</h2>
            <form onSubmit={handleSubmitSelectedCuisines}>
              <button type="submit">Submit</button>
            </form>
          </WizardStep>
        </Wizard>
      </main>
    </div>
  );
};

export default App;
