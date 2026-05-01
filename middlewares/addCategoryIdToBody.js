module.exports = (req , res ,next)=>{
    const {category} = req.body;
        if(!category) 
            req.body.category = req.params.categoryId;
    next();
}