import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-6">

      {/* Go to First Page */}
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(1)}
          className="px-3 py-1 rounded border text-sm text-white"
        >
          First (1)
        </button>
      )}

      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {/* Current Page */}
      <span className="px-3 py-1 border rounded text-sm bg-blue-600 text-white font-semibold">
        {currentPage}
      </span>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-3 py-1 rounded border text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>

      {/* Go to Last Page */}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-1 rounded border text-sm text-white"
        >
          Last ({totalPages})
        </button>
      )}
    </div>
  );
};

export default Pagination;
