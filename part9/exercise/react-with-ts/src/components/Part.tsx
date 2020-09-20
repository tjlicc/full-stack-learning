import React from 'react';
import { CoursePart, PartProps } from '../types';

const Part: React.FC<PartProps> = ({ coursePart }) => {
  return (
    <p>
      {getContentOf(coursePart)}
    </p>
  )
}

const getContentOf = (part: CoursePart) => {
  switch (part.name) {
    case 'Fundamentals':
      return `${part.name} ${part.description} ${part.exerciseCount}`;
    case 'Using props to pass data':
      return `${part.name} ${part.exerciseCount} ${part.groupProjectCount}`;
    case 'Deeper type usage':
      return `${part.name} ${part.description} ${part.exerciseCount} ${part.exerciseSubmissionLink}`;
    default:
      return assertNever(part);
  }
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
}

export default Part
