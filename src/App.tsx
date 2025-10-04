import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

export default function App() {
  return (
    <Box>
      <Box component="main" sx={{ py: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
