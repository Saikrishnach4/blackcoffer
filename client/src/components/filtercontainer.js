import React, { useState } from 'react';
import Filters from './filters';
import Dashboard from './dashboard';

const FilterContainer = () => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    // Implement your logic to handle filter change
    console.log('Filters changed:', newFilters);
    // Update state or perform other actions based on filters
    setFilters(newFilters);
  };

  return (
    <div>
      <Filters onFilterChange={handleFilterChange} />
      <Dashboard filters={filters} />
    </div>
  );
};

export default FilterContainer;
