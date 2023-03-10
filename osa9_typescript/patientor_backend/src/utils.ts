import { Entry, Gender, NewPatient, EntryType, Discharge, SickLeave, EntryWithoutId, Diagnose } from "./types";

export const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const patient: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: new Array<Entry>,
        };

        return patient;
    }

    throw new Error('Incorrect data: some fields are missing');
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('type' in object && 'description' in object && 'date' in object && 'specialist' in object) {
        const entryBase = {
            type: parseEntryType(object.type),
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object)
        };


        if (entryBase.type === EntryType.HealthCheck && 'healthCheckRating' in object) {
            const rating = parseHealthCheckRating(object.healthCheckRating);
            const entry = { healthCheckRating: rating, ...entryBase };
            return entry as EntryWithoutId;
        }

        if (entryBase.type === EntryType.Hospital && 'discharge' in object) {
            const dis = parseDischarge(object.discharge);
            const entry = { discharge: dis, ...entryBase };
            return entry as EntryWithoutId;
        }

        if (entryBase.type === EntryType.OccupationalHealthcare && 'employerName' in object) {
            const entry = { employerName: parseEmployerName(object.employerName), ...entryBase };
            if ('sickLeave' in object) {
                const sickLeave = parseSickLeave(object.sickLeave);
                const sickleaveEntry = {sickLeave: sickLeave, ...entry};
                return sickleaveEntry as EntryWithoutId;
            }
            return entry as EntryWithoutId;
        }
    }
    throw new Error('Incorrect or missing data');
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [] as Array<Diagnose['code']>;
    }
    return object.diagnosisCodes as Array<Diagnose['code']>;
  };

const parseSickLeave = (object: unknown): SickLeave => {
    if (!object || typeof object !== 'object' || !('startDate' in object) || !('endDate' in object)) {
        throw new Error('Incorrect or missing sick leave');
    }
    const newSickLeave = {
        startDate: parseDate(object.startDate),
        endDate: parseDate(object.endDate)
    };
    return newSickLeave as SickLeave;
};

const parseEmployerName = (employer: unknown): string => {
    if (!employer || !isString(employer)) {
        throw new Error('Incorrect or missing employer');
    }
    return employer;
};

const parseDischarge = (object: unknown): Discharge => {
    if (!object || typeof object !== 'object' || !('date' in object) || !('criteria' in object)) {
        throw new Error('Incorrect or missing discharge data');
    }
    const newDischarge = {
        date: parseDate(object.date),
        criteria: parseCriteria(object.criteria)
    };
    return newDischarge as Discharge;
};

const parseEntryType = (type: unknown): EntryType => {
    if (!type || !isString(type)) {
        throw new Error('Incorrect or missing type');
    }
    return type as EntryType;
};

const parseCriteria = (criteria: unknown): string => {
    if (!criteria || !isString(criteria)) {
        throw new Error('Incorrect or missing type');
    }
    return criteria;
};

const parseDescription = (desc: unknown): string => {
    if (!desc || !isString(desc)) {
        throw new Error('Incorrect or missing description');
    }
    return desc;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist');
    }
    return specialist;
};

const parseHealthCheckRating = (rating: unknown): number => {
    if (isNaN(Number(rating))) {
        throw new Error('Incorrect or missing health check rating');
    }
    return Number(rating);
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const isString = (str: unknown): str is string => {
    return typeof str === 'string' || str instanceof String;
};

const parseDate = (dob: unknown): string => {
    if (!dob || !isString(dob) || !isDate(dob)) {
        throw new Error('Incorrect or missing date of birth');
    }
    return dob;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(gender);
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};
