import { AxiosError } from 'axios';
import { client } from './client';

export const createAssignment = async (estudianteId: number, sesionId: number) => {
    try {
        const { data } = await client.post('/assignment', {
            estudianteId,
            sesionId,
        });
        return data;
    } catch (error) {
        const axiosError = error as AxiosError;
        const response = axiosError.response?.data as { message: string };
        const message = response.message || 'Error en la solicitud';

        throw new Error(message);
    }
};
