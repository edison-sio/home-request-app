const errorController = (err) => {
    console.log(err);
    return {
        'error': err,
    }
}

module.exports = { errorController };