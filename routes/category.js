// routes/category.js
const express = require('express');
const router = express.Router();
const Category = require('../models/HomePageModel');

// Util
const getDefaultBlocks = require('../utils/getDefaultBlocks');

router.post('/add-category', async (req, res) => {
  const { slug, metaTitle, metaDesc } = req.body.category;
  console.log({slug, metaTitle, metaDesc})

  try {
    const existing = await Category.findOne({ slug });
    if (existing) return res.status(400).json({ message: 'Category already exists' });

    const newCategory = new Category({
      slug,
      metaTitle,
      metaDescription: metaDesc,
      components: getDefaultBlocks()
    });

    await newCategory.save();
    res.status(201).json({ message: 'Category created', category: newCategory });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});



router.get("/get-category", async (req, res)=>{
   try{
    const allCategory = await Category.find()
    res.status(200).json(allCategory)
}
    catch(err){
        res.status(500).json({ message: 'Server error', error: err.message });
    }
})



router.put("/add-block", async (req, res) => {
  const { block } = req.body;

  if (!block || !block.slug) {
    return res.status(400).json({ message: "Block and slug are required." });
  }

  try {
    const category = await Category.findOne({ slug: block.slug });

    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    category.blocks.push(block);
    await category.save();

    res.status(200).json({ message: "Block added successfully", category });
  } catch (error) {
    console.error("Error adding block:", error);
    res.status(500).json({ message: "Server error" });
  }
});







router.put('/move-block-by-index', async (req, res) => {
  try {
    const { slug, index, position } = req.body;

    if (!slug || index === undefined || position === undefined) {
      return res.status(400).json({ message: 'slug, index and position are required' });
    }
    console.log({ index, position: position, slug });

    // Step 1: Find category by slug
    const category = await Category.findOne({ slug });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Step 2: Validate index range
    if (index < 0 || index >= category.blocks.length) {
      return res.status(400).json({ message: 'Invalid block index' });
    }

    // Step 3: Update position of the block at the given index
    category.blocks[index].position = position;

    // Step 4: Save changes
    await category.save();

    res.status(200).json({ message: 'Block position updated successfully', category });
  } catch (error) {
    console.error('Error updating block position:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




router.put('update-category-content', async (req, res)=>{
  try {
    
  } catch (error) {
    
  }
})



module.exports = router;
