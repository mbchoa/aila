import React from 'react';
import { useAtom } from 'jotai';
import { CuisineTag, CuisineType } from '@aila/api-interfaces';

import { fetchRestaurantsAtom, stepAtom, tagsAtom } from './atoms';
import { Step } from './types';

import Wizard from './components/Wizard';
import WizardStep from './components/Wizard/Step';

export const App: React.FC = () => {
  const [stepIndex, setStepIndex] = useAtom(stepAtom);
  const [restaurants, fetchRestaurants] = useAtom(fetchRestaurantsAtom);
  const [_, setTags] = useAtom(tagsAtom);
  const cuisineTypes: CuisineType[] = [...new Set(restaurants.map(({ cuisineType }) => cuisineType))];

  const handleRadioChange = (e: React.FormEvent<HTMLInputElement>) => {
    const tags: CuisineType[] = [(e.target as HTMLInputElement).value as CuisineType];
    setTags(tags as []);
  };

  const handleSubmitTag = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    fetchRestaurants();
    setStepIndex(Step.Cuisine);
  };

  const handleSubmitSelectedCuisines = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <header>
        <h1>aila</h1>
      </header>
      <main>
        <Wizard stepIndex={stepIndex}>
          <WizardStep headerText="Asian / Non-Asian" onSubmit={handleSubmitTag}>
            <input type="radio" id="asian" name="tag" onChange={handleRadioChange} value={CuisineTag.Asian} />
            <label htmlFor="asian">Asian</label>
            <input type="radio" id="non-asian" name="tag" onChange={handleRadioChange} value={CuisineTag.NonAsian} />
            <label htmlFor="non-asian">Non-Asian</label>
            <button type="submit">Next</button>
          </WizardStep>
          <WizardStep headerText="What are you craving?" onSubmit={handleSubmitSelectedCuisines}>
            <ul>
              {cuisineTypes.map((type: CuisineType) => (
                <li key={type}>
                  {type}
                </li>
              ))}
            </ul>
            <button type="submit">Submit</button>
          </WizardStep>
        </Wizard>
      </main>
    </div>
  );
};

export default App;
