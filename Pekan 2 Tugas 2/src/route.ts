import express from "express";
import { single, multiple } from "./middlewares/upload.middleware";
import { uploadSingleFile, uploadMultipleFiles } from "./utils/cloudinary";
import axios from 'axios';

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

router.get("/check-cloudinary", async (req, res) => {
  try {
    // Ganti dengan URL Cloudinary API yang sesuai dengan environment Anda
    const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dltyn12ut/ping";

    // Ganti dengan API key dan secret key Cloudinary Anda
    const apiKey = "597338953475147";
    const apiSecret = "QM8Ix5fgFzMjRIpwAHpdob8oCvs";

    // Konfigurasi header untuk autentikasi dengan Cloudinary
    const authHeader = {
      auth: {
        username: apiKey,
        password: apiSecret,
      },
    };

    // Permintaan GET ke Cloudinary API
    const response = await axios.get(cloudinaryUrl, authHeader);

    // Cek status dari response
    if (response.status === 200) {
      res
        .status(200)
        .json({ message: "Connection to Cloudinary is successful" });
    } else {
      res
        .status(response.status)
        .json({ message: "Failed to connect to Cloudinary" });
    }
  } catch (error) {
    console.error("Error checking Cloudinary connection:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
});

export default router;
