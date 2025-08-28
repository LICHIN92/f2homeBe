import BOOK from "../Models/bookModel.js";
import SUBITEM from "../Models/subItem.js";

const booking = async (req, res) => {
    console.log(req.body);

    try {
        const { SelectedQuantity, Id, Price, User } = req.body;
        const item = await SUBITEM.findById(Id);
        console.log(item);

        if (!item) return res.status(404).json('Item not found');
        if (item.Stock < item.Minimum) {
            return res.status(400).json(`sorry ${item.Name} out of stock`);

        }
        if (SelectedQuantity < item.Minimum)
            return res.status(400).json(`Allowed minimum quantity is ${item.Minimum} `);

        if (SelectedQuantity > item.Stock)
            return res.status(400).json(`Allowed maximum quantity is ${item.Stock}`);

        console.log('ok');
        const data = new BOOK({
            User: User, Quantity: SelectedQuantity, Price: Price, BookedItem: Id
        })
        const savedBook = await data.save()
        console.log(savedBook);

        const updatedItem = await SUBITEM.findByIdAndUpdate(
            Id,
            { $inc: { Stock: -SelectedQuantity } }, // reduce stock
            { new: true } // return updated document
        );

        if (updatedItem.Stock < updatedItem.Minimum) {
            const updatedItemAvailable = await SUBITEM.findByIdAndUpdate(
                Id,
                { Availability: false },
                { new: true }
            );
        }

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
            return res.status(404).json( "Order not found" );
        }
        const itemId = findOrder.BookedItem
        const item = await SUBITEM.findById(itemId)
        if (!item) {
            return res.status(404).json( "Item not found" );
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
export { booking, cancel }  