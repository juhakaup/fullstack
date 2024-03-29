import express from 'express';
import patientService from '../services/patientService';
import { toNewEntry, toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = patientService.getPatient(id);
    if (patient) {
        res.send(patient);
    } else {
        res.status(404);
    }
});

router.post('/:id/entries', (req, res) => {
    const id = req.params.id;
    try {
        const entry = toNewEntry(req.body);
        const savedEntry = patientService.addEntry(entry, id);
        res.send(savedEntry);
    } catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.post('/', (req, res) => {
    try {
        const patient = toNewPatient(req.body);
        const savedPatient = patientService.addPatient(patient);
        res.send(savedPatient);
    } catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;