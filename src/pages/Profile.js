import React, { useState } from 'react';

import api from '../components/Apiservice';





function Profile() {

  const [sample, setSample] = useState("");

  const handleClick = () => {

    api.get('/sample').then((res) => {

      console.log("res", res);
      setSample(res.data)

    })



  }



  return (
    <div>
      <h2 onClick={handleClick}>Profile Page</h2>
      <p>This shows your profile data.{sample}</p>
    </div>
  );
}

export default Profile;
