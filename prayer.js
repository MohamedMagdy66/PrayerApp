
//============catch our vars====================

let countryBox = document.querySelector(".country-Box");
let citiesBox = document.querySelector(".cities-Box");
let place = document.querySelector(".place");
let date = document.querySelector(".date");
let cards = document.querySelector(".cards");

//===create list of objects contains the countries===
let countries = [
    {
        arabicName :"السعودية",
        englishName : "KSA",
    },
    {
        arabicName :"مصر",
        englishName : "Egypt",
    },

]

//===create list of objects contains the cities===

let Ksacities = [
    {
        arabicName :"مكة المكرمة",
        englishName : "Makkah",
    },
    {
        arabicName :"الدمام",
        englishName : "Dammam",
    },
    {
        arabicName :"عين الدار",
        englishName : "Ain Dar",
    },
    {
        arabicName :"شقراء",
        englishName : "Shaqra",
    },
    {
        arabicName :"الدوادمي",
        englishName : "Dawadmi",
    },
    {
        arabicName :"الطائف",
        englishName : "Taif",
    },
    {
        arabicName :"تبوك",
        englishName : "Tabuk",
    },
    {
        arabicName :"خيبر",
        englishName : "Khaybar",
    },
    
]
let EgyCities = [
    {
        arabicName :"القاهرة",
        englishName : "Cairo",
    },
    {
        arabicName :"الاسكندرية",
        englishName : "Alexandria",
    },
    {
        arabicName :"الدقهلية",
        englishName : "Daqahlīyah",
    },
    {
        arabicName :"البحر الاحمر",
        englishName : "Al Bahr al Ahmar",
    },  
    {
        arabicName :"الجيزة",
        englishName : "Giza",
    },
    {
        arabicName :"جنوب سناء",
        englishName : "South Sinai",
    },
    
    
]

//add the countries object in the countryBox

for(let country in countries){
    countryBox . innerHTML += `
    <option>${countries[country].englishName}</option>
    `
}

// add the cities of the specific chosen country

    countryBox.addEventListener("change",function(){
        if(countryBox.value == "KSA"){
            citiesBox.innerHTML = `<option>Ksa Cities</option>`;
            for(let city in Ksacities){
                citiesBox . innerHTML += `
                <option>${Ksacities[city].englishName}</option>
                `
                console.log("test2")
            }
        }else if (countryBox.value == "Egypt"){
            citiesBox.innerHTML = `<option>Egypt Cities</option>`;
            for(let city in EgyCities){
                citiesBox . innerHTML += `
                <option>${EgyCities[city].englishName}</option>
                `}
        }
    })

// add event lestner to take the method parameters (Country , City)

    countryBox.addEventListener("change",function(){
        if(countryBox.value == "KSA"){
            citiesBox.addEventListener("change",function(){
    
                let cityname = "" ;
                let CountryName = "";
                for(let city of Ksacities){
                    if(city.englishName == this.value){
                        cityname = city.englishName;
                        if(cityname == "KSA"){
                            CountryName = "SA";
                        }
                    }
            
                }
                place.innerHTML = cityname;
                getprayerTimes(CountryName,cityname)
                
            
            })
        }else if (countryBox.value == "Egypt"){
            citiesBox.addEventListener("change",function(){
    
                let cityname = "" ;
                let CountryName = "";
                for(let city of EgyCities){
                    if(city.englishName == this.value){
                        cityname = city.englishName;
                        if(cityname == "Cairo"){
                            place.innerHTML = cityname;
                            cityname = "Ca";
                        }else if(cityname == "Alexandria"){
                            place.innerHTML = cityname;
                            cityname = "Alex";
                        }else if(cityname == "Daqahliyah"){
                            place.innerHTML = cityname;
                            cityname = "DK";
                        }else if(cityname == "Al Bahr al Ahmar"){
                            place.innerHTML = cityname;
                            cityname = "BA";
                        }else if(cityname == "Giza"){
                            place.innerHTML = cityname;
                            cityname = "Gz";
                        }
                        else if(cityname == "South Sinai"){
                            place.innerHTML = cityname;
                            cityname = "JS";
                        }
                        CountryName = "EG";
                        
                    }
            
                }
    
                
                getprayerTimes(CountryName,cityname)
                
            
            })
        }
    
    })


// fetching the API in the getprayerTimes function

function getprayerTimes(CountryName,cityName){
    let params = {
        country:CountryName,
        city:cityName
    }
    axios.get('http://api.aladhan.com/v1/timingsByCity', {
        params: params
    })
    .then(function (response) {
        const timings = response.data.data.timings;
        const readableDate = response.data.data.date.readable;
        const weakDay = response.data.data.date.hijri.weekday.ar;
        date.innerHTML =readableDate + " " + weakDay;
        filltime("Fajir-Time",timings.Fajr);
        filltime("SunRise-Time",timings.Sunrise);
        filltime("Duhr-Time",timings.Dhuhr);
        filltime("Asr-Time",timings.Asr);
        filltime("Maghrib-Time",timings.Maghrib);
        filltime("Ishaa-Time",timings.Isha);
        console.log(response.data);
        console.log(readableDate + " " + weakDay);
        })
    .catch(function (error) {
        console.log(error);
        })
    .finally(function () {
        // always executed
    }); 
}

// filling the prayers time

function filltime(id,timings){
    document.getElementById(id).innerHTML = timings ;
}