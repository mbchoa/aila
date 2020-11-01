import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { CuisineTag, CuisineType, Restaurant } from '@aila/api-interfaces';

import { fetchCuisineTypesAtom, fetchRecommendedRestaurantsAtom, stepAtom, tagsAtom } from './atoms';
import { Step } from './types';

import Wizard from './components/Wizard';
import WizardStep from './components/Wizard/Step';

export const App: React.FC = () => {
  const [stepIndex, setStepIndex] = useAtom(stepAtom);
  const [_, setTags] = useAtom(tagsAtom);
  const [selectedCuisineTypes, setSelectedCuisineTypes] = useState({})
  const [selectedRestaurantId, setSelectedRestaurantId] = useState('');
  const [cuisineTypeOptions, fetchCuisineTypes] = useAtom(fetchCuisineTypesAtom);
  const [rankedRestaurants, fetchRankedRestaurants] = useAtom(fetchRecommendedRestaurantsAtom);

  const handleRadioChange = (e: React.FormEvent<HTMLInputElement>) => {
    const tags: CuisineType[] = [(e.target as HTMLInputElement).value as CuisineType];
    setTags(tags as []);
  };

  const handleSubmitTag = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    fetchCuisineTypes();
    setStepIndex(Step.Cuisine);
  };

  const handleToggleCuisineType = (e: React.FormEvent<HTMLInputElement>) => {
    const { checked, id } = e.target as HTMLInputElement
    setSelectedCuisineTypes({
      ...selectedCuisineTypes,
      [id]: checked,
    })
  }

  const handleSubmitSelectedCuisines = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const payload = Object.entries(selectedCuisineTypes).filter(([key, value]) => value).map(([key]) => key);
    fetchRankedRestaurants(payload);
    setStepIndex(Step.Restaurants);
  };

  const handleSelectRestaurant = (e: React.FormEvent<HTMLInputElement>) => {
    setSelectedRestaurantId((e.target as HTMLInputElement).value);
  }

  const handleSubmitSelectedRestaurant = (e: React.FormEvent<HTMLInputElement>) => {
    // TODO: create atom to submit selected restaurant to backend
    e.preventDefault();
  }

  return (
    <div>
      <header>
        <h1>aila</h1>
      </header>
      <main>
        <Wizard stepIndex={stepIndex}>
          <WizardStep headerText="Asian / Non-Asian / No Preference" onSubmit={handleSubmitTag}>
            <input type="radio" id="asian" name="tag" onChange={handleRadioChange} value={CuisineTag.Asian} />
            <label htmlFor="asian">Asian</label>
            <input type="radio" id="non-asian" name="tag" onChange={handleRadioChange} value={CuisineTag.NonAsian} />
            <label htmlFor="non-asian">Non-Asian</label>
            <input type="radio" id="no-pref" name="tag" onChange={handleRadioChange} value={CuisineTag.NoPreference} />
            <label htmlFor="non-asian">No Preference</label>
            <button type="submit">Next</button>
          </WizardStep>
          <WizardStep headerText="What are you craving?" onSubmit={handleSubmitSelectedCuisines}>
            <ul>
              {cuisineTypeOptions.map((type: CuisineType) => (
                <li key={type}>
                  <input type="checkbox" id={type} name="cuisine-type" onChange={handleToggleCuisineType} checked={!!selectedCuisineTypes[type]} />
                  <label htmlFor={type}>{type}</label>
                </li>
              ))}
            </ul>
            <button type="submit">Submit</button>
          </WizardStep>
          <WizardStep headerText="Here are your recommendations!" onSubmit={handleSubmitSelectedRestaurant}>
            <ul>
              {rankedRestaurants.map((restaurant: Restaurant) => (
                <ol key={restaurant._id}>
                  <input
                    type="radio"
                    id={restaurant._id}
                    name={restaurant.name}
                    value={restaurant._id}
                    onChange={handleSelectRestaurant}
                    checked={restaurant._id === selectedRestaurantId}
                  />
                  <label htmlFor={restaurant.name}>{restaurant.name}</label>
                </ol>
              ))}
            </ul>
          </WizardStep>
        </Wizard>
      </main>
    </div>
  );
};

export default App;
