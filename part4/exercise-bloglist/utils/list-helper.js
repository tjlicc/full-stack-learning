const dumy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  blogs = blogs || []
  return blogs.reduce((sum, blog) => {
    if (blog.likes) {
      sum += blog.likes
    }
    return sum
  }, 0)
}

const favoriteBlog = (blogs) => {
  blogs = blogs || []
  if (blogs.length === 0) {
    return {}
  }

  let favorite = blogs[0]
  blogs.forEach(blog => {
    if (blog.likes && blog.likes > favorite.likes) {
      favorite = blog
    }
  })
  return favorite
}

const mostBlogs = (blogs) => {
  blogs = blogs || []
  if (blogs.length === 0) {
    return {}
  }

  let authoBlogsMap = {}
  blogs.forEach(blog => {
    if (authoBlogsMap[blog.author] !== undefined) {
      authoBlogsMap[blog.author] += 1
    } else {
      authoBlogsMap[blog.author] = 0
    }
  })

  let mostBlogsAuthor = {
    author: '',
    blogs: 0
  }
  for (let author in authoBlogsMap) {
    if (authoBlogsMap[author] >= mostBlogsAuthor.blogs) {
      mostBlogsAuthor = {
        author,
        blogs: authoBlogsMap[author]
      }
    }
  }
  return mostBlogsAuthor
}

const mostLikes = (blogs) => {
  blogs = blogs || []
  if (blogs.length === 0) {
    return {}
  }

  blogs = blogs || []
  if (blogs.length === 0) {
    return {}
  }

  let authoLikesMap = {}
  blogs.forEach(blog => {
    if (authoLikesMap[blog.author] !== undefined) {
      authoLikesMap[blog.author] += blog.likes
    } else {
      authoLikesMap[blog.author] = blog.likes
    }
  })

  let mostLikesAuthor = {
    author: '',
    likes: 0
  }
  for (let author in authoLikesMap) {
    if (authoLikesMap[author] >= mostLikesAuthor.likes) {
      mostLikesAuthor = {
        author,
        likes: authoLikesMap[author]
      }
    }
  }
  return mostLikesAuthor
}

module.exports = {
  dumy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}