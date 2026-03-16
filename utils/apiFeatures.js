class ApiFeatures {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }

    filter() {
        let filterObj = { ...this.queryString };
        const excludesFields = ["limit", "page", "sort", "fileds","keyword"];
        excludesFields.forEach(item => { delete filterObj[`${item}`] })
        filterObj = JSON.stringify(filterObj);
        filterObj = filterObj.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`)
        filterObj = JSON.parse(filterObj);
        this.mongooseQuery = this.mongooseQuery.find(filterObj);
        return this
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        } else {
            this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
        }

        return this;
    }

    limitFields() {
        let fileds;
        if (this.queryString.fileds) {
             fileds = this.queryString.fileds.split(",").join(" ")
        } else {
            fileds = "-__v";
        }
        this.mongooseQuery = this.mongooseQuery.select(fileds);
        return this;
    }

    search() {
        if (this.queryString.keyword) {

            const filterObj = {
                $or: [
                    { title: { $regex: this.queryString.keyword, $options: "i" } },
                    { description: { $regex: this.queryString.keyword, $options: "i" } },
                    { name: { $regex: this.queryString.keyword, $options: "i" } }
                ]
            }
            this.mongooseQuery = this.mongooseQuery.find(filterObj)
        }

        return this;
    }

    paginate(countDocuments) {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 5;
        const skip = (limit * (page - 1))
        const pagination = {};
        pagination.currentPage = page;
        pagination.limit = limit;
        pagination.numberOfPages =Math.ceil( countDocuments / limit);
        
        this.paginationResult = pagination;
        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
        return this;
    }
}

module.exports = ApiFeatures;