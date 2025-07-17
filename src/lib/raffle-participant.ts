import type { AxiosResponse } from "axios";
import httpService from "./http";
import type { Raffle } from "../context(outdated take for info)/data-context";

export async function getRafflesParticipantsService() {
  const response = await httpService.get(`/raffle-participant`) as AxiosResponse
  return response.data as Raffle[]
}

export async function getRaffleParticipantService(raffleId: string) {
  const response = await httpService.get(`/raffle-participant/${raffleId}`) as AxiosResponse
  return response.data as Raffle
}