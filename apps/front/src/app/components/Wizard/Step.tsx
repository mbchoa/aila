import React from 'react';

type Props = {
  headerText: string,
  onSubmit: (e: React.FormEvent) => void,
};

const Step: React.FC<Props> = ({ children, headerText, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <h2>{headerText}</h2>
    {children}
  </form>
);

export default Step;
