/** biome-ignore-all lint/nursery/noShadow: Using for pagination */
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as ShadPagination,
} from "@/components/ui/pagination";

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface PaginationProps {
  pagination: PaginationData;
  onPageChange: (page: number) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
  className?: string;
}

export const Pagination = ({
  pagination,
  onPageChange,
  onNextPage,
  onPreviousPage,
  className = "",
}: PaginationProps) => {
  const getVisiblePages = () => {
    const { page: currentPage, totalPages } = pagination;
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, 4);
    } else if (currentPage >= totalPages - 2) {
      pages.push(totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(currentPage - 1, currentPage, currentPage + 1);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();
  const { page: currentPage, totalPages } = pagination;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <ShadPagination>
        <PaginationContent>
          {/* Botão Anterior */}
          <PaginationItem>
            <PaginationPrevious
              className={
                pagination.hasPrev
                  ? "cursor-pointer"
                  : "pointer-events-none opacity-50"
              }
              onClick={onPreviousPage}
            />
          </PaginationItem>

          {totalPages > 5 && currentPage > 3 && (
            <>
              <PaginationItem>
                <PaginationLink
                  className="cursor-pointer"
                  onClick={() => onPageChange(1)}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              {currentPage > 4 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </>
          )}

          {/* Páginas visíveis */}
          {visiblePages.map((pageNum) => (
            <PaginationItem key={pageNum}>
              <PaginationLink
                className="cursor-pointer"
                isActive={pageNum === currentPage}
                onClick={() => onPageChange(pageNum)}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          ))}

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink
                  className="cursor-pointer"
                  onClick={() => onPageChange(totalPages)}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          {/* Botão Próximo */}
          <PaginationItem>
            <PaginationNext
              className={
                pagination.hasNext
                  ? "cursor-pointer"
                  : "pointer-events-none opacity-50"
              }
              onClick={onNextPage}
            />
          </PaginationItem>
        </PaginationContent>
      </ShadPagination>
    </div>
  );
};
