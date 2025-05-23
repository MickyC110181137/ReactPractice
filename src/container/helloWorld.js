import React, { useState, useEffect, useRef } from "react";
import "./helloWorld.css";
import { pictureImg } from "./pictureImg.js";
import { pictureText } from "./pictureText";

import right01 from "./IMG/Right01.jpg"
import right02 from "./IMG/Right02.jpg"
import right03 from "./IMG/Right03.jpg"
import right04 from "./IMG/Right04.jpg"
import right05 from "./IMG/Right05.jpg"


function HelloWorld() {
  
  /*選取圖片*/
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setCount(index +1)
    _x.current = index +1
  };

  /*左上旋轉*/
  const [count, setCount] = useState(1);
  const [aAngle, setAAngle] = useState(0);
  const [bAngle, setBAngle] = useState(0);

  /*ref*/
  const  TriangleBg = useRef(null);
  const  TriangleBg1 = useRef(null);
  const imgContainerRef = useRef(null);
  const imgContainerRef1 = useRef(null);
  const _x = useRef(1);

  useEffect(()=>{
    /*right select background*/
    const right = document.querySelector('.right').style
    const rightImg = document.querySelectorAll('.right img')

    const imageHoverHandler = (image, index) => {
      const number = index + 1;
      image.dataset.number = number;// 將圖片的數字資料存入 data-number 屬性中
      right.transition = "0.2s ease";
      right.transitionDelay = "0.08s";
      right.backgroundSize = "cover";
      right.backgroundPosition = "center"; 
      if(number === 1){right.backgroundImage =`url(${right01})`;}
      if(number === 2){right.backgroundImage =`url(${right02})`;}
      if(number === 3){right.backgroundImage =`url(${right03})`;}
      if(number === 4){right.backgroundImage =`url(${right04})`;}
      if(number === 5){right.backgroundImage =`url(${right05})`;}
      console.log(number);
    }
    
    const imgBG1 = ()=>{
      if(_x.current === 1){right.backgroundImage =`url(${right01})`}
      if(_x.current === 2){right.backgroundImage =`url(${right02})`}
      if(_x.current === 3){right.backgroundImage =`url(${right03})`}
      if(_x.current === 4){right.backgroundImage =`url(${right04})`}
      if(_x.current === 5){right.backgroundImage =`url(${right05})`}
    }
    
    rightImg.forEach((image, index) => {
      imageHoverHandler(image, index) 
      image.addEventListener('mouseover', () => imageHoverHandler(image, index));
      image.addEventListener("mouseout", imgBG1);
    });
    right.backgroundImage =`url(${right01})`
    return () => {
      rightImg.forEach((image) => {
        image.removeEventListener('mouseover',imageHoverHandler);
        image.removeEventListener("mouseout", imgBG1);
      }); 
    };
  },[]);

  useEffect(() => {
    
    /*將right選中的圖片移動到中間*/
    const imgContainer = imgContainerRef.current;

    const selectedImgWidth = imgContainer.querySelector(".Img-box.selected").offsetWidth;
    const selectedImgLeft = imgContainer.querySelector(".Img-box.selected").offsetLeft;
    const imgContainerWidth = imgContainer.offsetWidth;

    const moveDistance =  imgContainerWidth / 2 - (selectedImgLeft + selectedImgWidth / 2); 
    imgContainer.style.transform = `translateX(${moveDistance}px)`;

    /*將left選中的圖片移動到中間*/
    const imgContainer1 = imgContainerRef1.current;

    const selectedImgWidth1 = imgContainer1.querySelector(".Img-left-box.selected").offsetWidth;
    const selectedImgLeft1 = imgContainer1.querySelector(".Img-left-box.selected").offsetLeft;
    const imgContainerWidth1 = imgContainer1.offsetWidth;

    const moveDistance1 = imgContainerWidth1 / 2 - (selectedImgLeft1 + selectedImgWidth1 / 2); 
    imgContainer1.style.transform = `translateX(${moveDistance1}px)`;


    
    /*變更背景*/
    const TriangleBgCurrent = TriangleBg.current;
    const TriangleBgCurrent1 = TriangleBg1.current;

    if(count === 2){TriangleBgCurrent.style.background = '#0a9396'}
    if(count === 4){TriangleBgCurrent.style.background = '#003566'}
    if(count === 1){TriangleBgCurrent1.style.background = '#8d99ae'}
    if(count === 3){TriangleBgCurrent1.style.background = '#ffe97f'}
    if(count === 5){TriangleBgCurrent1.style.background = '#343a40'}

    /*左上旋轉*/
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
      {/* 上面的三角形 */}
      <div className="left-after"></div>
        <div
          style={{ transform: `rotate(${aAngle}deg)` }}
          ref={TriangleBg}
          className="left-before"
        ></div>
        <div
          style={{ transform: `rotate(${bAngle}deg)` }}
          ref={TriangleBg1}
          className="left-before1"
        ></div>

        <div className="left-box" ref={imgContainerRef1}>
          {pictureText.map(({text,IMG,Icon}, index1) => {
              return (
                <div key={index1}>
                  <div className={`Img-left-box ${index1+1 === count ? "selected" : ""}`}>
                    <img className="Img-left" src={IMG} alt={`img-left-${index1}`} />
                  </div>
                  <div className="text">
                    <div className={`text ${index1+1 === count ? "box" : "non"}`} >
                      <h5>{text}</h5>
                    </div>
                  </div>
                  <div className="icon" >
                    <div className={`icon ${index1+1 === count ? "box" : "non"}`} >
                      <img height={150} width={150} className="iconImg" src={Icon} alt={`icon-left-${index1}`} />
                    </div>
                  </div>
                  <div className="avater">
                    <div className={`avater ${index1+1 === count ? "box" : "non"}`} >
                      <img height={500} width={500} src={IMG} alt={`icon-${index1}`} />
                    </div>
                  </div>
                
                </div>
              );
          })}
        </div>
        
      </div>
      <div className="rightFather">
        <div className="right">
          <div className="Img-container" ref={imgContainerRef}>
            {pictureImg.map(({ avatar, name }, index) => {
              return (
                <div
                  className={`Img-box ${
                    selectedImageIndex === index ? "selected" : ""
                  }`}
                  onClick={() => handleImageClick(index)}
                  key={index}
                >
                  <img className="Img" src={avatar} alt={`img-${index}`} />
                  <h5>{name}</h5>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default HelloWorld;
