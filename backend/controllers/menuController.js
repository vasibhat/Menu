import asyncHandler from "../middleware/asyncHandler.js";
import Menu from "../models/menuModel.js";

// @desc    Fetch all menu items
// @route   GET /api/menu
// @access  Public
const getMenuItems = asyncHandler(async (req, res) => {
  const menuItems = await Menu.find({});
  res.json(menuItems);
});

// @desc    Fetch single menu item
// @route   GET /api/menu/:id
// @access  Public
const getMenuItemById = asyncHandler(async (req,res) => {
    const menuItem = await CSSMathProduct.findById(req.params.id);

    if(menuItem){
        res.json(menuItem);
    }
    else{
        res.status(404);
        throw new Error("Menu item not found");
    }
} );

export { getMenuItems, getMenuItemById };