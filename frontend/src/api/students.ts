import { client } from './client';

export interface Student {
    id: number;
    nombre: string;
    email: string;
}

export const findAllStudents = async () => {
    const { data } = await client.get<Student[]>('/student');
    return data;
};
