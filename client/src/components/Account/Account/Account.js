import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './Account.module.css';

import partnerAC from '../../../redux/actionCreators/partnerAC';

function Account() {
  const user = useSelector((state) => state.auth.user);
  const [partnerPassword, setPartnerPassword] = useState();
  const dispatch = useDispatch();

  function handlePartnerPassword(event) {
    setPartnerPassword(event.target.value);
  }

  function handleAccount(event) {
    event.preventDefault();
    fetch(`http://localhost:4000/api/main/${user.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ email: partnerPassword })
    })
      .then((response) => (response.status === 200
        ? dispatch(partnerAC(partnerPassword))
        : null));
  }

  return (
  <section className={style.main}>
    <h1>Name: {user.name}</h1>
    <p>Email: {user.email}</p>
    <h1>Goal:</h1>
   <form onSubmit={handleAccount}>
     <select>
       <option>get pregnant</option>
       <option>don't get pregnant</option>
     </select>
     <h1>Email partner</h1>
     <input type="text" placeholder="Email Partner" onChange={handlePartnerPassword} value={partnerPassword}/>
     <button>Add</button>
   </form>
  </section>
  );
}

export default Account;
