// pagination/Pagination.jsx
import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PaginationBasic = () => {
  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className="d-flex justify-content-center my-4">
      <Pagination>{items}</Pagination>
    </div>
  );
};

export default PaginationBasic;
