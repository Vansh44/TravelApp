const express = require("express");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only images allowed"), false);
};

const upload = multer({ storage, fileFilter });

router.options("/", (req, res) => {
  console.log("OPTIONS /api/upload - preflight");
  res.sendStatus(200);
});

router.post("/", (req, res) => {
  console.log(">>> UPLOAD ROUTE: POST handler called");
  console.log(">>> UPLOAD ROUTE: Headers:", req.headers);
  console.log(">>> UPLOAD ROUTE: Starting multer upload...");

  upload.single("photo")(req, res, function (err) {
    if (err) {
      console.error(">>> UPLOAD ROUTE: Multer error:", err.message);
      console.error(">>> UPLOAD ROUTE: Error stack:", err.stack);
      return res.status(400).json({ message: err.message || "Upload failed" });
    }

    if (!req.file) {
      console.warn(">>> UPLOAD ROUTE: No file in request");
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileName = req.file.filename;
    const imageUrl = `http://localhost:3000/uploads/${fileName}`;
    console.log(">>> UPLOAD ROUTE: File uploaded successfully:", fileName);

    return res.json({ imageUrl });
  });
});

module.exports = router;
