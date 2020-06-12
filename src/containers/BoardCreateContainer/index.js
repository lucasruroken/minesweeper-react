import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import {boardsService} from "../../services/BoardsService";

export const BoardCreateContainer = () => {
  const [errors, setErrors] = useState([])
  const [body, setBody] = useState({
    rows: "0",
    columns: "0",
    mines: "0",
  })
  const history = useHistory()

  const onSubmit = () => {
    setErrors([])
    boardsService.create({...body}).then(response => {
      history.push(`/boards/${response.data.data.id}`);
    }, (err => {
      setErrors(err.response.data.errors)
    }))
  }

  return (
    <div>
      { errors.map(error => {
        return <div key={error} className="alert alert-danger">{ error }</div>
      }) }
      <div className="form-group">
        <label>Rows</label>
        <input
          type="number"
          className="form-control"
          value={body.rows}
          onChange={(e) => setBody({...body, rows: e.target.value})} />
      </div>
      <div className="form-group">
        <label>Columns</label>
        <input
          type="number"
          className="form-control"
          value={body.columns}
          onChange={(e) => setBody({...body, columns: e.target.value})} />
      </div>
      <div className="form-group">
        <label>Mines</label>
        <input
          type="number"
          className="form-control"
          value={body.mines}
          onChange={(e) => setBody({...body, mines: e.target.value})} />
      </div>
      <div className="form-group">
        <button onClick={() => onSubmit()} className="btn btn-success">Create</button>
      </div>
    </div>
  )
}