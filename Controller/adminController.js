import cloudinaryInstance from "../config/cloudinary.js";
import ITEM from "../Models/itemModel.js";
import cloudinary from 'cloudinary'
import SUBITEM from "../Models/subItem.js";
import USER from "../Models/UserModel.js";

const additem = async (req, res) => {
    console.log('admin ');
    console.log(req.file);
    console.log(req.body.item);

    try {
        const exist = await ITEM.findOne({ Item: req.body.item })
        if (!exist) {
            console.log(exist);
            console.log('not exist');
            const folderName = 'F2Home'
            const file = await cloudinaryInstance.uploader.upload(req.file.path, {
                public_id: `${folderName}/${req.file.originalname.split('.'[0])}`,
            })
            console.log(file);
            const newItem = new ITEM({
                Item: req.body.item,
                pic: file.secure_url
            })
            newItem.save()
            return res.status(200).json('successfully Added')
        }
        return res.status(400).json(`${req.body.item} is already exist`)
    } catch (error) {
        return res.status(500).json('internal server error')
    }

}

const addProduct = async (req, res) => {
    console.log('addProduct');
    console.log(req.body);

    const { Item, Name, Price, Stock, Minimum } = req.body;
    console.log(req.file);

    try {
        const exist = await SUBITEM.findOne({ Name: Name, Item: Item });
        console.log('Exist:', exist);

        if (!exist) {
            console.log('Not exist');

            const folderName = 'F2Home';
            const subFolderName = 'Products';

            // Ensure req.file is available
            if (!req.file || !req.file.path) {
                return res.status(400).json({ message: 'Image file is required' });
            }

            const file = await cloudinaryInstance.uploader.upload(req.file.path, {
                public_id: `${folderName}/${subFolderName}/${req.file.originalname.split('.')[0]}`,
            });

            console.log('Uploaded to Cloudinary:', file);

            const data = new SUBITEM({
                Item,
                Name,
                Price,
                Pic: file.secure_url,
                Stock: Stock,
                Minimum: Minimum
            });

            await data.save();

            return res.status(201).json({ message: 'Product added successfully', product: data });
        }

        console.log('Already exists');
        return res.status(409).json({ message: 'Product already exists' });

    } catch (error) {
        console.error('Error in addProduct:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const searchItem = async (req, res) => {
    console.log('search');
    console.log(req.body.item);
    const item = req.body.item
    try {
        const findData = await ITEM.find({ Item: { $regex: item, $options: 'i' } })
        console.log(findData);

        if (findData) {
            return res.status(200).json(findData)
        }
        return res.status(200).json('no data')

    } catch (error) {
        console.log(error);

    }
}

const EditItem = async (req, res) => {
    console.log('edit item');
    console.log(req.body);
    const { newName, id } = req.body
    try {
        const finditem = await ITEM.findById(id)

        if (finditem) {
            console.log(finditem);
            const update = await ITEM.findByIdAndUpdate(id, { Item: newName }, { new: true })
            console.log(update);

            return res.status(200).json(`Item Updated succesfuly`)
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(`Internal server error`)

    }
}

const searchProduct = async (req, res) => {
    console.log('search product');
    console.log(req.body);
    const name = req.body.product
    try {
        const data = await SUBITEM.find({ Name: { $regex: name, $options: 'i' } })
        if (data) {
            console.log(data);

            return res.status(200).json(data)

        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(`internal server error`)
    }
}

const EditProduct = async (req, res) => {
    console.log("edit Product");
    console.log(req.body.product);
    const { _id, Name, Price, Availability, Stock, Minimum } = req.body
    try {
        const findP = await SUBITEM.findById(_id)
        console.log(findP);
        if (findP) {
            const updating = await SUBITEM.findByIdAndUpdate(_id,
                { Name: Name, Price: Price, Stock: Stock, Minimum: Minimum, Availability: Availability }, { new: true }
            )

            console.log(updating, 'updated');

            return res.status(200).json(`${Name} is Updated Succesfully`)

        }
        return res.status(404).json('fond found')
    } catch (error) {
        console.log(error);
        return res.status(500).json('internal server error')

    }
}

const user = async (req, res) => {
    console.log('users');

    try {
        const data = await USER.find({ User: false })
        console.log(data);
        return res.status(200).json(data)

    } catch (error) {
        console.log(error);

        return res.status(500).json('internal server error')
    }
}

const findUser = async (req, res) => {
    console.log('finduser');
    console.log(req.query.mobile);
    const mobile = req.query.mobile
    try {
        const user = await USER.find({ Mobile: mobile })
        console.log(user);
        if (user.length == 0) {
            console.log('not found');

            return res.status(400).json('user not fond')
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        return res.status(500).json(`Internal server error`)

    }
}

const deleteUser = async (req, res) => {
    console.log('Delete User');
    console.log(req.query.id);
    const id = req.query.id
    try {
        const user = await USER.findById(id)
        if (!user) {
            console.log('not found');

            return res.status(404).json(`This Account is not found`)

        }
        if (user.User) {
            console.log(user);
            console.log('Admin Account');

            return res.status(404).json(`Can't delete this Account`)
        }

        const deletingUser = await USER.findByIdAndDelete(id)
        return res.status(200).json(` Account Deleted Successfully`)

    } catch (error) {
        return res.status(500).json(`Internal server error`)

    }
}
export { additem, addProduct, searchItem, EditItem, searchProduct, EditProduct, user, findUser, deleteUser }