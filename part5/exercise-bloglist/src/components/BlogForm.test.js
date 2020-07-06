import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import BlogForm from './BlogForm'

test('submit form', () => {
  const mockHandler = jest.fn()

  const component = render(
    <BlogForm createBlog={mockHandler}></BlogForm>
  )

  // console.log(prettyDOM(component.container))

  const authorInput = component.container.querySelector('#author')
  fireEvent.change(authorInput, {
    target: { value: 'author' }
  })

  const submitBtn = component.container.querySelector('#submit')
  fireEvent.click(submitBtn)

  const blog = mockHandler.mock.calls[0][0]
  expect(blog.title).toEqual('')
  expect(blog.author).toEqual('author')
  expect(blog.url).toEqual('')
})