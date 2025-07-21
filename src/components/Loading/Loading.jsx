import React from 'react';
import BookCardSkeleton from '../BookCardSkeleton/BookCardSkeleton';

const Loading = () => {
  const skeletonCount = 20;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 items-stretch">
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <BookCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default Loading;