import httpService from "./http";
import type { Raffle } from "../types/raffle";

// Puedes definir este tipo en el archivo `types/raffle.ts` para reutilizarlo
type RaffleCreateInput = Omit<Raffle, "id" | "tickets" | "userId">;

export async function createRaffleService(
  raffle: RaffleCreateInput
): Promise<Raffle> {
  const response = await httpService.post<Raffle>("/raffle-organizer", raffle);
  return response.data;
}