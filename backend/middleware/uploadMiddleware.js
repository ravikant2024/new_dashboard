const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure that the uploads and respective folders exist
const ensureFoldersExist = () => {
    const folders = ['uploads/thumbnails', 'uploads/images'];
    folders.forEach((folder) => {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true }); 
        }
    });
};
ensureFoldersExist(); 

// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = '';

        if (file.fieldname === 'thumbnail') {
            folder = 'uploads/thumbnails'; 
        } else if (file.fieldname === 'images') {
            folder = 'uploads/images'; 
        }

        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

// Multer upload configuration with file size limits and file type filter
const uploadFields = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Max file size 2MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/; 
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (extname && mimeType) {
            return cb(null, true); 
        } else {
            cb(new Error('Only image files (jpg, jpeg, png, gif) are allowed.'));
        }
    }
}).fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 10 }   
]);

module.exports = { uploadFields };
