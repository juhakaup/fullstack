import diagnoseData from '../../data/diagnoses';
import { Diagnose } from '../types';

const diagnoses: Diagnose[] = diagnoseData as Diagnose[];

const getDiagnoses = (): Diagnose[] => {
    return diagnoses;
};

export default {
    getDiagnoses
};