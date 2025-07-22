import httpService from "./http";
import type { Raffle } from "../types/raffle";

export async function getRafflesParticipantsService(filterStatus: string) {
  const response = await httpService.get<Raffle[]>("/raffle/participant", {
    params: {
      status: filterStatus !== "all" ? filterStatus : undefined,
    },
  });

  return response.data;
}

export async function getRaffleParticipantService(id: string) {
  const response = await httpService.get(`/raffle/participant/${id}`)
  return response.data as Raffle
}