import Tour from '../models/tour.model.js';
import ErrorWithStatus from '../exception/errorWithStatus.js';


export const getAllTours = async (queryObj) => {
    try {
        // Prevent mutation
        const filteredQuery = { ...queryObj };

        // Remove excluded fields
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete filteredQuery[el]);

        // Advanced Filtering (MongoDB Operators)
        let queryStr = JSON.stringify(filteredQuery);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        const parsedQuery = JSON.parse(queryStr);

        // Sorting
        let sortOption = '-createdAt'; // Default sorting
        if (queryObj.sort) {
            sortOption = queryObj.sort.split(',').join(' ');
        }

        // Field Selection
        let selectedFields = '-__v'; // Default: exclude __v
        if (queryObj.fields) {
            selectedFields = queryObj.fields.split(',').join(' ');
        }

        // Pagination
        const page = Number(queryObj.page) || 1;
        const limit = Number(queryObj.limit) || 5;
        const skip = (page - 1) * limit;

        const totalDocuments = await Tour.countDocuments(parsedQuery);

        // If the requested page does not exist, return an empty array
        // if (skip >= totalDocuments) {
        //     return {
        //         status: "success",
        //         total: totalDocuments,
        //         currentPage: page,
        //         resultsPerPage: limit,
        //         totalPages: Math.ceil(totalDocuments / limit),
        //         data: []
        //     };
        // }

        // Fetch Tours
        const tours = await Tour.find(parsedQuery)
            .sort(sortOption)
            .select(selectedFields)
            .skip(skip)
            .limit(limit);

        return {
            status: "success",
            total: totalDocuments,
            currentPage: page,
            resultsPerPage: limit,
            totalPages: Math.ceil(totalDocuments / limit),
            data: tours
        };

    } catch (error) {
        throw new ErrorWithStatus(error.message, error.status || 500);
    }
};





//  export const getAllTours = async(queryObj) => {
//    // export const getAllTours = async (queryObj = {}) => { // Ensure queryObj is always an object
//     try {
//         ///////////////////////////////////////filtering///////////////////////////////////////////////
//           // Create a copy of queryObj to prevent mutation
//           const filteredQuery = { ...queryObj };
          
          

//           // Excluded fields (pagination, sorting, etc.)
//           const excludedFieldsList = ['page', 'sort', 'limit', 'fields'];// remove this keys from filteredQuery
//           excludedFieldsList.forEach(el => delete filteredQuery[el]);

  
          
//         ////////////////////////////advance filtering//////////////////
//           // Convert query object to string for regex processing
//           let queryStr = JSON.stringify(filteredQuery);

//           // Replace operators (gte, gt, lte, lt) with MongoDB syntax
//           queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
  
//           // Convert query string back to an object
//           let parsedQuery = JSON.parse(queryStr);
//         ///////////////////////SORTING//////////////////////
//         let sortOption ;// initialize it
//         if (queryObj.sort) {
//             // Convert sort string to MongoDB format (e.g., "price,-rating" => { price: 1, rating: -1 })
//             sortOption = queryObj.sort.split(',').join(' ');
            
//         }
//         ///////////////////////////field//////////////////////
//         let selectedField;
//         if(queryObj.fields){
//             selectedField = queryObj.fields.split(',').join(' ')

//         }
//         //////////pagination//////////////////

//         const page = queryObj.page * 1  || 1; // parseInt()
//         const limit    = queryObj.limit * 1 || 5;
//         const skip = (page - 1) * limit;

//         const totalDocument = await Tour.countDocuments(parsedQuery)
       

//         return ({
//             status: "success",
//             total: totalDocument,
//             currentPage: page,
//             resultPerPage: limit,
//             totalPage: Math.ceil(totalDocument/limit),
//             data: []
//         }) 
//         const tours = await Tour.find(parsedQuery)
//         .sort(sortOption || '-createdAt' )
//         .select(selectedField || '-__v') //default :exclude__v field
//         .skip(skip)
//         .limit(limit)

        
//     } catch (error) {
//         throw new ErrorWithStatus(error.message, error.status || 500)
        
//     }
// }


export const  createTour = async(bioData)=>{

    try {
        
        if(!bioData || Object.keys(bioData).length === 0) {
            throw new ErrorWithStatus("no body was passed ",400)
        }
        const newTour = await Tour.create(bioData)
        return ({
            status: "success",
            data: newTour
        })
        
        
    } catch (error) {
        throw new ErrorWithStatus(error.message, error.status || 500)
        
    }


}


export const  getTour = async (tourId) =>{
    try {
        const tour = await Tour.findById(tourId)
        if(!tour){
            throw new ErrorWithStatus("this user does not exist",400)
        }
        console.log(tour)
        return ({
            status: "success",
            data : tour

        })
        
    } catch (error) {
        throw new ErrorWithStatus(error.message, error.status || 500)   
        // throw new ErrorWithStatus('find the error',404)     
    }

}


export const updateOneTour  = async(tourId, newBody) =>{
    try {
        const tour = await Tour.findByIdAndUpdate(tourId,newBody,{new:true,runValidators:true})
        if(!tour){
            throw new ErrorWithStatus("You cant update this field",400)
        }
        return ({
            status: "success",
            data: tour
        })
    } catch (error) {
        throw new ErrorWithStatus(error.message, error.status || 500)        
    }
}


export const  deleteTour = async (tourId) =>{
    try {
        const tour = await Tour.findByIdAndDelete(tourId)
        if(!tour){
            throw new ErrorWithStatus("this user does not exist",400)
        }
        
        return ({
            status: "success",
            data : "file deleted"

        })
        
    } catch (error) {
        throw new ErrorWithStatus(error.message, error.status || 500)        
    }
}
export const getTourStats = async () => {
      try {
        const stats = await Tour.aggregate([
            {
                $match: { ratingsAverage: { $gte: 4.5 } }  // ✅ Ensure correct field name
            },
            {
                $group: {
                    _id: {$toUpper: '$difficulty'},  // ✅ Grouping all documents together,
                    numberTour:{$sum: 1},
                    numRating:{$sum: '$ratingsQuantity'},
                    avgRating: { $avg: "$ratingsAverage" },  // ✅ Fix typo
                    avgPrice: { $avg: "$price" },
                    minPrice: { $min: "$price" },
                    maxPrice: { $max: "$price" }
                }
            },
            {
                $sort:{avgPrice: 1}
            }
            // ,{

            // $match:{_id : {$ne: 'EASY'}}

            // }
        ]);

        console.log(stats); // ✅ Debugging: Check what is returned
        return stats;
        //return stats.length > 0 ? stats[0] : {}; // Return object instead of an array
    } catch (error) {
        throw new ErrorWithStatus(error.message, error.status || 500);
    }
};


// export const getTourStats = async() => {
//     try {
//         const stats = await Tour.aggregate([
//             {
//                 $match: {ratingsAverage : {$gte : 8.0}}
//             },
//             {
//                 $group: {
//                     _id: null,
//                     avgRating:{$avg: '$ratingsAverage'},
//                     avgPrice:{$avg: '$price'},
//                     minPrice:{$min: '$price'},
//                     maxPrice:{$max: '$price'},



//                 }
//             }

//         ])
//         console.log('aggregave',stats)
//         return stats
        
//     } catch (error) {
//         throw new ErrorWithStatus(error.message, error.status || 500)        

        
//     }
// }


export const getMonthlyPlan = async(input)=>{
    try {
        const year  = Number(input);
        const plan = await Tour.aggregate([
            {
                $unwind: '$startDates'
            },
            {
                $match:{
                    startDates:{
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
        },{
            $group:{
                _id:{$month: '$startDates'} ,
                numTourStarts: {$sum:1} 
               }

        }
           
        ])

        return plan

        
    } catch (error) {
        throw new ErrorWithStatus(error.message, error.status || 500)   
        
    }
}