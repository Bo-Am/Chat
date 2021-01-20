import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchNewUserAC } from '../../redux/action-creator';
import Error from '../../components/shared/Error/Error';
import './Signup.scss';

function Signup(props) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  const { user, error } = useSelector(state => state);

  useEffect(() => {
    if (user) {
      props.history.push('/');
    }
  }, [user, props.history])

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = form;
    const fetchUser = fetchNewUserAC(name, email, password);
    await fetchUser(dispatch);
    // debugger
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    })
  }

  return (
    <div className="register-box">
      <h2>Sign Up</h2>
 {
      error
        ? <div className="form-container__error"><Error error={error} /></div>
        : null
    }
 <form onSubmit={handleSubmit}>
    <div className="user-box">
      <label>Enter your Username</label>
      <input type="text" name="name" value={form.name} onChange={handleChange} required />
    </div>

  <div className="user-box">
    <label>Enter your Email</label>
    <input type="text" name="email" value={form.email} onChange={handleChange} required />
  </div>
  <div className="user-box">
    <label>Enter your Password</label>
    <input type="password" name="password" value={form.password} onChange={handleChange} required />
  </div>
  <button className="btn" type="submit">Confirm</button>
</form>
<div className="form-container__link">
  <span>Already have an account? <Link to="/join">Login</Link></span>
</div>
</div>
  )
}



export default Signup;
