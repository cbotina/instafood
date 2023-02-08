/* eslint-disable no-use-before-define */
const FoodItem = require('../models/foodItem');

const getTest = async (req, res) => {
  const result = await FoodItem.find().select('').limit(0);
  res.json({ result, nHits: result.length });
};

const getAllFoodItems = async (req, res) => {
  // eslint-disable-next-line no-use-before-define
  const queryObject = makeQueryObject(req.query);
  const result = FoodItem.find(queryObject);

  customizeResult(req.query, result);

  const products = await result;

  res.status(200).json({ products, nHits: products.length });
};

/**
 *
 * @param {*} queryParams Object with query params
 * @returns Normalized query object, necessary for .find() method
 */
function makeQueryObject(queryParams) {
  const {
    featured, company, name, numericFilters,
  } = queryParams;
  const queryObject = {};

  // eslint-disable-next-line eqeqeq
  if (featured) queryObject.featured = featured == 'true';

  if (company) queryObject.company = company;

  if (name) queryObject.name = { $regex: name, $options: 'i' };

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };

    const regEx = /\b(<|>|<=|>=|=)\b/g;

    let filters = numericFilters.replace(regEx, (match) => `~${operatorMap[match]}~`);
    const options = ['price', 'rating'];
    // eslint-disable-next-line no-unused-vars
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('~');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  return queryObject;
}

/**
 *
 * @param {*} queryParams
 * @param {*} result
 */
function customizeResult(queryParams, result) {
  const {
    sort, fields, page, limit,
  } = queryParams;

  let sortParams = 'createdAt';
  let fieldParams = '';
  let pageOption = 1;

  if (sort) sortParams = sort.split(',').join(' ');
  if (fields) fieldParams = fields.split(',').join(' ');
  if (page) pageOption = page;
  if (limit) result.limit(limit).skip(limit * (pageOption - 1));

  // eslint-disable-next-line no-param-reassign
  result = result.sort(sortParams).select(fieldParams);
}

module.exports = { getAllFoodItems, getTest };
