const Course = require("../models/Course");
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
  // [GET] /
  //cach 1
  // index(req, res) {
  //   Course.find({}, function (err, Courses) {
  //     if(!err){
  //       res.json(Courses);
  //     }else{
  //       res.status(400).json({ error: "ERROR!!!"});
  //     }
  //   });
  // }

  //cach 2
  index(req,res,next) {
    Course.find({})
      .then(Courses => {
        //Courses = Courses.map(Course => Course.toObject())
        res.render('home', { 
          Courses: mutipleMongooseToObject(Courses)
        });
      })
      .catch(next);
  }

  // [GET] /search
  search(req, res) {
    res.render('search');
  }
}

module.exports = new SiteController();
