import { EventItem } from "@/components/sesion-list/SesionList"
import { client } from "./client"

export const findAllSesions = async () => {
    const { data } = await client.get<EventItem[]>('/sesion')
    return data
}