import Contact from "../models/contact.js";


//CREATE
export const createContact =async(req,res)=>{
    try{
        const {name,email,message} =req.body;
        
        const contact = await Contact.create({
            name,email,message
        })

        res.status(201).json({
            message:"Contact created successfully",
            contact
        })
    }catch(error){
        res.status(500).json({
            message:"Error creating contact",
            error:error.message
        })
    }
}


//READ ALL 
export const getContacts =async(req,res)=>{
    try{
        const contacts =await Contact.find();
        res.status(200).json({
            data:contacts
        })
    }catch(error){
        res.status(500).json({
            message:"error fetching contact",
            error:error.message
        })
    }
}


//READ ONE
export const getContactByID =async (req,res)=>{
    try{
        const Contact = await Contact.findByID(req.params.id)
        if(!Contact){
            return res.status(404).json({
                message:"Contact not found"
            })
        }
        res.status(200).json({
            data:Contact
        })
    }catch(error){
       res.status(500).json({
        message:"Error fetching contact",
        error:error.message
       })
    }
}

//UPDATE

export const updateContact = async (req,res)=>{
    try{
        const Contact =await Contact.findByIDAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )

        if(!Contact){
            return res.status(404).json({
                message:"Contact not found"
            })
        }
        res.status(200).json({
            message:"Contact updated Successfully"
        })
    }catch(error){
        res.status(500).json({
            message:"Error updating  contact",
            error:error.message
        })
    }
}

//DELETE

export const deleteContact = async(req,res)=>{
    try{
        const Contact = await Contact.findByIDAndDelete(req.params.id)
        if(!Contact){
            return res.status(404).json({
                message:"Contact not found"
            })
        }
        res.status(200).json({
                message:"Contact Deleted Successfully"
            })
    }catch(error){
        res.status(500).json({
            message:"Error deleting contact",
            error:error.message
        })
    }
}