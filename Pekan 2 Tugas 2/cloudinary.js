const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dltyn12ut", // silahkan pakai menggunakan cloud name kalian
  api_key: "597338953475147", // silahkan pakai menggunakan api key kalian
  api_secret: "QM8Ix5fgFzMjRIpwAHpdob8oCvs", // silahkan pakai menggunakan api secret kalian
});

module.exports = cloudinary;