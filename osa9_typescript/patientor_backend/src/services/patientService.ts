import patientData from '../../data/patients';
import { Patient, NewPatient } from '../types';
import { v4 as uuidv4 } from 'uuid';

const patients: Patient[] = patientData as Patient[];

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

export default {
    getPatients,
    addPatient,
    getPatient
};