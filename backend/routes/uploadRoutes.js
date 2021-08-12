import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router() 

// all the whole null in this function is for the error
// passing null for the error


const storage = multer.diskStorage({

    destination(req, file, cb) {

        cb(null, 'uploads/')

    },
    filename(req, file, cb) {

        // the second argument is very dinstinct because 
        // uploading two images at the same time will bring
        // error so as a result of the 

        // path has a default function called the extension name
        // the extname will pull out the jpg or png
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}` )

    }
})

function checkFileType(file, cb) {

    const filetypes = /jpg|jpeg|png/

    // the extname returns true or false
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

    const mimetype = filetypes.test(file.mimetype)


    if(extname && mimetype) {

        return cb(null, true)

    } else {
        cb('Images only!')
    }

}


const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb) 
    }
})


router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})






export default router;