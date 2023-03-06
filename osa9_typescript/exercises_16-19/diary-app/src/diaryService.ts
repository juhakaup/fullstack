import axios from "axios";
import { DiaryEntry, newDiaryEntry } from './types';

const baseUrl = 'http://localhost:3001/api/diaries';

export const getAllDiaries = () => {
    return axios
        .get<DiaryEntry[]>(baseUrl)
        .then(response => response.data);
}

export const addNewDiary = async (newEntry: newDiaryEntry) => {
    try {
        const response = await axios.post<DiaryEntry>(baseUrl, newEntry)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data);
        }
    }
}