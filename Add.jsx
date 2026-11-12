import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Add = () => {

    const [course, setCourse] = useState({
        id: '',
        Name: '',
        assignedTo: '',
        category: '',
        priority: 'low',
        dueDate: '',
        Status: 'pending',
        attachment: '',
    })
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/course/add', course)
            .then(() => navigate('/'))
            .catch((err) => {
                console.log(err)
                alert(err.response?.data?.message || 'Could not add task')
            })
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center g-2">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title mb-3">Add</h4>
                            <form onSubmit={ handleSubmit }>
                                <div className="form-floating mb-3">
                                    <input type="number" className="form-control" id="id" placeholder=""
                                        value={ course.id } required
                                        onChange={ (e) => setCourse({ ...course, id: e.target.value }) } />
                                    <label htmlFor="id">id</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="Name" placeholder=""
                                        value={ course.Name } required
                                        onChange={ (e) => setCourse({ ...course, Name: e.target.value }) } />
                                    <label htmlFor="Name">Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="assignedTo" placeholder=""
                                        value={ course.assignedTo } required
                                        onChange={ (e) => setCourse({ ...course, assignedTo: e.target.value }) } />
                                    <label htmlFor="assignedTo">assignedTo</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="category" placeholder=""
                                        value={ course.category } required
                                        onChange={ (e) => setCourse({ ...course, category: e.target.value }) } />
                                    <label htmlFor="category">Category</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <select className="form-select" id="priority"
                                        value={ course.priority }
                                        onChange={ (e) => setCourse({ ...course, priority: e.target.value }) }>
                                        <option value="low">low</option>
                                        <option value="medium">medium</option>
                                        <option value="high">high</option>
                                    </select>
                                    <label htmlFor="priority">priority</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="date" className="form-control" id="dueDate" placeholder=""
                                        value={ course.dueDate } required
                                        onChange={ (e) => setCourse({ ...course, dueDate: e.target.value }) } />
                                    <label htmlFor="dueDate">DueDate</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <select className="form-select" id="Status"
                                        value={ course.Status }
                                        onChange={ (e) => setCourse({ ...course, Status: e.target.value }) }>
                                        <option value="pending">pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="completed">completed</option>
                                    </select>
                                    <label htmlFor="Status">Status</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="attachment" placeholder=""
                                        value={ course.attachment }
                                        onChange={ (e) => setCourse({ ...course, attachment: e.target.value }) } />
                                    <label htmlFor="attachment">attachment (image URL)</label>
                                </div>

                                { course.attachment &&
                                    <div className="mb-3">
                                        <img src={ course.attachment } alt="preview"
                                            style={ { height: '120px', objectFit: 'cover' } } />
                                    </div>
                                }

                                <button type="submit" className="btn btn-primary">Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add
