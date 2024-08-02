const logger = require('./logger')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    const initialValue = 0
    const sumOfLikes = blogs.reduce(
        (accumulator, currentValue) => accumulator + currentValue.likes, 
        initialValue
    )
    return sumOfLikes
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0){
        return ('No blogs is array')
    }
    const blogOfMostLikes = blogs.reduce(
        (max, blog) => blog.likes > max.likes ? blog : max, 
        blogs[0]
    )
    return {
        title: blogOfMostLikes.title,
        author: blogOfMostLikes.author,
        likes: blogOfMostLikes.likes
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0){
        return ('No blogs is array')
    }
    const authorCounts = blogs.reduce(
        (counts, blog) => {
            counts[blog.author] = (counts[blog.author] || 0) + 1;
            return counts;
        }, 
        {}
    )
    const maxAuthor = Object.keys(authorCounts).reduce(
        (max, author) => {
            return authorCounts[author] > authorCounts[max] ? author : max;
        }, 
        Object.keys(authorCounts)[0]
    )
    logger.info(`max author: ${maxAuthor}`)
    return {
      author: maxAuthor,
      blogs: authorCounts[maxAuthor]
    }
  }

  const mostLikes = (blogs) => {
    if (blogs.length === 0){
        return ('No blogs is array')
    }
    const authorLikeCounts = blogs.reduce(
        (counts, blog) => {
            counts[blog.author] = (counts[blog.author] || 0) + blog.likes;
            return counts;
        }, 
        {}
    )
    const maxLikesAuthor = Object.keys(authorLikeCounts).reduce(
        (max, author) => {
            return authorLikeCounts[author] > authorLikeCounts[max] ? author : max;
        }, 
        Object.keys(authorLikeCounts)[0]
    )
    logger.info(`max likes author: ${maxLikesAuthor}`)
    return {
      author: maxLikesAuthor,
      likes: authorLikeCounts[maxLikesAuthor]
    }
  }
  
  module.exports = {
    dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
  }