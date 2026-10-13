import express from "express"
import {
  createContact,
  getContacts,
  getContactByID,
  updateContact,
  deleteContact
} from "../controllers/ContactControllers.js"

const router =express.Router()

router.post("/",createContact)

router.get("/",getContacts)

router.get("/:id",getContactByID)

router.put("/:id",updateContact)

router.delete("/:id",deleteContact)

export default router ;