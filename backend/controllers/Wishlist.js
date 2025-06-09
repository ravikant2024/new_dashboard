const Wishlist = require("../models/Wishlist")

exports.create=async(req,res)=>{
    try {
        const created=await new Wishlist(req.body).populate({path:"product",populate:["brand"]})
        await created.save()
        res.status(201).json(created)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error adding product to wishlist, please try again later"})
    }
}
exports.getByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        let skip = 0;
        let limit = 0;

        if (req.query.page && req.query.limit) {
            const pageSize = req.query.limit;
            const page = req.query.page;

            skip = pageSize * (page - 1);
            limit = pageSize;
        }

        // Fetch wishlist items and populate product and brand
        const result = await Wishlist.find({ user: id })
            .skip(skip)
            .limit(limit)
            .populate({
                path: "product",
                populate: ["brand"]
            });

        // Modify the result to include the base URL for images
        const baseUrl = req.protocol + '://' + req.get('host') + '/';

        result.forEach(item => {
            if (item.product) {
                // Modify image paths to include the base URL
                if (item.product.images) {
                    item.product.images = item.product.images.map(image => baseUrl + image);
                }
                if (item.product.thumbnail) {
                    item.product.thumbnail = baseUrl + item.product.thumbnail;
                }
            }
        });

        // Count total results
        const totalResults = await Wishlist.find({ user: id }).countDocuments().exec();
    

        // Set total count in the response header
        res.set("X-Total-Count", totalResults);

        // Send the result
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching your wishlist, please try again later" });
    }
};

exports.updateById=async(req,res)=>{
    try {
        const {id}=req.params
        const updated=await Wishlist.findByIdAndUpdate(id,req.body,{new:true}).populate("product")
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error updating your wishlist, please try again later"})
    }
}
exports.deleteById=async(req,res)=>{
    try {
        const {id}=req.params
        const deleted=await Wishlist.findByIdAndDelete(id)
        return res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error deleting that product from wishlist, please try again later"})
    }
}