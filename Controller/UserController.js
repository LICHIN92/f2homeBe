import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import USER from '../Models/UserModel.js';
import { placAllowed, postOffice } from '../place/Place.js';

const Signin = async (req, res) => {
    console.log(req.body);
    const saltRound = 10
    try {
        const { FirstName, LastName, Mobile, Password } = req.body
        const isMobile = await USER.findOne({ Mobile: Mobile })
        if (!isMobile) {
            const hashedPassword = await bcrypt.hash(Password, saltRound)
            console.log(hashedPassword);
            const data = new USER({
                FirstName: FirstName, LastName: LastName, Mobile: Mobile, Password: hashedPassword
            })
            const savedUser = await data.save()
            console.log(savedUser);

            savedUser.Password = undefined
            console.log(savedUser);
            const payload = {
                id: savedUser._id,
                FirstName: savedUser.FirstName,
                IsAddress: savedUser.isAddress,
                User:savedUser.User
            }
            const token = await jwt.sign(payload, process.env.jwt_key)
            console.log(token);

            return res.status(200).json({ message: 'Signin Succesfully', token: token })
        }

    } catch (error) {
        console.log(error)
    }
}

const login = async (req, res) => {
    const { UserMobile, UserPassword } = req.body
    console.log(req.body);

    try {
        const finduser = await USER.findOne({ Mobile: UserMobile });
        console.log(finduser);

        if (finduser) {
            const isPswrd = await bcrypt.compare(UserPassword, finduser.Password)
            console.log(isPswrd);
            if (isPswrd) {
                const payload = {
                    id: finduser._id,
                    FirstName: finduser.FirstName,
                    IsAddress: finduser.isAddress,
                    User:finduser.User
                }
                const token = await jwt.sign(payload, process.env.jwt_key)
                return res.status(200).json({ message: 'succesfully Login', token: token })
            }
            console.log('invalid Password');
            
            return res.status(400).json('invalid Password')
 
        }
        return res.status(400).json('invalid Mobile')

    } catch (error) {
        console.log(error);
        return res.status(500).json('internal server error')
    }

}

const address = async (req, res) => {
    console.log(req.body);
    console.log(req.params);

    const { HouseName, Place, Post, PIN } = req.body
    // console.log(placAllowed);

    console.log(req.params);


    try {

        const allowPIN = postOffice.includes(PIN)
        console.log(allowPIN);
        if (!allowPIN) {
            console.log(`Unable to deliver to this ${PIN} code.`);

            return res.status(400).json(`Unable to deliver to this ${PIN} code.`)
        }
        const findUser = await USER.findById(req.params.id)
        console.log(findUser);

        if (findUser) {
            const UserUpdate = await USER.findByIdAndUpdate(req.params.id, {
                Place: Place, HouseName: HouseName, Post: Post, PIN: PIN, isAddress: true
            }, { new: true })
            console.log(UserUpdate);
            const payload = {
                id: UserUpdate._id,
                FirstName: UserUpdate.FirstName,
                IsAddress: UserUpdate.isAddress
            }
            const token = await jwt.sign(payload, process.env.jwt_key)
            console.log(token);

            return res.status(200).json({ message: 'Address is Added', token: token })
        }

        return res.status(400).json(`user is not found`)

    } catch (error) {
        console.log(error);
        
    } 
}
export { login, Signin, address } 