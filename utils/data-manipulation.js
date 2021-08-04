// extract any functions you are using to manipulate your data, into this file

const createRefObj = (arr, ref1, ref2) => {
    const refObj = {};
    arr.forEach((object) => {
        refObj[object[ref1]] = object[ref2]
    })
    return refObj;
};


const formatData = (arrOfObjs) => {
    const copy = [...arrOfObjs];
    const result = copy.map((object) => {
        let newArr = []
        for (const key in object) {

            newArr.push(object[key])
        }
        return newArr;
    })
    return result;
}

const checkSort = (sort_by, columns) => {
    if (columns.includes(sort_by)) return sort_by;
    else return Promise.reject({ status: 400, msg: "Invalid sort_by query"})
};

const checkOrder = (order) => {
    const orderQ = order.toLowerCase();
    if (orderQ === 'asc' || 'desc') return orderQ
    else return Promise.reject({ status: 400, msg: "Invaid order query"})

};

module.exports = { formatData, createRefObj, checkSort, checkOrder };