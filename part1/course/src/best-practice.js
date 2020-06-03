import React, { useState } from 'react';

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Display = ({ value }) => {
  return (
    <div>{value}</div>
  )
}

export const App = () => {
  // 不要在条件判断中使用hook，这么用会无法通过编译。Hook声明要放在和return平级的地方
  // if (props.someCondition) {
  //   const [foobar, setFoobar] = useState(0)
  // } 

  // 不要在组件中定义其他组件
  // const Button = ({ handleClick, text }) => {
  //   return (
  //     <button onClick={handleClick}>{text}</button>
  //   )
  // }

  const [value, setValue] = useState(0);
  // const handleClick = () => {
  //   console.log('clicked the button')
  // }
  // const hello = (who) => {
  //   return () => {
  //     console.log('hello ', who)
  //   }
  // }
  // const setToValue = (newValue) => {
  //   return () => setValue(newValue)
  // }
  const setToValue = (newValue) => setValue(newValue)

  return (
    <div>
      {/* 事件监听需要是一个函数类型的变量，或者是一个返回函数的函数 */}
      {/* <button onClick={'Crap...'}>button</button> */}
      {/* <button onClick={value + 1}>button</button> */}
      {/* <button onClick={console.log('clicked the button')}>button</button> */}
      {/* <button onClick={handleClick}>button</button> */}
      {/* <button onClick={hello('world')}>world</button>
      <button onClick={hello('react')}>react</button> */}
      {/* <button onClick={setToValue(1000)}>thousands</button>
      <button onClick={setToValue(0)}>rest</button>
      <button onClick={setToValue(value + 1)}>+1</button> */}
      {/* <button onClick={() => setToValue(0)}>rest</button> */}
      <Display value={value}></Display>
      <Button handleClick={() => setToValue(1000)} text="thousands"></Button>
      <Button handleClick={() => setToValue(0)} text="rest"></Button>
      <Button handleClick={() => setToValue(value + 1)} text="+1"></Button>
    </div>
  )
}