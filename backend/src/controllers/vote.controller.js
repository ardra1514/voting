
import Vote from "../models/Vote.js";

export const voteColor = async (req, res) => {

  try {

    const { color } = req.body;

    if (!color) {
      return res.status(400).json({
        message: "Color required"
      });
    }

    const existingVote = await Vote.findOne({
      userId: req.user.id
    });

    
    if (existingVote && existingVote.color === color) {

      await Vote.findByIdAndDelete(existingVote._id);

      return res.status(200).json({
        message: "Vote removed"
      });
    }

    
    if (existingVote) {

      existingVote.color = color;

      await existingVote.save();

      return res.status(200).json({
        message: "Vote updated"
      });
    }

    await Vote.create({
      userId: req.user.id,
      color
    });

    return res.status(201).json({
      message: "Vote added"
    });

  } catch (error) {

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};


export const getVotes = async (req, res) => {

  try {

    const red = await Vote.countDocuments({
      color: "red"
    });

    const yellow = await Vote.countDocuments({
      color: "yellow"
    });

    const green = await Vote.countDocuments({
      color: "green"
    });

    return res.status(200).json({
      red,
      yellow,
      green
    });

  } catch (error) {

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};