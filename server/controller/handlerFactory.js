const AppError = require('../utils/AppError');
const AppFeature = require('../utils/AppFeature');

exports.deleteOne = (model) => {
  return async (req, res, next) => {
    const doc = await model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No course found with this id', 404));
    }
    res.status(204).json({
      status: 'Success',
      data: null,
    });
  };
};

exports.updateOne = (model) => {
  return async (req, res, next) => {
    const doc = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError('No documnet found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  };
};

exports.getAll = (model) => {
  return async function (req, res, next) {
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new AppFeature(model.find(filter), req.query)
      .filter()
      .sort()
      .limitField();

    const doc = await features.query;

    res.status(200).json({
      status: 'Success',
      result: doc.length,
      data: {
        doc,
      },
    });
  };
};

exports.getOne = (model, popOption) => {
  return async (req, res, next) => {
    let query = await model.findById(req.params.id);
    if (popOption) query = query.populate(popOption);
    const doc = await query;
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  };
};
