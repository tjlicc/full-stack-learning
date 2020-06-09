import React from 'react'
import ReactDOM from 'react-dom'

/**
 * 1.定义全局state，防止调用一次myUseState就会被重置成初始值
 * 2.使用数组来保存state，防止多次调用useState导致值被覆盖的现象
 */
let _state = []
let _index = 0
const myUseState = initialState => {
  const curIndex = _index
  _state[curIndex] = _state[curIndex] === undefined ? initialState : _state[curIndex]
  const setState = newState => {
    _state[curIndex] = newState
    reRender()
  }
  _index++
  return [_state[curIndex], setState]
}

const reRender = () => {
  // 重新渲染后，将_index重置为0，防止_index的无限递增
  _index = 0
  ReactDOM.render(<App />, document.querySelector('#root'))
}

const App = () => {
  // console.log('--- app run ---')
  // const [num, setNum] = useState(0)
  // console.log('--- render ---');
  // console.log(`num: ${num}`)

  // const handleClick = () => {
  //   setNum(num + 1)
  //   // 通过日志打印，可以发现useState返回的set函数是异步执行的。这是因为react内部有一个机制来合并多次set，然后只执行一次render
  //   console.log(`num setted: ${num}`)
  // }

  // return (
  //   <div>
  //     <p>{num}</p>
  //     <button onClick={handleClick}>plus</button>
  //   </div>
  // )

  /**
   * 使用自定义的useState
   */
  const [num1, setNum1] = myUseState(0)
  const [num2, setNum2] = myUseState(1)

  return (
    <div>
      <p>{num1}</p>
      <button onClick={() => setNum1(num1 + 1)}>num1 +1</button>
      <p>{num2}</p>
      <button onClick={() => setNum2(num2 + 1)}>num2 +1</button>
    </div>
  )
}

export default App