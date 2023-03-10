import patientData from '../../data/patients';
import { Patient, NewPatient, Entry, EntryWithoutId } from '../types';
import { v4 as uuidv4 } from 'uuid';

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
    return patients;
};

const getPatient = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id);
};

const addPatient = ( patient: NewPatient ): Patient => {
    const id = uuidv4();
    const newPatient = {
        id: id,
        ...patient
    };
    patients.push(newPatient);
    return newPatient;
};

const addEntry = (entry: EntryWithoutId, patientId: string): Entry => {
    const id = uuidv4();
    
    const newEntry = {
        id: id,
        ...entry
    };

    const patient = patients.find(patient => patient.id === patientId);
    if (patient) {
        patient.entries = patient.entries.concat(newEntry);
    }

    return newEntry;
};

export default {
    getPatients,
    addPatient,
    getPatient,
    addEntry
};