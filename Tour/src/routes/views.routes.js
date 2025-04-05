import {getTour,getOverview,getError} from '../controllers/views.controller.js'
import { Router } from 'express'
const viewRoute = Router()




viewRoute.get("/tours",getTour)

viewRoute.get("/",getOverview)
viewRoute.get("*", getError)



export default viewRoute