import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const PLACEHOLDER = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="180"><rect width="100%" height="100%" fill="#e2e8f0"/><text x="50%" y="50%" fill="#64748b" font-family="Arial" font-size="18" text-anchor="middle" dominant-baseline="middle">No attachment</text></svg>'
)

const Home = () => {
  const [courses, setCourses] = useState([])
  const [search, setSearch] = useState('')

  const fetchCourses = () => {
    axios.get('http://localhost:4000/course')
      .then((res) => setCourses(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/course/${id}`)
      .then(() => setCourses((prev) => prev.filter((c) => c._id !== id)))
      .catch((err) => console.log(err))
  }

  const term = search.toLowerCase()

  const filteredCourses = courses.filter((c) => {
    const Name = c.Name || ''
    const assignedTo = c.assignedTo || ''
    const category = c.category || ''
    const priority = c.priority || ''
    const status = c.Status || ''

    return (
      Name.toLowerCase().includes(term) ||
      assignedTo.toLowerCase().includes(term) ||
      category.toLowerCase().includes(term) ||
      priority.toLowerCase().includes(term) ||
      status.toLowerCase().includes(term)
    )
  })

  const styles = {
    pageWrapper: {
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh',
      padding: '40px 0'
    },
    searchCard: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      padding: '20px'
    },
    courseCard: {
      borderRadius: '16px',
      overflow: 'hidden',
      border: 'none',
      boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      backgroundColor: '#ffffff'
    },
    badge: {
      fontSize: '0.8rem',
      padding: '4px 10px',
      borderRadius: '20px',
      backgroundColor: '#eef2f7',
      color: '#334155',
      display: 'inline-block',
      marginRight: '6px'
    }
  }

  return (
    <div style={styles.pageWrapper}>
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-md-8" style={styles.searchCard}>
            <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
              <input
                className="form-control me-2 py-2 px-3 border-0 bg-light"
                type="search"
                placeholder="Search by Name, assignedTo, Category, priority or status..."
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ borderRadius: '8px' }}
              />
              <button className="btn btn-dark px-4" type="submit" style={{ borderRadius: '8px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className="row justify-content-center g-4">
          {filteredCourses.map((course) => {
            const currentId = course._id
            const displayTitle = course.Name || 'Untitled Task'

            return (
              <div className="col-md-4" key={currentId}>
                <div
                  className="card h-100"
                  style={styles.courseCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)'
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.12)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = styles.courseCard.boxShadow
                  }}
                >
                  <img
                    className="card-img-top"
                    src={course.attachment || PLACEHOLDER}
                    alt={displayTitle}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = PLACEHOLDER }}
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column p-4">
                    <h5 className="card-title fw-bold mb-3 text-dark">{displayTitle}</h5>

                    <div className="mb-3">
                      <p className="card-text mb-1 text-secondary"><strong className="text-dark">Assigned To:</strong> {course.assignedTo || 'N/A'}</p>
                      <p className="card-text mb-1 text-secondary"><strong className="text-dark">Category:</strong> {course.category || 'N/A'}</p>
                      <p className="card-text mb-2 text-secondary"><strong className="text-dark">Due Date:</strong> {course.dueDate ? String(course.dueDate).slice(0, 10) : 'N/A'}</p>
                      <span style={styles.badge}>{course.Status || 'pending'}</span>
                      <span style={styles.badge}>{course.priority || 'low'}</span>
                    </div>

                    <div className="mt-auto pt-3 border-top d-flex gap-2">
                      <NavLink className="btn btn-primary btn-sm flex-grow-1" to={`/${currentId}`} role="button">View</NavLink>
                      <NavLink className="btn btn-outline-warning btn-sm flex-grow-1" to={`/edit/${currentId}`} role="button">Edit</NavLink>
                      <button type="button" className="btn btn-outline-danger btn-sm flex-grow-1" onClick={() => handleDelete(currentId)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {filteredCourses.length === 0 && (
            <div className="text-center py-5">
              <p className="fs-5 text-muted">No matching Task found. Try a different search term!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
