import { Router } from "express";

const mailRouter = Router()

import { queryMail, sendInvoiceMail } from "../controllers/mail.js";

mailRouter.post('/querymail' , queryMail);
mailRouter.post('/sendInvoiceMail' , sendInvoiceMail);

export default mailRouter;