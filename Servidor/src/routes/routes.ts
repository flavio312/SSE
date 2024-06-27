import { Router } from "express";
import { postPartners, postProduct, getSales } from "../controllers/controllers";

const router = Router ();

router.get("/eventos",getSales);
router.post("/socios",postPartners);
router.post("/productos",postProduct);

export default router;