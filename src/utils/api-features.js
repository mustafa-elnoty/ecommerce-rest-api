// Add $ to the available mongodb Operator
const prefixOperators = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(prefixOperators);
  }

  if (obj !== null && typeof obj === "object") {
    obj = Object.entries(obj).reduce((acc, [key, value]) => {
      const newKey = ["gt", "gte", "lt", "lte", "ne", "eq"].includes(key)
        ? `$${key}`
        : key;

      acc[newKey] = prefixOperators(value);
      return acc;
    }, {});
  }
  return obj;
};

// Convert text to an array
const toList = (value) =>
  typeof value === "string"
    ? value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

export default class ApiFeatures {
  constructor(mongooseQuery, sanitizedQuery) {
    this.mongooseQuery = mongooseQuery;
    this.sanitizedQuery = sanitizedQuery ?? {};
    this.filterQuery = {};
  }

  get keyword() {
    const { keyword } = this.sanitizedQuery;
    return typeof keyword === "string" ? keyword.trim() : "";
  }

  filtering(allowedFields = []) {
    const queryObj = prefixOperators(
      Object.fromEntries(
        Object.entries(this.sanitizedQuery).filter(([key]) =>
          allowedFields.includes(key),
        ),
      ),
    );

    this.filterQuery = { ...this.filterQuery, ...queryObj };
    this.mongooseQuery.find(queryObj);

    return this;
  }

  search() {
    if (this.keyword) {
      const searchCondition = { $text: { $search: this.keyword } };

      this.filterQuery = { ...this.filterQuery, ...searchCondition };
      this.mongooseQuery.find(searchCondition);
    }
    return this;
  }

  sort(allowedFields = []) {
    const requested = toList(this.sanitizedQuery.sort).filter((field) =>
      allowedFields.includes(field.replace(/^-/, "")),
    );

    if (requested.length) {
      this.mongooseQuery.sort(requested.join(" "));
    } else if (!this.keyword) {
      this.mongooseQuery.sort("-createdAt");
    }
    return this;
  }

  limitFields(defaultFields = "", allowedFields = []) {
    const requested = toList(this.sanitizedQuery.fields).filter((field) =>
      allowedFields.includes(field),
    );

    this.mongooseQuery.select(
      requested.length ? requested.join(" ") : defaultFields,
    );
    return this;
  }

  paginate() {
    let page = parseInt(this.sanitizedQuery.page, 10);
    if (!Number.isInteger(page) || page < 1) page = 1;

    const DEFAULT_LIMIT = 50;
    const MAX_LIMIT = 100;

    let limit = parseInt(this.sanitizedQuery.limit, 10);
    if (!Number.isInteger(limit) || limit < 1) limit = DEFAULT_LIMIT;

    limit = Math.min(limit, MAX_LIMIT);

    const skip = (page - 1) * limit;

    this._page = page;
    this._limit = limit;

    this.mongooseQuery.skip(skip).limit(limit);

    return this;
  }

  buildPaginationResult(totalDocs) {
    const { _page: page, _limit: limit } = this;

    const paginationResult = {
      total: totalDocs,
      countOfPages: Math.ceil(totalDocs / limit) || 0,
      page,
      limit,
    };

    if (page > 1) paginationResult.prevPage = page - 1;
    if (page * limit < totalDocs) paginationResult.nextPage = page + 1;

    return paginationResult;
  }
}
