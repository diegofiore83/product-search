import { Outlet, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

export default function App() {
  return (
    <Box>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
            Football Teams
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ py: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
