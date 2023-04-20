console.log('Clientside javascript file is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
   messageOne.textContent = 'Loading...'
   messageTwo.textContent = ''

    if(location!=='') {
        console.log('chala')
        fetch("http://api.weatherstack.com/current?access_key=fd6e59a13e4e7f639d1fd3f1f1c8578f&query="+location).then((response)=>{
            response.json().then((data)=>{
                if(!data.error) {
                    messageTwo.textContent = data.location.name + ': ' + data.current.temperature
                } else {
                    console.log(data.error)
                    if(data.error.code=='615') {
                       messageTwo.textContent = 'Please specify a valid location!!'
                    }
                }
            })
        })    
    } else {
       messageTwo.textContent = "Please specify a valid location!!"
    } 
})