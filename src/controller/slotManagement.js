import Slot from "../models/slotModel.js";

export const createSlot = async (req, res) => {
    const { date, startTime, endTime, qrId, brandId, redirectionUrl } = req.body;
  
    if (!date || !startTime || !endTime || !qrId || !brandId || !redirectionUrl) {
      return res.status(400).json({ error: "All fields are required: date, Qr ID, Brand ID, Redirection Url startTime, and endTime." });
    }
    try {
        const overlappingSlot = await Slot.findOne({
            date,
            $or: [
              { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, 
            ],
            ...(qrId && { qrId }), 
            ...(brandId && { brandId }) 
          });
        if(overlappingSlot){
            return res.status(400).json({
                message: "Slot already exists",
                success: false
            })
        }
        const newSlot = Slot ({
          qrId,
          brandId,
          startTime,
          endTime,
          date,
          redirectionUrl
        });
    
        await newSlot.save()
        return res.status(201).json({
          message: "Slot created successfully",
          Slot
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
  };
  