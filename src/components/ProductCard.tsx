import { Card, CardActionArea, CardContent, CardHeader, Typography, Stack, Box } from '@mui/material';
import type { Product } from '../types/product';

export default function ProductCard({ product }: { product: Product }) {
  const subtitle = [product.brand, product.category].filter(Boolean).join(' • ');

  return (
    <Card sx={{ height: '100%' }}>
      <CardActionArea>
        <CardHeader
          avatar={
            <Box
              component="img"
              src={product.thumbnail}
              alt={product.title}
              sx={{ width: 44, height: 44, borderRadius: 0, objectFit: 'cover', display: 'block', bgcolor: 'grey.200' }}
            />
          }
          title={product.title}
          subheader={subtitle}
        />
        <CardContent>
          <Stack spacing={0.5}>
            <Typography variant="body2">Price: ${product.price}</Typography>
            {product.description && (
              <Typography
                variant="body2"
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {product.description}
              </Typography>
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
