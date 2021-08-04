exports.error500 = () => {
    console.log(err, '<-- unhandled error');
    res.status(500).send({ msg: "Internal Server Error" })
};

exports.invalidPath = (req, res, next) => {
    // console.log(err);
    res.status(404).send({ msg: "Invalid Path"});
};

exports.customErrors = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ msg: err.msg });
    } else next(err);
};

exports.psqlErrors = (err, req, res, next) => {
    const errCodes = {
        '22P02': {  msg: "Bad Request", status: 400},
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

