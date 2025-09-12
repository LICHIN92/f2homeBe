import cloudinaryInstance from "../config/cloudinary.js";
import ITEM from "../Models/itemModel.js";
import cloudinary from 'cloudinary'
import SUBITEM from "../Models/subItem.js";

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
                Minimum:Minimum
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

export { additem, addProduct }