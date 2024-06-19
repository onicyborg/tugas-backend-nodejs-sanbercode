var express = require("express");
var fileUpload = require("express-fileupload");
var cloudinary = require("./cloudinary");

var port = 3000;
var app = express();

// use middleware for grant access upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// register route
app.post("/upload", (req, res) => {
  const { photo } = req.files;

  if (!photo) {
    return res.status(400).json({ status: 400, message: "Photo is required" });
  }

  // Function to handle single file upload
  const uploadSingleFile = (file) => {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(
        file.tempFilePath,
        { public_id: new Date().getTime() },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  };

  // Check if `photo` is an array (multiple files)
  if (Array.isArray(photo)) {
    // Upload multiple files
    Promise.all(photo.map(uploadSingleFile))
      .then(results => res.json({ status: 200, message: "Success", results }))
      .catch(error => res.status(500).json({ status: 500, message: "upload failed", error }));
  } else {
    // Upload single file
    uploadSingleFile(photo)
      .then(result => res.json({ status: 200, message: "Success", result }))
      .catch(error => res.status(500).json({ status: 500, message: "upload failed", error }));
  }
});

// running apps
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
