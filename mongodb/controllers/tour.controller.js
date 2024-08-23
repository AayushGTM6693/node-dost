const Tour = require("../models/tour.model");

async function topRoute(req, res, next) {
  req.query.sort = "price,-ratingsAverage";
  req.query.limit = "2";
  next();
}
async function getAllTour(req, res) {
  try {
    // build the query
    const queryObj = { ...req.query }; // shallow copy
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    console.log("query", queryObj);
    // adv query

    let queryParam = JSON.stringify(queryObj);
    queryParam = queryParam.replace(/\b(lte|gte|lt|gt)\b/g, (match) => {
      return `$${match}`;
    }); // for eg query { duration: { lte: '5' } } => query { duration: { $lte: '5' } }

    let query = Tour.find(JSON.parse(queryParam));

    // sorting
    let queryParams = req.query.sort;
    if (queryParams) {
      console.log(queryParams);
      const sortBy = queryParams.split(",").join(" "); // commma hatyo
      console.log("sort by", sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort("createdAt");
    }

    // .sort('price ratingsAverage') // fallback

    // limiting

    const limitingQuery = req.query.fields;
    if (limitingQuery) {
      const limitBy = limitingQuery.split(",").join(" ");
      query = query.select(limitBy);
    } else {
      query = query.select("-__v");
    }

    //pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 2;
    const skip = (page - 1) * limit; // page 3 => skip = 10
    console.log("skip value", skip);

    query = query.skip(skip).limit(limit);

    if (page) {
      const numTour = await Tour.countDocuments();

      if (skip >= numTour) {
        throw new Error("This page does not exist");
      }
    }

    // moongose way of writing query
    // const tour = await Tour.find()
    //   .where("duration")
    //   .equals(5) // lte or sort
    //   .where("difficulty")
    //   .equals("easy"); // same as above

    /*
    Before await: You can chain query methods like .sort(), .limit(), .select(), etc., 
    because you're still working with a Mongoose Query object.
After await: The query is executed, and you have the result data,
so you can't chain query methods anymore because you're no longer dealing with a query 
object.*/

    // execute the query
    const tour = await query;

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "failed boltte",
      message: error,
    });
  }
}

async function createTour(req, res) {
  /* 
  we call the method on the new document
  we had the tour that we created from the model
  and in that tour we used the save method
  */
  // const newTour  = new Tour({})
  // newTour.save()

  try {
    const newTour = await Tour.create(req.body);
    // we call the method directly on the model itself
    res.status(201).json({
      status: "success bolte",
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail bolte",
      message: error,
    });
  }
}

async function getTour(req, res) {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id })

    res.status(201).json({
      status: "success boltejhbj",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "failed bolte",
      message: error,
    });
  }
}
async function updateTour(req, res) {
  try {
    console.log("Received update request for ID:", req.params.id);
    console.log("Update data:", req.body);

    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // Ensure the updated data is validated against the schema
    });

    if (!tour) {
      return res.status(404).json({
        status: "fail",
        message: "No tour found with that ID",
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {
    console.error("Error updating tour:", error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

async function deleteTour(req, res) {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: "success boltejhbj",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

module.exports = {
  getAllTour,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  topRoute,
};
