import ITEM from "../Models/itemModel.js";
import SUBITEM from "../Models/subItem.js";
import USER from "../Models/UserModel.js";

const getItem = async (req, res) => {
    try {
        const getItem = await ITEM.find()
        console.log(getItem);
        res.status(200).json({ getItem })
    } catch (error) {

    }
}
const view = async (req, res) => {
    console.log('view');
    const item = req.params.item
    console.log(req.params.item);

    try {
        const data = await SUBITEM.find({ Item: item })
        console.log(data);
        // if (data.length > 0) {
        return res.status(200).json(data)
        // }
        // return res.status(201).json(`no ${item} are added`)
    } catch (error) {
        return res.status(500).json('interal server error')
    }
}
const viewItem = async (req, res) => {
    console.log('viewItem');
    const id = req.params.id
    console.log(req.params);

    try {
        const data = await SUBITEM.findById(id)
        console.log(data);

        return res.status(200).json(data)

    } catch (error) {
        console.log(error);

        return res.status(500).json('interal server error')

    }
}

const search = async (req, res) => {

    console.log(req.body);
    const name = req.body.search
    try {
        const data = await ITEM.find({
            Item: { $regex: name, $options: 'i' }  // ✅ fix here
        });
        console.log(data);

    } catch (error) {
        console.log(error);

        return res.status(500).json('internal server error')
    }
}

const viewProfile = async (req, res) => {
    console.log(req.params.id);
    try {
        const data = await USER.findById(req.params.id)
        data.Password = null
        console.log(data);
        return res.status(200).json(data)
    } catch (error) {
        console.log(data);
        return res.status(500).json(`internal server error`)
    }
}
export { getItem, view, viewItem, search, viewProfile }   