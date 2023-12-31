function backImg(){
  const date = new Date();
  hour = date.getHours()
  if(hour>=19){
    weatherbox.classList.add("weatherbox1");
  }else{
    weatherbox.classList.add("weatherbox");
  }
}

backImg();

// to add an event listener to invoke a function
inputBox.addEventListener('keypress', (evnt)=>{
  if(evnt.keyCode==13){
    search();
  }
})


// to fetch the api data
const search= async()=>{
    let cityName = inputBox.value
    if(cityName){

        const data =  await fetch(` https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4613b00e6ab741cd94be0b337706c44e&units=metric`)
       
        if(data.status==404){

          alert('Invalid City Name')
          inputBox.value=''

        }else{

          data.json().then((weatherData)=>{
            document.querySelector('.displayClass').style.display='block'
            document.querySelector('.headingClass').style.display='none'
     
            cmpName.style.display='block'
            logoImg.style.display='none'
            
           showWeatherData(weatherData)
           
          })
        }
     }
     else{
       alert('Please Enter a valid input');
     }
    }

    function showWeatherData(weatherData){

      
      const date = new Date();

     let  day = date.getDate()
     let  month = date.getMonth()+ 1
     let  year = date.getFullYear()
     let  hour = date.getHours()

       

      // to save the data in a variable
    let  city = weatherData.name
    let   country = weatherData.sys.country
    let   temperature = parseInt(weatherData.main.temp)
    let   humidity = weatherData.main.humidity
    let   cloud = weatherData.weather[0].main
    let   cloudDescription = weatherData.weather[0].description
    let   windSpeed = weatherData.wind.speed
     
      
      //to change the html data 
      cityName.innerText=city
      TodaysDate.innerHTML=`<h2 class='fw-bold'>${day}-${month}-${year}</h2>`
      Temperature.innerText=temperature
      Description.innerText=cloudDescription
      Humidity.innerText=humidity
      Country.innerText=country
      WindSpeed.innerText=windSpeed
      inputBox.value="";

      if(hour>=19){
        document.querySelector('.displayClass').style.color='white'
      }else{
        document.querySelector('.displayClass').style.color='black'
      }

      //to change the background images based on conditions

      if(cloud=="Clouds"){

       if(temperature<=10){
        image.src ='./images/snowy_1163658.png'
        weatherbox.style.backgroundImage = "url('images/snowfall.jpg')";
       }else{

        if(hour>=19 ){
          weatherbox.style.backgroundImage = "url('images/nightcloud.jpg')";
          image.src ='./images/cloudy_1146869.png'
        }else{
        image.src ='./images/cloudy_1146869.png'
        weatherbox.style.backgroundImage = "url('images/cloud.jpg')";
        }

       }

      }else if(cloud=='Clear'){
        
        if(temperature<=10){
          image.src ='./images/snowy_1163658.png'
          weatherbox.style.backgroundImage = "url('images/snowfall.jpg')";
         }else{

          if(hour>=19){
            weatherbox.style.backgroundImage = "url('images/nightclear.jpg')";
            image.src ='./images/sun_869869.png'
          }else{
            image.src ='./images/sun_869869.png'
            weatherbox.style.backgroundImage = "url('images/clear.jpg')";
          }

         }
   
      }else if(cloud=="Rain"){
        image.src ='./images/rainy.png'
        weatherbox.style.backgroundImage = "url('images/rainy.jpg')";

      }else if(cloud=="Thunderstorm"){
        image.src ='./images/storm_1163659.png'
        weatherbox.style.backgroundImage = "url('images/thunder.jpg')";

      }else if(cloud=='Snow'){
        image.src ='./images/snowy_1163659.png'
        weatherbox.style.backgroundImage = "url('images/snow.jpg')";

      }else if(cloud=='Haze'){
        image.src ='./images/cloudy_1146869.png'
        weatherbox.style.backgroundImage = "url('images/haze.jpg')";
      }


    }

    