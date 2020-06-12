import React, {useEffect, useState} from 'react';
import {useRecoilState} from "recoil";
import {IconsInformation} from "../../components/common/IconsInformation";
import {boardAtom} from "../../recoil/atoms/boardAtom";
import {boardsService} from "../../services/BoardsService";

import "./index.css"
import {click} from "./utils/clickers";

export const BoardDetailContainer = props => {
  const [board, setBoard] = useRecoilState(boardAtom)
  const { match: { params: { id } } } = props;
  const [email, setEmail] = useState("")

  useEffect(() => {
    boardsService.show(id).then(response => {
      setBoard(response.data);
    })
  }, [])

  if (! board) {
    return null;
  }

  const onAddUser = () => {
    boardsService.addUser(board.data.id, email).then(response => {
      boardsService.show(id).then(response => {
        setBoard(response.data);
        setEmail('')
      })
    })
  }

  const renderCellContent = cell => {
    if (cell.clicked) {
      return renderClicked(cell)
    }

    return renderNonClicked(cell);
  }

  const renderClicked = (cell) => {
    if (cell.type === "Cells::Mine") {
      return <i className="material-icons text-warning">ac_unit</i>
    }

    return <strong>{ cell.mines_around }</strong>
  }

  const renderNonClicked = cell => {
    switch(cell.flag) {
      case 'mark':
        return <i className="material-icons text-dark">error</i>
      case 'red':
        return <i className="material-icons">flag</i>;
      default:
        return <i className="material-icons">check_box_outline_blank</i>
    }
  }

  const onClickCell = (event, cell) => {
    event.preventDefault()

    if (cell.clicked || board.data.attributes.finished_at) {
      return
    }

    // Left click
    if (event.type === 'click') {
      click(cell, setBoard, 'click')
      return
    }

    switch(cell.flag) {
      case "empty":
        click(cell, setBoard, 'mark')
        break
      case "mark":
        click(cell, setBoard, 'red')
        break;
      default:
        click(cell, setBoard, 'restore')
    }
  }

  const { data: { attributes: { finished_at, state } } } = board

  return (
    <div className="board-detail">
      { finished_at && (
        <div className="alert alert-success">
          Game finished! You { state === 'won' ? 'won' : 'lost' }
        </div>
      ) }

      <div>
        Users: { board.included.map(user => user.attributes.email).join(', ') }
      </div>

      <table className="table table-bordered">
        <tbody>
        {
          board.cells.map((item, index) => {
            return (
              <tr key={`row-${index}`}>
                {
                  item.data.map((cell, cellIndex) => {
                    return (
                      <td
                        onClick={(event) => onClickCell(event, cell.attributes)}
                        onContextMenu={(event) => onClickCell(event, cell.attributes)}
                        key={`cell-index-${cellIndex}`}
                      >
                        { renderCellContent(cell.attributes) }
                      </td>
                    )
                  })
                }
              </tr>
            )
          })
        }
        </tbody>
      </table>

      <div className="icons-information">
        <div className="alert alert-primary">
          <strong>Note:</strong> Right clicking on a square will change it into mark. <br/>
          Right clicking on a mark will change it to a flag. <br/>
          Right Clicking on a flag will change it to a square
        </div>
      </div>

      <div className="icons-information">
        <IconsInformation />
      </div>

      <div className="icons-information">
        <div className="form-group">
          <input placeholder="Email..." value={email} onChange={e => setEmail(e.target.value)} type="text" className="form-control"/>
        </div>
        <div className="form-group">
          <button onClick={() => onAddUser()} className="btn btn-success">Add user</button>
        </div>
      </div>
    </div>
  )
}