const whoami = (req, res) => {
    const user = {
        id: req.user._id,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        email: req.user.email,
        is_admin: req.user.is_admin
    }

    return res.status(200).json({
        success: true,
        user
    })
}

module.exports = {
    whoami
}