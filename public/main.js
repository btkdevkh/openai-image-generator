const form = document.querySelector('[data-image-generator-form]')
const loading = document.querySelector('[data-loading]')

form.addEventListener('submit', async e => {
  e.preventDefault()
  
  const prompt = form.prompt.value
  const size = form.size.value
  
  if(!prompt || !size) {
    document.querySelector('[data-error]').textContent = 'Please fill all fields'
    return
  }
  
  document.querySelector('[data-error]').textContent = ''
  loading.classList.add('isloading')
  const API_URL = '/openai/generateimage'
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ prompt, size })
  })

  if(!res.ok) {
    loading.classList.remove('isloading')
    document.querySelector('[data-image]').src = ''
    document.querySelector('[data-error]').textContent = 'Could not generate image'
    return
  }
  
  loading.classList.remove('isloading')
  const data = await res.json()
  document.querySelector('[data-image]').src = data.data
})
