import React, {useEffect} from 'react';
import {useRecoilState} from "recoil";
import {userAtom} from "../recoil/atoms/userAtom";
import {userService} from "../services/UserService";

export const AppContainer = props => {
  const [user, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    if (user.jwt) {
      userService.me().then(response => {
        setUser({
          ...user,
          data: response.data.data
        });
      })
    }
  }, [])

  return props.children;
}