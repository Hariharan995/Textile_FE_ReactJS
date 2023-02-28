import React from "react";
import clock from "../../assets/images/clock.webp";
import "./style.scss";

type ProgressBar = {
  progress: number
}


const ProgressBar: React.FC<ProgressBar> = ({ progress }) => {

  return (
    <div >
      <div className='progression-info'>
        <div>
          <h2>{progress} %- Completed</h2>
        </div>
        <img className="clock-img" src={clock} alt="progression-clock" />
      </div>
      <div className="progression">
        <div className="current-progression" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
