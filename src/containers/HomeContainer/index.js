import React, {useEffect} from 'react';
import {useRecoilState} from "recoil";
import {useHistory, Link} from 'react-router-dom'
import {boardsAtom} from "../../recoil/atoms/boardsAtom";
import {userAtom} from "../../recoil/atoms/userAtom";
import {boardsService} from "../../services/BoardsService";

export const HomeContainer = () => {
  const [boards, setBoards] = useRecoilState(boardsAtom)
  const [user] = useRecoilState(userAtom);
  const history = useHistory()

  useEffect(() => {
    if (user.data) {
      boardsService.index(1, 20).then(response => {
        setBoards(response.data.data)
      })
    }
  }, [user])

  const navigateTo = id => {
    history.push(`/boards/${id}`)
  }

  if (!user.data) {
    return <div>Welcome to minesweeper, please create an account</div>
  }

  return (
    <>
      <Link
        to='/create_board'
        className="btn btn-primary" style={{marginBottom: '20px'}}
      >Create Game</Link>
      <table className="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Created At</th>
          <th scope="col">Total Rows</th>
          <th scope="col">Total Columns</th>
          <th scope="col">State</th>
          <th scope="col">Finished at</th>
        </tr>
        </thead>
        <tbody>
        { boards.map(board => {
          const { id, created_at, rows, columns, state, finished_at } = board.attributes;
          return (
            <tr key={`board-${board.id}`} onClick={() => navigateTo(id)}>
              <th scope="row">{ id }</th>
              <td>{ created_at }</td>
              <td>{ rows }</td>
              <td>{ columns }</td>
              <td>{ state }</td>
              <td>{ finished_at }</td>
            </tr>
          )
        }) }

        </tbody>
      </table>
    </>
  )
}