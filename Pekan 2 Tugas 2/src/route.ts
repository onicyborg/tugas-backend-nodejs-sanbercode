import express from "express";
import { single, multiple } from "./middlewares/upload.middleware";
import { uploadSingleFile, uploadMultipleFiles } from "./utils/cloudinary";

const router = express.Router();

router.post("/upload/single", single, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ status: 400, message: "No file uploaded" });
  }

  try {
    const result = await uploadSingleFile(req.file);
    res.json({ status: 200, message: "Success", result });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Upload failed", error });
  }
});

router.post("/upload/multiple", multiple, async (req, res) => {
  if (!req.files || !Array.isArray(req.files)) {
    return res
      .status(400)
      .json({
        status: 400,
        message: "No files uploaded or invalid files format",
      });
  }

  try {
    const results = await uploadMultipleFiles(req.files);
    res.json({ status: 200, message: "Success", results });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Upload failed", error });
  }
});

export default router;
