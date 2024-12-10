var express = require('express');
var router = express.Router();
const path = require('path');

const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directorio de destino
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname); // Obtener extensión original
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension); // Guardar con un nombre único
    }    
});

const upload = multer({ storage: storage, 
    limits: {
        fileSize : 2 * 1024 * 1024 //2MB    
    }, 
    fileFilter: function(req, file, cb) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            cb(null, true);
        } else {
            cb(new Error('PNG edo JPG fitxategiak soilik baimentzen dira'));
        }
    }
 })

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('form.html');
});

router.post('/', upload.single('avatar'), function (req, res, next) {
    const userName = req.body.name;
    const filePath = `http://localhost:3000/uploads/${req.file.filename}`;

    res.send(`
        Zure izena: ${userName}, Fitxategia:  <a href="${filePath}">${filePath}</a>
        <br>
        <img src="${filePath}" alt="Irudia" style="max-width: 300px; max-height: 300px;">
    `);

    console.log(req.file)
    // req.body will hold the text fields, if there were any
    res.send("Jasota")
});


module.exports = router;
