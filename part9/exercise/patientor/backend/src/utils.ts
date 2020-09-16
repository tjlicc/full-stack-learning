/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NewPatient, Gender } from '../types';

interface StringParserFunc {
  (str: any): string;
}

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const stringParser = (key: string): StringParserFunc => {
  const func = (str: any): string => {
    if (!str || !isString(str)) {

      throw new Error(`Incorrect or missing ${key}: ` + str);
    }

    return str;
  };

  return func;
};

const parseName = stringParser('name');
const parseSsn = stringParser('ssn');
const parseOccupation = stringParser('occupation');

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation)
  };
};

export default toNewPatient;