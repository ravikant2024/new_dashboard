const Brand=require("../models/Brand")

// Create a new brand
exports.createBrand = async (req, res) => {
    try {
      const { name } = req.body;
  
      // Check if brand name is provided
      if (!name) {
        return res.status(400).json({ message: 'Brand name is required' });
      }
  
      const newBrand = new Brand({ name });
      await newBrand.save();
  
      res.status(201).json({
        message: 'Brand created successfully',
        brand: newBrand
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };



exports.getAll=async(req,res)=>{
    try {
        const result=await Brand.find({})
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error fetching brands"})
    }
}