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
  
  module.exports = {
    dummy, totalLikes
  }