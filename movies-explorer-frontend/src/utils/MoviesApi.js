  function checkResult(res) {
  
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.status)
  }

export const getContent = () => {

  return fetch('https://api.nomoreparties.co/beatfilm-movies').then((res) => checkResult(res))
}