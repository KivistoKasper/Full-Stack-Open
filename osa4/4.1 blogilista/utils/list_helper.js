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

    const tt = {
        title: blogOfMostLikes.title,
        author: blogOfMostLikes.author,
        likes: blogOfMostLikes.likes
    }
    return tt
}
  
  module.exports = {
    dummy, totalLikes, favouriteBlog
  }