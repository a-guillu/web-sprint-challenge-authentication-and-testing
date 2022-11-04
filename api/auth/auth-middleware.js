const User = require('./auth-model')

const checkUserExists = async (req, res, next) => {
    try {
        const {username} = req.body
        if(!username){
            next({
                message: 'username and password required',
                status: 400
            })
            return
        }
        const newUser = await User.findBy({username})
        if(newUser[0]){
            next({
                status: 422,
                message: "The username is already taken"
            })
        } else {
            next()
        }
    } catch(err) {
        next(err)
    }
}

const validateBody = async (req, res, next) => {
    try {
        const {username, password} = req.body
        console.log('before if statement', username, password)
        if(!username || !password || typeof password !== 'string' || !password.trim() || !username.trim()) {
            next({
                message: 'username and password required',
                status: 400
            })
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    checkUserExists,
    validateBody
}