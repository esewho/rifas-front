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

export async function deleteRaffleService(raffleId: string): Promise<void> {
	const response = await httpService.delete(`/raffle-organizer/${raffleId}`, {
		withCredentials: true,
	})
	if (response.status !== 204) {
		throw new Error("Failed to delete raffle")
	}
}

export async function updateRaffleService(
  raffleId: string,
  formData: FormData,
): Promise<Raffle> {
  const response = await httpService.put<Raffle>(
    `/raffle-organizer/${raffleId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    },
  );
  return response.data;
}
