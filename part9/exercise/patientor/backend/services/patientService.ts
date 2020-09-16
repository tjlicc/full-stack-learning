import patients from '../data/patients';
import { Patient, NonSsnPatient, NewPatient } from '../types';

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSsnEntries = (): Array<NonSsnPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(d => d.id === id);
  return patient;
};

const addEntry = (entry: NewPatient): Patient => {
  const newPatient = {
    id: String(Math.random()),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getNonSsnEntries,
  addEntry,
  findById
};