const multer=require('multer')
const GridFsStorage = requrie('multer-gridfs-storage')
const storage = new GridFsStorage({
    url:"mongodb+srv://abdi:k4t5rk0o1@servercluster.q691c.mongodb.net/?retryWrites=true&w=majority",
    options:{useNewUrlParser:true,useUnifiedTopology:true},
    file:(req,file)=>{
        const match=["image/png","image/jpeg"]
        if(match.indexOf(file.mimetype)===-1){
            const filename=`${Date.now()}-any-name-${file.originalname}`
            return filename
        }
        return {
            bucketName:"photos",
            filename:`${Date.now()}-any-name-${file.originalname}`
        }
    }
})

module.exports=multer({storage})