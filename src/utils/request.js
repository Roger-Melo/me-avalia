const request = ({ url, onSuccess, onFinally }) => {
  fetch(url)
    .then(r => r.json())
    .then(onSuccess)
    .catch(error => alert(error.message))
    .finally(onFinally)
}

export { request }