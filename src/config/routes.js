import {BoardCreateContainer} from "../containers/BoardCreateContainer";
import {BoardDetailContainer} from "../containers/BoardDetailContainer";
import {HomeContainer} from "../containers/HomeContainer";
import {SignInContainer} from "../containers/SignInContainer";

export const routes = [
  { to: '/', component: HomeContainer },
  { to: '/boards/:id', component: BoardDetailContainer },
  { to: '/create_board', component: BoardCreateContainer },
  { to: '/sign', component: SignInContainer }
]