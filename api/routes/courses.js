const express = require("express");
const { authenticateUser } = require("../middlewares/auth-user");

const { asyncHandler } = require("../middlewares/async-handler");
const { Course, User } = require("../models");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'emailAddress'],
          as: "user",
        },
      ],
      attributes: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded']
    });
    res.json(courses);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'emailAddress'],
          as: "user",
        },
      ],
      attributes: ['id', 'title', 'description', 'estimatedTime', 'materialsNeeded']

    });
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  })
);

router.post(
  "/",
  authenticateUser,
  asyncHandler(async (req, res) => {
    try {
      const course = await Course.create(req.body);
      res
        .status(201)
        .location("/api/courses/" + course.id)
        .end();
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

router.put(
  "/:id",
  authenticateUser,
  asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      if (course.userId !== req.currentUser.id) {
        return res
          .status(403)
          .json({ message: "Not authorized to modify" });
      }
      try {
        await course.update(req.body);
        res.status(204).end();
      } catch (error) {
        if (
          error.name === "SequelizeValidationError" ||
          error.name === "SequelizeUniqueConstraintError"
        ) {
          const errors = error.errors.map((err) => err.message);
          res.status(400).json({ errors });
        } else {
          throw error;
        }
      }
    } else {
      res.status(400).json({ message: "Course not found" });
    }
  })
);

router.delete(
  "/:id",
  authenticateUser,
  asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      if (course.userId !== req.currentUser.id) {
        return res
          .status(403)
          .json({ message: "Not authorized to modify" });
      }
      await course.destroy();
      res.status(204).end();
    } else {
      return res.status(404).json({ message: "Course not found" });
    }
  })
);

module.exports = router;
