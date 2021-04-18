const Course = require("../models/Course");
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    let courseQuery = Course.find({});

    if (req.query.hasOwnProperty('_sort')) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type
      });
    }

    Promise.all([courseQuery, Course.countDocumentsDeleted()])
      .then(([courses, deletedCount]) => 
        res.render('me/stored-courses', {
          courses: mutipleMongooseToObject(courses),
          deletedCount,
        }))
      .catch(next);
  }

  //[GET] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then(courses => res.render('me/trash-courses', {
        courses: mutipleMongooseToObject(courses)
      }))
      .catch(next);
  }

  // trashCourses(req, res, next) {
  //   Promise.all([Course.findDeleted({}), Course.countDocuments()])
  //     .then(([courses, amountDocument]) => 
  //       res.render('me/stored-courses', {
  //         courses: mutipleMongooseToObject(courses),
  //         amountDocument,
  //       }))
  //     .catch(next);
  // }
}

module.exports = new MeController();
