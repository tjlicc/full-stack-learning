import React from 'react'
import { Header, Content, Total } from './CourseComponents'

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </>
  )
}

export default Course