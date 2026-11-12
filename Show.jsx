import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, NavLink, useNavigate } from 'react-router-dom'

const Show = () => {

    const [course, setCourse] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:4000/course/course/${id}`)
            .then((res) => setCourse(res.data))
            .catch((err) => console.log(err))
    }, [id])

    const handleDelete = () => {
        axios.delete(`http://localhost:4000/course/${id}`)
            .then(() => navigate('/'))
            .catch((err) => console.log(err))
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center g-2">
                <div className="col-md-6">
                    <div className="card">
                        { course.attachment &&
                            <img className="card-img-top" src={ course.attachment } alt={ course.Name }
                                style={ { maxHeight: '260px', objectFit: 'cover' } } />
                        }
                        <div className="card-body">
                            <h6 className="text-muted">ID: { course.id }</h6>
                            <h4 className="card-title">{ course.Name }</h4>
                            <p className="card-text mb-1"><strong>assignedTo:</strong> { course.assignedTo }</p>
                            <p className="card-text mb-1"><strong>Category:</strong> { course.category }</p>
                            <p className="card-text mb-1"><strong>Priority:</strong> { course.priority }</p>
                            <p className="card-text mb-1"><strong>DueDate:</strong> { course.dueDate ? String(course.dueDate).slice(0, 10) : '' }</p>
                            <p className="card-text mb-3"><strong>Status:</strong> { course.Status }</p>

                            <NavLink className="btn btn-secondary me-2" to="/" role="button">Back to Home</NavLink>
                            <NavLink className="btn btn-warning me-2" to={ `/edit/${id}` } role="button">Edit</NavLink>
                            <button type="button" className="btn btn-danger" onClick={ handleDelete }>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Show
