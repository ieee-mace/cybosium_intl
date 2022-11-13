const isAdmin = () => {
    return (req, res, next) => {
        console.log("is admin middleware")
        if (req.user.is_admin === true) {
            next();
        } else {
            res.status(401).json({
                status: false,
                message: 'You are not authorized to access this resource.'
            });
        }
    };
}

module.exports = isAdmin;