import React, { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { handlePagination } from "../../redux/features/pagination/paginationSlice";

const Pagination = ({ products }) => {
  const pageCount = useSelector((state) => state.pagination.pageCount);
  const [event, setEvent] = useState({});
  const dispatch = useDispatch();
  const handlePageClick = (event) => {
    setEvent(event);
    // dispatch(handlePagination({ event, products }));
  };
  useEffect(() => {
    dispatch(handlePagination({ event, products }));
  }, [dispatch, products, event]);
  return (
    <div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel="< "
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </div>
  );
};

export default Pagination;
