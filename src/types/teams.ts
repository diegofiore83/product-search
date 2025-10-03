export interface Team {
  idTeam: string;
  strTeam: string;
  strTeamBadge: string | null;
  intFormedYear: string | null;
  strStadium: string | null;
  strLeague: string | null;
  strCountry: string | null;
  strDescriptionEN: string | null;
}

export interface TeamsResponse {
  teams: Team[] | null;
}
