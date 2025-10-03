import { useQuery } from '@tanstack/react-query';
import { fetchTeams } from '../services/api';
import { Grid, TextField, Typography, Alert, CircularProgress, Box } from '@mui/material';
import TeamCard from '../components/TeamCard';
import type { Team } from '../types/teams';
import React from 'react';

export default function TeamsPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['teams', 'serie-a'],
    queryFn: fetchTeams
  });

  // 🔎 Exercise hook — wire this up in the take‑home (intentionally not finished)
  const [query, setQuery] = React.useState('');

  const teams: Team[] = data?.teams ?? [];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Italian Serie A Teams
      </Typography>

      {/* Candidate task: add debounced search, memoized filtering */}
      <TextField
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search teams… (e.g., Napoli)"
        fullWidth
        size="small"
        sx={{ mb: 2 }}
        inputProps={{ 'aria-label': 'search teams' }}
      />

      {isLoading && (
        <Box sx={{ display: 'grid', placeItems: 'center', py: 8 }}>
          <CircularProgress aria-label="loading" />
        </Box>
      )}

      {isError && <Alert severity="error">{(error as Error)?.message ?? 'Failed to load teams.'}</Alert>}

      {!isLoading && !isError && (
        <Grid container spacing={2}>
          {teams.map(t => (
            <Grid key={t.idTeam} item xs={12} sm={6} md={4} lg={3}>
              <TeamCard team={t} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
