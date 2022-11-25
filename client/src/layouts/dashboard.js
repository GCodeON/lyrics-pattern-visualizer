import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

import Sidebar from '../components/ui/sidebar/sidebar';
import './dashboard.scss';

const Dashboard = (props) => {
  const classes =`${props.className ? props.className : ''}`;


    return (
        <div className={classes}>
          <div className="dashboard">
            <Sidebar></Sidebar>
            <div>
              <Outlet />
              <div className='spotify-web-player'>
                <SpotifyPlayer
                    token="BQBKriZtmJlGerTUiJaEKehf4jvKM0cz58FW3aeoz_aoqJ0PhjG7E7uHoHcoDBeSoKJrxZ56x2PTcwrAfBaW9WUJpDvEVWAQRElXNkX4SiOB29eGfhml9QairI1-bekjU0c1xuHRoPWBw4uHDRjeh92MlYAGLU0Tz6wz1nUKnZ5-L7t1bF4X1F1aU9ABmjrimkcru1Qk8RqPfYXfZs_oFHv8v09NXw"
                    syncExternalDevice={true}
                />
              </div>
            </div>
          </div>
          {/* <div className='spotify-web-player'>
            <SpotifyPlayer
                token="BQBKriZtmJlGerTUiJaEKehf4jvKM0cz58FW3aeoz_aoqJ0PhjG7E7uHoHcoDBeSoKJrxZ56x2PTcwrAfBaW9WUJpDvEVWAQRElXNkX4SiOB29eGfhml9QairI1-bekjU0c1xuHRoPWBw4uHDRjeh92MlYAGLU0Tz6wz1nUKnZ5-L7t1bF4X1F1aU9ABmjrimkcru1Qk8RqPfYXfZs_oFHv8v09NXw"
                syncExternalDevice={true}
            />
          </div> */}
        </div>
    )
}

export default Dashboard;