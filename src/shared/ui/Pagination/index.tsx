import React from 'react';
import * as S from './Pagination.styles';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}) => {
  if (totalPages <= 1) return null;

  const pages = [];

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  if (startPage > 1) {
    pages.push(
      <S.PageButton key={1} onClick={() => onPageChange(1)}>
        1
      </S.PageButton>,
    );
    if (startPage > 2) {
      pages.push(<span key="start-ellipsis">...</span>);
    }
  }

  for (let i = startPage; i <= endPage; i += 1) {
    pages.push(
      <S.PageButton
        key={i}
        isActive={i === currentPage}
        onClick={() => onPageChange(i)}
      >
        {i}
      </S.PageButton>,
    );
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pages.push(<span key="end-ellipsis">...</span>);
    }
    pages.push(
      <S.PageButton key={totalPages} onClick={() => onPageChange(totalPages)}>
        {totalPages}
      </S.PageButton>,
    );
  }

  return (
    <S.Container>
      <S.PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </S.PageButton>
      {pages}
      <S.PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </S.PageButton>
    </S.Container>
  );
};

export default Pagination;
