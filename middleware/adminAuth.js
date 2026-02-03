import JWT from 'jsonwebtoken'
import USER from '../Models/UserModel.js';

const  adminAuth = async (req, res, next) => {
    console.log('Admin');
    console.log(req.headers);
    console.log('      ');

    const authHeader = req.headers['authorization'];
    console.log('authHeader:-', authHeader);

    if (!authHeader) {
        console.log('Autherization header is missing');

        return res.status(401).send('Autherization header is missing')

    }
    const token = authHeader.split(' ')[1]
    console.log('token:=', token);
    if (!token) { 
        console.log('no');

        return res.status(401).send('No token provided, authorization denied')

    }
    try {
        const decode = JWT.verify(token, process.env.jwt_key)
        console.log(decode);
        console.log(decode.id);

        const user = await USER.findById(decode.id)
        console.log(user);
        console.log(user.Mobile = 8086200861 && user.User);

        if (user.Mobile = 8086200861 && user.User) {
            console.log('authorized Admin');
            next()
        } else {
            return res.status(401).json('you are not allowed')

        }
    } catch (error) {
        return res.status(500).json('internal server error')

    }
    // next()
}
export { adminAuth }