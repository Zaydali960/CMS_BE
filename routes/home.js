const express = require('express');
const router = express.Router();
const HomePage = require("../models/HomePageModel")
const getDefaultBlocks = require('../utils/getDefaultBlocks');



router.post('/create-page', async (req, res) => {
  try {
    const blocks = req.body.blocks?.length ? req.body.blocks : getDefaultBlocks();

    const newPage = new HomePage({
      ...req.body,
      blocks
    });

    const saved = await newPage.save();
    res.status(201).json({ message: "Page created", data: saved });
  } catch (error) {
    console.error("Error creating page:", error);
    res.status(500).json({ message: "Server error", error });
  }
});





router.delete('/delete-page/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const delPage = await HomePage.findByIdAndDelete(id)
    res.status(201).json({ message: "Page Deleted", delPage });
  } catch (error) {
    console.error("Error Deleting page:", error);
    res.status(500).json({ message: "Server error", error });
  }
});



router.put('/update-components/:id', async (req, res) => {
  try {
    console.log('Received update:', req.body.components);
    const { id } = req.params;
    const { components } = req.body;

    // if (!Array.isArray(components)) {
    //   return res.status(400).json({ message: "Components must be an array." });
    // }

    const updatedBlock = await HomePage.findByIdAndUpdate(
      id,
      { $set: { components: components } },
      { new: true }
    );

    if (!updatedBlock) {
      return res.status(404).json({ message: "Block not found." });
    }

    res.json({ message: "Components updated successfully.", data: updatedBlock });
  } catch (error) {
    console.error("Error updating components:", error);
    res.status(500).json({ message: "Server error." });
  }
});






router.post('/addcomponent', async (req, res) => {
  try {
    // console.log('Incoming body:', req.body);
    const { type, component, props, position } = req.body.component;

    //   if (!type || !component) {
    //   return res.status(400).json({ error: 'Missing required fields' });
    // }

    const newBlock = new HomePage({ type, component, props, position });
    await newBlock.save();

    res.status(201).json({ message: 'Block created successfully', block: newBlock });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.get('/get', async (req, res) => {
  try {
    const allBlocks = await HomePage.find().sort({ position: 1 }); // sorted by time
    res.status(200).json(allBlocks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




router.put('/update-position/:id', async (req, res)=>{
  try {
    const {id} = req.params;
    const {position} = req.body;
      if (position === undefined) {
      return res.status(400).json({ error: 'Position is required' });
    }
    const updated = await HomePage.findByIdAndUpdate(
      id,
      {position},
      {new:true}
    )
    if (!updated) {
      return res.status(404).json({ error: 'Component not found' });
    }
       res.status(200).json({ message: 'Position updated successfully', block: updated });
  } catch (error) {
    //  console.error('Error updating position:', error);
    res.status(500).json({ error: error.message });
  }
})




router.delete("/delete-block/:id", async (req, res)=>{
  try {
    const {id} = req.params;
    const delComponent = await HomePage.findByIdAndDelete(id)

    if(!delComponent){
      return res.status(404).json({ error: 'Component not found' });
    }
    res.status(200).json({ message: 'Block deleted successfully', delComponent});
  } catch (error) {
    // console.error('Error updating position:', error);
    res.status(500).json({ error: error.message });
  }
})







router.put('/update/:id', async (req, res) => {
  try {
    const { props } = req.body;
    const updated = await HomePage.findByIdAndUpdate(req.params.id, {
      props
    }, { new: true });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
});




router.put("/update-meta-details/:id", async (req, res) => {
  const { id } = req.params;
  const { metaTitle, metaDescription } = req.body;

  try {
    const updated = await HomePage.findOneAndUpdate(
      { _id: id },
      { metaTitle, metaDescription },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Page not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
});




module.exports = router;