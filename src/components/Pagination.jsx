import React from 'react';

const Pagination = ({
  page,
  totalPages,
  pageSize,
  handleNextPage,
  handlePrevPage,
  handlePageSizeChange
}) => {
  return (
    <>
      <div className="pagination-container">
        <button onClick={handlePrevPage} disabled={page === 1}>Anterior</button>
        <span>Página {page} de {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages}>Siguiente</button>
      </div>
      <div className="pagination-container">
        <span>Tamaño de Página:</span>
        <button onClick={() => handlePageSizeChange(10)} disabled={pageSize === 10}>10</button>
        <button onClick={() => handlePageSizeChange(25)} disabled={pageSize === 25}>25</button>
        <button onClick={() => handlePageSizeChange(50)} disabled={pageSize === 50}>50</button>
      </div>
    </>

  );
};

export default Pagination;
