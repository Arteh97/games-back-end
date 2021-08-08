exports.error500 = () => {
    console.log(err.message, '<-- unhandled error');
    res.status(500).send({ msg: "Internal Server Error" })
};

exports.invalidPath = (req, res, next) => {
    res.status(404).send({ msg: "Invalid Path"});
};

exports.customErrors = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ msg: err.msg });
    } else next(err);
};

exports.psqlErrors = (err, req, res, next) => {
    const errCodes = {
        '42703': { msg: 'Bad request', status: 400 },
        '22P02': {  msg: 'Invalid input', status: 400},
        '23502': { msg: 'Invalid request', status: 422 },
        '23503': { msg: 'Resource not found', status: 404 },
        '23505': { msg: 'Relation already exists', status: 400 },
    }
    if (err.code) {
    for (let key in errCodes) {
      if (err.code === key) {
        const { status, msg } = errCodes[key];

        res.status(status).send({ msg });
      }
    }
  } else next(err)

}

