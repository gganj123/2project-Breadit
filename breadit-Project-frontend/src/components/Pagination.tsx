import styled from 'styled-components';

type Pagination = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

interface PageNumberProps {
  active?: boolean;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: Pagination) => {
  const pageNumbers: number[] = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <PaginationWrapper>
      {pageNumbers.map((pageNumber) => (
        <PageNumber
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          active={pageNumber === currentPage} // active 속성을 사용
        >
          {pageNumber}
        </PageNumber>
      ))}
    </PaginationWrapper>
  );
};

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PageNumber = styled.button<PageNumberProps>`
  border: none;
  background: none;
  cursor: pointer;
  margin: 0 5px;
  font-size: 16px;
  color: ${(props) => (props.active ? '#FFCB46' : '#333')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
`;

export default Pagination;
