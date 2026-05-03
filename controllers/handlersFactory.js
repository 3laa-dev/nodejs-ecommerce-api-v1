const asyncHandler = require("express-async-handler");
const _Error = require("../utils/Error");
const ApiFeatures = require("../utils/apiFeatures");

exports.deleteOne = Model => asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document)
        return next(new _Error(`No document for this id ${req.params.id}`, 404))
    res.status(204).send()
})

exports.updateOne = Model => asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(
        req.params.id,
        req.body,
        { returnDocument: "after" }
    );
    if (!document)
        return next(new _Error(`No document for this id ${req.params.id}`, 404));
    document.save();
    res.status(200).json({ data: document })

})

exports.createOne = Model => asyncHandler(async (req, res) => {
    const document = await Model.create(req.body)
    res.status(201).json({ data: document });
}
)

exports.getAll = Model => asyncHandler(async (req, res) => {
    const countDocuments = await Model.countDocuments();

    const apiFeatures = new ApiFeatures(
        Model.find((typeof(req.filter) === "function" ) ? {} : req.filter),
        req.query
    )
        .paginate(countDocuments)
        .filter()
        .search()
        .sort()
        .limitFields();
    const { mongooseQuery, paginationResult } = apiFeatures;
    const categories = await mongooseQuery;
    res.status(200).json({ results: categories.length, paginationResult, data: categories })
}
)

exports.getOne = (Model, populationOpt) => asyncHandler(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populationOpt)
        query = query.populate(populationOpt);
    const document = await query;
    if (!document)
        return next(new _Error(`No document for this id ${req.params.id}`, 404));
    res.status(200).json({ data: document });
})
