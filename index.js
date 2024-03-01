const input = document.querySelector('input')

input.addEventListener('focus', () => {
    exept.style.opacity = '1'; // Change l'opacité à 1 lorsque l'input est en focus
});

input.addEventListener('blur', () => {
    exept.style.opacity = '0'; // Change l'opacité à 0 lorsque l'input perd le focus
});

document.querySelector('.vitesse').textContent = 'ok'


if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat+ '&lon=' + lon + '&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric'
        axioss(url)

    }, error => {
        alert('You denied Geolocation. Please enter your geolocation')
    })      
}


let button = document.getElementById('glass')
let inputt = document.querySelector('.input-ville')
let temp = document.querySelector('.temp')
let city = document.querySelector('.city')
let humidity = document.getElementById('humidity')
let speed = document.getElementById('speed')
let image = document.getElementById('img')


button.addEventListener('click', () => {
    let valeur = inputt.value
    
    recupTemp(valeur)
    
})

function recupTemp (ville) {
    const url= 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric';
   axioss(url)
}


function axioss (info) {

    axios.get(info)
    .then((response) => {
        document.querySelector('.container').style.height = '570px'
        temp.innerHTML = `<span>${Math.floor(response.data.main.temp)}</span>°C`
        city.innerHTML = `<span>${response.data.name}</span>`
        humidity.textContent = response.data.main.humidity
        speed.textContent = response.data.wind.speed
        console.log(response.data.weather[0].main);
    
        switch (response.data.weather[0].main) {
            case 'Clear':
                image.src = './img/clear.png'
                break;
    
                case 'Clouds':
                image.src = './img/clouds.png' 
                break;
    
                case 'Drizzle' :
                image.src = './img/drizzle.png'
                break;
    
                case 'Mist' :
                image.src = './img/mist.png'
                break;
                
                case 'Rain' : 
                image.src = './img/rain.png'
                break;
    
                case 'Snow' :
                image.src = './img/snow.png'
                break;
    
    
        }
        
    })
    .catch(error => {
        alert('donnée introuvable')
    })
}