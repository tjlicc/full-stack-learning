import React from 'react';
import { ContentProps } from '../types';
import Part from './Part';

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <>
      {courseParts.map(coursePart => <Part coursePart={coursePart} key={coursePart.name}></Part>)}
    </>
  );
}

export default Content;
