import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('render content', () => {
  const blog = {
    title: 'test title',
    author: 'test author'
  }

  const component = render(
    <Blog blog={blog}></Blog>
  )

  // console.log(prettyDOM(component.container))

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent('test title')
  expect(div).toHaveTextContent('test author')
})

test('clicking the toggle button once', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'http://www.example.com',
    likes: 100
  }

  const component = render(
    <Blog blog={blog}></Blog>
  )

  const viewBtn = component.container.querySelector('.view-btn')
  expect(viewBtn).toHaveStyle('display: inline-block;')
  fireEvent.click(viewBtn)
  expect(viewBtn).toHaveStyle('display: none;')
})

test('clicking the toggle button twice', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'http://www.example.com',
    likes: 100
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} likeChange={mockHandler}></Blog>
  )
  const viewBtn = component.container.querySelector('.view-btn')
  expect(viewBtn).toHaveStyle('display: inline-block;')
  fireEvent.click(viewBtn)
  expect(viewBtn).toHaveStyle('display: none;')

  const likeBtn = component.container.querySelector('.like-btn')
  fireEvent.click(likeBtn)
  fireEvent.click(likeBtn)
  expect(mockHandler.mock.calls).toHaveLength(0)
})