import React from 'react';

// const Hello = () => {
//   const now = new Date()
//   const a = 10
//   const b = 20

//   return (
//     <div>
//       <p>Hello World! It's {now.toString()}</p>
//       <p>{a} plus {b} is {a + b}</p>
//     </div>
//   )
// }

const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age
  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>So, you are probably born in {bornYear()}</p>
    </div>
  )
}

export const App = () => {
  let name = 'peter'
  let age = 10
  return (
    // 使用fragments元素，跳过根元素的渲染
    <>
      <h1>Greeting</h1>
      <Hello name="Jeorge" age={10 + 26}></Hello>
      <Hello name={name} age={age}></Hello>
    </>
  )
}
