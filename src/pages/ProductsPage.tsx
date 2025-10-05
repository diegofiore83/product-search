import { useQuery } from '@tanstack/react-query';
import Grid from '@mui/material/Grid2';
import { TextField, Typography, Alert, CircularProgress, Box } from '@mui/material';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types/product';
import { fetchProducts } from '../services/api';

export default function ProductsPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products', 'base'],
    queryFn: () => fetchProducts(100),
    staleTime: 60_000
  });

  const products: Product[] = data?.products ?? [];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      {/* TODO: implement product search considering performance optimization using react best practises */}
      <TextField placeholder="Search products …" fullWidth size="small" sx={{ mb: 2 }} />

      {isLoading && (
        <Box sx={{ display: 'grid', placeItems: 'center', py: 8 }}>
          <CircularProgress aria-label="loading" />
        </Box>
      )}

      {isError && <Alert severity="error">{(error as Error)?.message ?? 'Failed to load products.'}</Alert>}

      {!isLoading && !isError && (
        <Grid container spacing={2}>
          {products.map(p => (
            <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductCard product={p} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
