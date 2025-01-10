// 

window.addEventListener('load', () => {
  document.body.dataset.js = "ready"
  // a11y!
})

function base() {
  return {
    getBaseReady() {
      window.addEventListener('load', () => {
        document.body.dataset.alpinejs = "ready"
      })
    }
  }
}
