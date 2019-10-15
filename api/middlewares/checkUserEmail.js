const checkUserEmail = (req, res, next) => {
    if (req.body.user_data.email !== req.body.email) {
        res.error=true;
        next();
    } else {
        res.error = false;
        next();
    }
}


module.exports = {
    checkUserEmail
}