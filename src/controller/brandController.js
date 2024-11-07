import Brand from "../models/brandModel.js";

export const brandRegister = async (req, res) => {
    const { brandName, brandDescription } = req.body;

    try {
        // Check if the required fields are provided
        if (!brandName || !brandDescription) {
            return res.status(400).json({
                message: "Brand name, description, and logo are required",
                success: false
            });
        }

        // Check if the brand already exists
        const checkBrand = await Brand.findOne({ brandName });
        if (checkBrand) {
            return res.status(409).json({
                message: "Brand already registered",
                success: false
            });
        }

        const newBrand = new Brand({
            brandName,
            brandDescription,
        });

        await newBrand.save();

        // Send success response
        res.status(200).json({
            message: "Brand registered successfully",
            success: true,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
