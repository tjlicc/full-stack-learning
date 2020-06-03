import React, { useState } from 'react';

const History = ({ allClicks }) => {
  if (allClicks.length == 0) {
    return (
      <div>the app is used by pressing the buttons</div>
    )
  } else {
    return (
      <div>button press history: {allClicks.join(' ')}</div>
    )
  }
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

export const App = () => {
  /*****************************************
   * 1.多次使用useState构造出要使用的有状态数据 *
   *****************************************/
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAllClicks] = useState([]);

  const handleLeftClick = () => {
    // 不建议这么使用，虽然可以工作，但是可能会引发其他问题。react中不使用响应式数据，而是使用不可变数据
    // allClicks.push('L')
    // setAllClicks(allClicks)

    setAllClicks(allClicks.concat('L'))
    setLeft(left + 1)
  }
  const handleRightClick = () => {
    setAllClicks(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      <div>
        {left}
        <Button onClick={handleLeftClick} text="left"></Button>
        <Button onClick={handleRightClick} text="right"></Button>
        {right}
        <History allClicks={allClicks}></History>
      </div>
    </div>
  )

  /************************************
   * 2.一次性使用useState构造出复杂的数据 *
   ************************************/
  // const [clicks, setClicks] = useState({
  //   left: 0,
  //   right: 0
  // })

  // const handleLeftClick = () => {
  //   // 可以使用对象展开语法简化代码
  //   // const newClick = {
  //   //   left: clicks.left + 1,
  //   //   right: clicks.right
  //   // }

  //   // 不要这么用，这么用也不会起作用。react中的一大原则就是不可以直接修改状态变量，一定要用新的数据替换原来的数据
  //   // clicks.left++
  //   // setClicks(clicks)

  //   const newClick = {
  //     ...clicks,
  //     left: clicks.left + 1
  //   }
  //   setClicks(newClick)
  // }
  // const handleRightClick = () => {
  //   const newClick = {
  //     ...clicks,
  //     right: clicks.right + 1
  //   }
  //   setClicks(newClick)
  // }

  // return (
  //   <div>
  //     <div>
  //       {clicks.left}
  //       <button onClick={handleLeftClick}>left</button>
  //       <button onClick={handleRightClick}>right</button>
  //       {clicks.right}
  //     </div>
  //   </div>
  // )
}