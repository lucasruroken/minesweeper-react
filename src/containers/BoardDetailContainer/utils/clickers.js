import {boardsService} from "../../../services/BoardsService";

export const click = (cell, setBoard, action) => {
  if (!cell || cell.clicked) {
    return
  }

  boardsService.click(cell, action).then(() => {
    boardsService.show(cell.board_id).then(response => {
      setBoard(response.data);
    })
  })
}