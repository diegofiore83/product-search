import { Card, CardActionArea, CardContent, CardHeader, Avatar, Typography, Stack } from '@mui/material';
import type { Team } from '../types/teams';

interface Props {
  team: Team;
}

export default function TeamCard({ team }: Props) {
  const subtitle = [team.strCountry, team.strLeague].filter(Boolean).join(' • ');
  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea>
        <CardHeader avatar={<Avatar src={team.strTeamBadge ?? undefined} alt={team.strTeam} />} title={team.strTeam} subheader={subtitle} />
        <CardContent>
          <Stack spacing={0.5}>
            {team.intFormedYear && <Typography variant="body2">Founded: {team.intFormedYear}</Typography>}
            {team.strStadium && <Typography variant="body2">Stadium: {team.strStadium}</Typography>}
            {team.strDescriptionEN && (
              <Typography variant="body2" sx={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {team.strDescriptionEN}
              </Typography>
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
