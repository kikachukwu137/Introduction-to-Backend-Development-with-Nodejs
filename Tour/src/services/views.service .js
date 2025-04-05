import Tour from '../models/tour.model.js';



export const getOverview = async()=>{
    try {
        const tours = await Tour.find();

        
    } catch (error) {
        
    }

}