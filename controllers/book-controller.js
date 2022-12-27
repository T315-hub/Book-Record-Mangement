const {UserModel,BookModel}=require("../models");
const IssuedBook=require("../dtos/book-dto");
// get all the books 

exports.getAllBooks= async (req,res)=>{
    // find method find the all the objects which is present in BookModel 
    const books= await BookModel.find();
    if(books.length===0)
    {
        return res.status(404).json({success:false,message:"no book found"});
    }
    return res.status(200).json({success:true,message:books});
};

// get the  single book by id 

exports.getSingleBookById= async (req,res)=>{
const {id}=req.params;
const book= await BookModel.findById(id);
if(!book)
{
    return res.status(404).json({success:false,message:"book not found with this id"});
}
return res.status(200).json({success:true,data:book});
};


// get all issued book

exports.getAllIssuedBook= async (req,res)=>
{
     const users = await BookModel.find({
        issuedBook:{$exists:true},
       }).populate("issuedBook");

       // DTO // data transfer object 
       const issuedBooks=users.map((each)=>new IssuedBook(each));
    if(issuedBooks.length===0)
    {
        return res.status(404).json({success:false,message:"not issued book"});
    }
    return res.status(200).json({ success:true,data:issuedBooks});
};

// add a new book 
exports.addNewBook= async (req,res)=>
{
     const {data}=req.body; 
     if(!data)
     {
          return res.status(404).json({success:false,message:"Not  data is provided "});
     }
         await BookModel.create(data);
     
     const allBooks= await BookModel.find();
     return res.status(200).json({ success:true,data:allBooks});
};


// update a book by its id 
exports.updateBookById = async (req,res)=>
{
    const {id}=req.params;
    const {data}= req.body;
    // if(!book)
    // {
    //     return res.status(404).json({success:false,message:"book is not updated with this id "});
    // }

       const updatedBook= await BookModel.findOneAndUpdate({_id:id},data,{new:true});
        return res.status(200).json({success:true,data:updatedBook});  
};