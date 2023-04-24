const Review = require("../Models/reviews");
const reviewController = {};

reviewController.createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json({ message: "Review created successfully", review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ALL THE REVIEW
reviewController.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();

    !reviews
      ? res.status(404).json({ message: "Review not found" })
      : res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ REVIEW BY ID
reviewController.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    !review
      ? res.status(404).json({ message: "Review not found" })
      : res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ REVIEW BY car
reviewController.getReviewByCar = async (req, res) => {
  try {
    const reviews = await Review.find({ car: req.params.id });

    reviews.length === 0
      ? res.status(404).json({ message: "Review not found for this car" })
      : res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
reviewController.updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      {
        comment: req.body.comment,
        rating: req.body.rating,
      },
      { new: true }
    );
    !review
      ? res.status(404).json({ message: "Review not found" })
      : res
          .status(200)
          .json({ message: "Review updated successfully", review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
reviewController.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    !review
      ? res.status(404).json({ message: "Review not found" })
      : res
          .status(200)
          .json({ message: "Review deleted successfully", review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = reviewController;
