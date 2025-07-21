import React from 'react';
import { Card, CardContent, Skeleton } from '@mui/material';

const BookCardSkeleton = () => (
  <div data-testid="book-card-skeleton">
    <Card sx={{ height: '100%', width: '100%' }}>
      <Skeleton variant="rectangular" height={280} />
      <CardContent>
        <Skeleton variant="text" sx={{ fontSize: '1rem', mb: 1 }} />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
      </CardContent>
    </Card>
  </div>
);

export default BookCardSkeleton;