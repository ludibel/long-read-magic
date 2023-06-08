import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import React from 'react';
import { usePagination, DOTS } from '../hooks/usePagination';
import clsx from 'clsx';
const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 2,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  const paginationItemClass = "px-4 h-8 text-center mx-auto my-2 flex items-center rounded-md border min-w-8 hover:cursor-pointer hover:bg-gray-100"

  return (
    <ul
      className={clsx('flex', { [className]: className })}
    >
      <li
        className={clsx(paginationItemClass, {
          "opacity-50 pointer-events-none": currentPage === 1 
        })}
        onClick={onPrevious}
      >
       <ChevronLeftIcon className="w-5 h-5"/>
      </li>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li className={clsx(paginationItemClass, "border-0 hover:cursor-default hover:bg-transparent")}>&#8230;</li>;
        }

        return (
          <li
            className={clsx(paginationItemClass, {
              "bg-gray-200": pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={clsx(paginationItemClass, {
          "opacity-50 pointer-events-none": currentPage === lastPage
        })}
        onClick={onNext}
      >
        <ChevronRightIcon className="w-5 h-5"/>
      </li>
    </ul>
  );
};

export default Pagination;