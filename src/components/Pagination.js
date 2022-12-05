import Pagination from "react-js-pagination";
// pagination for the file page;
//set props of Pagination component according to react-js-paginatoin component (Pagination)
// We set active page, total item counts, items count per page, on change handler as props
const Paging = ({ page, count, itemsCountPerPage, setOnChangeHandler }) => {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={itemsCountPerPage}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      prevPageText={"<"}
      nextPageText={">"}
      onChange={setOnChangeHandler}
    ></Pagination>
  );
};
export default Paging;
