import React from 'react'

const members = (props) => (
    props.member.map((member) => (
        <div className="col-md-6" key={member.id}>
          <div className="card" style={{ margin: 10}}>
            <div className="card-body">
            <h5 className="card-title">{member.id}</h5>
              <h5 className="card-title">{member.first_name}</h5>
              <h5 className="card-title">{member.last_name}</h5>
              <button 
                className="btn btn-primary" 
                onClick={() => props.editButtonHandler(member)}
              >
                Edit
              </button>
              <button 
                className="btn btn-danger"
                onClick={() =>props.deleteButtonHandler (member.id)}  
              >
                Delete
              </button>
            </div>
          </div>
        </div>
    ))
)

export default members