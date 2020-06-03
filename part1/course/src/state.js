import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Display = ({ counter }) => {
  return (
    <div>{counter}</div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

export const App = () => {
  // 创建有状态变量和修改该变量值的函数，同时设置状态变量的初始值为0
  const [counter, setCounter] = useState(0)

  // 状态修改后，组件会被重新渲染，所以setTimeout会被重新执行
  // setTimeout(() => setCounter(counter + 1), 1000)

  // 事件处理函数最好不要放到JSX中直接声明，有个统一声明的地方便于管理
  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  return (
    <div>
      <Display counter={counter}></Display>
      <Button handleClick={increaseByOne} text='plus'></Button>
      <Button handleClick={setToZero} text='zero'></Button>
      <Button handleClick={decreaseByOne} text='minus'></Button>
    </div>
  )
}


// 不推荐使用
// let counter = 1
// const refresh = () => {
//   ReactDOM.render(<App counter={counter} />, document.querySelector('#root'))
// }
// setInterval(() => {
//   refresh()
//   counter += 1
// }, 1000)