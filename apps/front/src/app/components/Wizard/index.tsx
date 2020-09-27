import React from 'react';

type Props = {
  stepIndex: number;
};

const Wizard: React.FC<Props> = ({ children, stepIndex }) => (
  <div>{React.Children.toArray(children)[stepIndex]}</div>
);

export default Wizard;
