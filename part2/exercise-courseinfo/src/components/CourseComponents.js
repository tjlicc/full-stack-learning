import React from 'react'

const Part = (props) => (
  <p>{props.name} {props.exercises}</p>
)

export const Header = (props) => (
  <h1>{props.course}</h1>
)

export const Content = (props) => (
  <>
    {
      props.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}></Part>)
    }
  </>
)

export const Total = (props) => {
  let total = props.parts.reduce((total, value) => {
    total += value.exercises
    return total
  }, 0)
  return <h4>Total of {total} exercises</h4>
}
