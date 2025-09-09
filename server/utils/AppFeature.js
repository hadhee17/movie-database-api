class AppFeature {
  constructor(query, queryStr, model) {
    this.query = query;
    this.queryStr = queryStr;
    this.model = model; // Save model for pagination
  }

  filter() {
    const queryObj = { ...this.queryStr };
    const excludeField = ['sort', 'page', 'fields', 'limit'];
    excludeField.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const parsedQuery = JSON.parse(queryStr);

    this.query = this.query.find(parsedQuery);
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitField() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.queryStr.page ? this.queryStr.page * 1 : 1;
    const limit = this.queryStr.limit ? this.queryStr.limit * 1 : 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = AppFeature;
