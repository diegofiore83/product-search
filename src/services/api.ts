import type { TeamsResponse } from '../types/teams';

// Public, no key: returns all teams for a league (example: Italian Serie A)
// Docs: https://www.thesportsdb.com/api.php (free test key: 3)
const TEAMS_URL = 'https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=Italian%20Serie%20A';

export async function fetchTeams(): Promise<TeamsResponse> {
  const res = await fetch(TEAMS_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<TeamsResponse>;
}
