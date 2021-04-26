const  multer  = require('multer');

export const photoHeadshot = ()=>{
const storage = multer.diskStorage({
  destination: function (req:any, file:any, cb:any) {
  
    //We set the destination conditonally so the user cant put whatever dir they want outside what we alllow
    if(req.body.dir === "agents") {
    cb(null, 'public/images/agents');
    
} else {
  return cb(new Error('Proper dir not set'));
}
    
  },
  filename: function (req:any, file:any, cb:any) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null,  file.filename + "-" +Math.floor((Math.random() * 1000000) + 1) + '-' + Date.now() + "." + extension)
  }
})
const upload = multer({ storage: storage,fileFilter: (req:any, file:any, cb:any) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
} })
return upload;
}