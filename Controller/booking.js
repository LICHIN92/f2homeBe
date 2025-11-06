import BOOK from "../Models/bookModel.js";
import SUBITEM from "../Models/subItem.js";

const booking = async (req, res) => {
    console.log(req.body);

    try {
        const { SelectedQuantity, Id, Price, User } = req.body;
        const item = await SUBITEM.findById(Id);
        console.log(item);

        if (!item) {
            return res.status(404).json('Item not found')
        };

        if (!item.Availability) {    //not available
            return res.status(400).json(`sorry ${item.Name} is available now`);

        }

        if (item.Stock < item.Minimum) {
            return res.status(400).json(`sorry ${item.Name} out of stock`);

        }
        if (SelectedQuantity < item.Minimum)
            return res.status(400).json(`Allowed minimum quantity is ${item.Minimum} `);

        if (SelectedQuantity > item.Stock)
            return res.status(400).json(`Allowed maximum quantity is ${item.Stock}`);

        console.log('ok');
        const data = new BOOK({
            User: User, Quantity: SelectedQuantity, Price: Price, BookedItem: Id, Item: item.Item, Name: item.Name
        })
        const savedBook = await data.save()
        console.log(savedBook);

        const updatedItem = await SUBITEM.findByIdAndUpdate(
            Id,
            { $inc: { Stock: -SelectedQuantity } }, // reduce stock
            { new: true } // return updated document
        );
        console.log('item', updatedItem);

        // if (updatedItem.Stock < updatedItem.Minimum) {
        //     const updatedItemAvailable = await SUBITEM.findByIdAndUpdate(
        //         Id,
        //         { Availability: false },
        //         { new: true }
        //     );
        // } 

        return res.status(200).json('Booking successful');
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
};

const cancel = async (req, res) => {
    const id = req.params.id
    console.log(id);

    try {
        const findOrder = await BOOK.findById(id)
        console.log(findOrder);
        if (!findOrder) {
            return res.status(404).json("Order not found");
        }
        const itemId = findOrder.BookedItem
        const item = await SUBITEM.findById(itemId)
        if (!item) {
            return res.status(404).json("Item not found");
        }
        console.log(item);
        const current = item.Stock
        const quantity = findOrder.Quantity
        if (item) {
            const updatedItem = await SUBITEM.findByIdAndUpdate(
                itemId,
                { $inc: { Stock: +quantity } }, // reduce stock
                { new: true } // return updated document
            );
            console.log(updatedItem);
            if (updatedItem) {
                const deleting = await BOOK.findByIdAndDelete(id)
                return res.status(200).json("Your order is canceled")
            } else {
                console.log("Item not found!");
            }
        }

    } catch (error) {
        res.status(500).json("Server error while canceling order");
    }
}

const orders = async (req, res) => {
    console.log(orders);

    try {
        // const fetch = await BOOK.find().populate({ path: 'BookedItem', select: ['Name', 'Pic','Item'] }).populate({
        //     path: "User", select: ['FirstNmae', 'LastName', 'Mobile', 'Housename', 'Place', 'Post']
        // })
        // console.log(fetch);


        const fetch = await BOOK.aggregate([{ $group: { _id: "$Item", total: { $sum: 1 } } }])
        //  .populate({ path: 'BookedItem', select: ['Name', 'Pic','Item'] })
        console.log(fetch);



        // const groupedByItemName = fetch.reduce((acc, booking) => {
        //     // get the name of the booked item
        //     const item = booking.BookedItem?.Item || 'Unknown Item';

        //     // create a key for each unique item name
        //     if (!acc[item]) acc[item] = [];

        //     // push the booking into its group
        //     acc[item].push(booking);

        //     return acc; 
        // }, {});
        // console.log(groupedByItemName,'jhhggjhjhhjjh');
        // console.log(Object.keys(groupedByItemName)[0]); 

        return res.status(200).json(fetch)
    } catch (error) {
        console.log(error);
        return res.status(500).json('internal server error')
    }
}

const itemorder = async (req, res) => {
    console.log(req.params.item);
    const item = req.params.item
    try {
        const data = await BOOK.find({ Item: item })
        console.log(data);
        const dataa = await BOOK.aggregate([
            { $match: { Item: item } },
            { $group: { _id: "$Name", total: { $sum: 1 } } }
        ])
        console.log(dataa);

        return res.status(200).json(dataa)
    } catch (error) {
        console.log(error);
        return res.status(500).json(` internal server error`)
    }
}

const Details = async (req, res) => {
    const Name = req.params.Name
    console.log(Name);

    try {
        const data = await BOOK.find({ Name: Name })
            .populate({ path: "User", select: ['FirstName', "LastName", "Mobile", "HouseName", 'Place', "Post"] })
        console.log(data);
        return res.status(200).json(data)
    } catch (error) {
        console.log(error);
        return res.status(500).json(`internal server error`)

    }
}

export { booking, cancel, orders, itemorder, Details }     