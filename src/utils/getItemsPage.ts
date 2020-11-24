const getItemsPage = (arr: Array<any>, pageSize: number, currentPage: number): Array<any> => {
  let startElem: number;
  let endElem: number;

  if (currentPage === 1) {
    startElem = 0;
    endElem = pageSize;
  } else {
    startElem = currentPage * pageSize - pageSize;
    endElem = startElem + currentPage;
  }

  return arr = arr.slice(startElem, endElem);
};

export default getItemsPage;
