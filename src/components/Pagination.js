import Pagination from "react-js-pagination";
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
