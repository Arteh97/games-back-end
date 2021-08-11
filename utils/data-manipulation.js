const createRefObj = (arr, ref1, ref2) => {
    const refObj = {};
    arr.forEach((object) => {
        refObj[object[ref1]] = object[ref2]
    })
    return refObj;
};


const formatData = (arrOfObjs, columnOrder) => {
    const copy = [...arrOfObjs];
    const result = copy.map((object) => {
        let newArr = [];
        columnOrder.forEach((copy) => {
            newArr.push(object[copy])
        }) 
        return newArr;
    })
    return result;
}

const checkSort = (sort_by, columns) => {
    const sort = sort_by.toLowerCase();
    const validSort = columns.includes(sort)
    return validSort
    ? sort
    : Promise.reject({ status: 400, msg: "Invalid sort query"})
};

const checkOrder = (order) => {
const lowerCaseOrder = order.toLowerCase();
  const validOrder = ['asc', 'desc'].includes(lowerCaseOrder);
  return validOrder
    ? lowerCaseOrder
    : Promise.reject({ status: 400, msg: 'Invalid order query' });
};



module.exports = { formatData, createRefObj, checkSort, checkOrder };