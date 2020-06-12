import React, {useState} from 'react'
import {useHistory, Link} from 'react-router-dom'
import {useRecoilState} from "recoil";
import {userAtom} from "../../recoil/atoms/userAtom";
import {userService} from "../../services/UserService";

export const SignInContainer = () => {
  const [error, setError] = useState(null)
  const [user, setUser] = useRecoilState(userAtom);
  const history = useHistory()
  const [signUpBody, setSignUpBody] = useState({
    email: '',
    password: '',
    password_confirmation: ''
  });

  const [signInBody, setSignInBody] = useState({
    email: '',
    password: '',
  });

  if (user.data) {
    history.push('/')
    return null;
  }

  const onSignUp = () => {
    userService.create({...signUpBody}).then(response => {
      setDataAndRedirect(response)
    }, err => {
      setError(err.response.data.data.message)
    })
  }

  const onSignIn = () => {
    userService.sessionCreate({...signInBody}).then(response => {
      setDataAndRedirect(response)
    }, err => {
      setError(err.response.data.data.message)
    })
  }

  const setDataAndRedirect = response => {
    const { data: { data: { jwt, attributes } } } = response
    localStorage.setItem('jwt', jwt)
    setUser({
      jwt,
      data: attributes
    })
    history.push('/')
  }

  return (
    <div>
      { error && <div className="alert alert-danger">{ error }</div> }
      <div className="row">
        <div className="col-sm">
          <h3>Create user</h3>

          <div className="form-group">
            <label>Email: </label>
            <input type="text" value={signUpBody.email} className="form-control" onChange={e => setSignUpBody({...signUpBody, email: e.target.value})} />
          </div>

          <div className="form-group">
            <label>Password: </label>
            <input type="password" value={signUpBody.password} className="form-control" onChange={e => setSignUpBody({...signUpBody, password: e.target.value})} />
          </div>

          <div className="form-group">
            <label>Password confirmation: </label>
            <input type="password" value={signUpBody.password_confirmation} className="form-control" onChange={e => setSignUpBody({...signUpBody, password_confirmation: e.target.value})} />
          </div>

          <div className="form-group">
            <button onClick={() => onSignUp()} className="btn btn-success">Signup</button>
          </div>
        </div>

        <div className="col-sm">
          <h3>Login</h3>

          <div className="form-group">
            <label>Email: </label>
            <input type="text" value={signInBody.email} className="form-control" onChange={e => setSignInBody({...signInBody, email: e.target.value})} />
          </div>

          <div className="form-group">
            <label>Password: </label>
            <input type="password" value={signInBody.password} className="form-control" onChange={e => setSignInBody({...signInBody, password: e.target.value})} />
          </div>

          <div className="form-group">
            <button onClick={() => onSignIn()} className="btn btn-success">Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}