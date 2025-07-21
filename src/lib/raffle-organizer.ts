import httpService from "./http"
import type { Raffle } from "../types/raffle"

export async function createRaffleService(raffle: FormData): Promise<Raffle> {
	const response = await httpService.post<Raffle>("/raffle-organizer", raffle, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	})
	return response.data
}
