import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoginAC } from '../../redux/action-creator';
import Error from '../../components/shared/Error/Error';
// передаем пустые строчки email и password у состояния
function Login(props) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  // из redux:
  const { user, error } = useSelector(state => state);

  useEffect(() => {
    if (user) {
      props.history.push('/');
    }
  }, [user, props.history])


  const dispatch = useDispatch();

// обработчик формы, при вводе данных формы через деструктуризацию отрабатывается AC
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;
    const fetchLogin = fetchLoginAC(email, password);
    await fetchLogin(dispatch);
  }

// обработчик изменения значений в форме
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
      // debugger
    })
  }

  return (
    <div className="login-box">
      <h2>Login to Chat!</h2>
      {
            error
              ? <div className="form-container__error"><Error error={error} /></div>
              : null
          }
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <label>Email</label>
          <input type="text" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="user-box">
          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <button className="btn" type="submit">Confirm</button>
      </form>
      <div className="form-container__link">
        <span>Need an account? <Link to="/signup">Register</Link></span>
      </div>
    </div>
  )
}









export default Login;
