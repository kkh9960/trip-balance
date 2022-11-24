import React, { useEffect } from "react";
import "./BoardMypost.css";

const BoardMypost = ({ post, mypost }) => {
  useEffect(() => {
    let isDown = false;
    let startX;
    let scrollLeft;

    const slider = document.querySelector(".items");

    const end = () => {
      isDown = false;
      slider.classList.remove("active");
    };

    const start = (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const move = (e) => {
      if (!isDown) return;

      e.preventDefault();
      const x = e.pageX || e.touches[0].pageX - slider.offsetLeft;
      const dist = x - startX;
      slider.scrollLeft = scrollLeft - dist;
    };

    slider.addEventListener("mousedown", start);
    slider.addEventListener("touchstart", start);

    slider.addEventListener("mousemove", move);
    slider.addEventListener("touchmove", move);

    slider.addEventListener("mouseleave", end);
    slider.addEventListener("mouseup", end);
    slider.addEventListener("touchend", end);
  }, []);

  return (
    <main>
      <h1>{post.author}님의 다른글</h1>
      <div className="wrapper">
        <ul className="items">
          {mypost &&
            mypost.map((item, idx) => (
              <li className="item" key={idx}>
                <div className="itemimgbox">
                  <img className="itemimg" src="../img/default4.jpg" alt="" />
                </div>
                <div className="textbox">
                  <h2>{item.title}</h2>
                  <span>{item.local}</span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
};

export default BoardMypost;