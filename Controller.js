const Model = require('../models/Model');

exports.add = async (req, res) => {
    try {
        const new_course = new Model(req.body)
        const result = await new_course.save()
        res.status(200).json(result)
    } catch (err) {
        console.log(err.message)
        res.status(400).json({ message: err.message })
    }
}

exports.shows = async (req, res) => {
    try {
        const courses = await Model.find()
        res.status(200).json(courses)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.show = async (req, res) => {
    try {
        const course = await Model.findById(req.params.id)
        if (course != null) {
            res.status(200).json(course)
        } else {
            res.status(404).json({ message: 'not record found' })
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.update = async (req, res) => {
    try {
        await Model.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
        res.status(200).json({ message: ' updated successfully...' })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.del = async (req, res) => {
    try {
        const course = await Model.findByIdAndDelete(req.params.id)
        if (course != null) {
            res.status(200).json({ message: ' deleted successfully...' })
        } else {
            res.status(404).json({ message: ' not found...' })
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
