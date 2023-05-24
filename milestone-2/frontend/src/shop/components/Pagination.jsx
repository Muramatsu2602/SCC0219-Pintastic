import React from 'react';

const Pagination = ({ currentPage, totalPages, onChangePage }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onChangePage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onChangePage(currentPage + 1);
    }
  };

  return (
    <div>
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span>{currentPage}</span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
