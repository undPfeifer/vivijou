export const usePosts = async () => {
    return await $fetch('http://vivi-jorunalismus.local/wp-json/wp/v2/posts')
  }
  