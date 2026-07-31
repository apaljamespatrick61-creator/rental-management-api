const validateRoom = (req, res, next) => {
    const requiredFields = [
        ["room_number", "Room number is required"],
        ["capacity", "Capacity is required"],
        ["rent_price", "Rent price is required"],
        ["status", "Status is required",],
        ["photo_url", "Photo URL is required"],
    ];
    const errors = [];  
    
    requiredFields.forEach(([field, message]) => {
        if (!req.body[field]) {
            errors.push(message);
        }   
    });

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    next();

};

module.exports = {
    validateRoom,
}