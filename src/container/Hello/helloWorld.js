import React, { useState ,useEffect} from 'react';
import './helloWorld.css';
import { pictureImg } from './pictureImg.js';

function HelloWorld() {
  /*選取圖片*/
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setCount(index+1);
  };
  /*左上旋轉*/
  const [count, setCount] = useState(0);
  const [aAngle, setAAngle] = useState(0);
  const [bAngle, setBAngle] = useState(0);

  useEffect(() => {
    if (count % 2 === 0) {
      setAAngle(-20);
      setBAngle(0);
    } else {
      setAAngle(0);
      setBAngle(-20);
    }
  }, [count]);
  
  return (
    <div className="parent">
      <div className="left">
          <div style={{ transform: `rotate(${aAngle}deg)` }} className="left-before"></div>
          <div style={{ transform: `rotate(${bAngle}deg)` }} className="left-before1"></div>
          <div className="left-after"></div>
      </div>
      <div className="right">
        <div className='Img-container'>
          {pictureImg.map(({avatar,name},index)=>{
            return(
              <div 
              className={`Img-box ${selectedImageIndex === index ? 'selected' : ''}`}
              onClick={() => handleImageClick(index)}
              key={index}
              >
                <img className='Img' src={avatar} alt={`img-${index}`} />
                <h5>{name}</h5>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


export default HelloWorld;