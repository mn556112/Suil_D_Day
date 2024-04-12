//세팅 on/off
var SettingButton = document.getElementById("SettingButton");
var SettingMenu = document.getElementById("SettingMenu");
var MainPage = document.getElementById("MainPage");
if (SettingButton) {
    SettingButton.addEventListener("click", function () {
        console.log("Ddd");
        SettingMenu.classList.toggle('show');
        SettingButton.classList.toggle("Pressed");
        MainPage.classList.toggle("Hide");
    });
}




//2D Bastard

var BobIco = document.getElementById("BobIco");
var TwoD = document.getElementById("2D");
var Count = 0;
if (BobIco) {
    BobIco.addEventListener("click", function () {
        Count += 1;
        if (Count >= 5) {
            Count = 0;
            TwoD.classList.toggle('show');
            setTimeout(function () {
                TwoD.classList.toggle('show');
            }, 3170);
        }
    });
}

var TimerButton = document.getElementById("TimerButton");
if (TimerButton) {
    TimerButton.addEventListener("click", function () {
        location.replace('Timer.html');
    });
}

var EsButton2 = document.getElementById("EsButton2");
var Img = document.getElementById("4D");
var Count2 = 0;
if (EsButton2) {
    EsButton2.addEventListener("click", function () {
        Count2 += 1;
        if (Count2 >= 5) {
            Count2 = 0;
            Img.classList.toggle('show');
            setTimeout(function () {
                Img.classList.toggle('show');
            }, 3170);
        }
    });
}




//카운터

var MoiTime = "2024-05-21";
var TestTime = "2024-04-21";

function calcDate(IsDetail, Type, idk) {

    if (idk === "GetCurrentTime") {
        const now = new Date(); // 현재 날짜 및 시간
        const hour = now.getHours().toString().padStart(2, '0'); // 시간을 가져오고 2의 자리수로 만들어주며, 1의 자리수면 앞에 0을 추가
        const minutes = now.getMinutes().toString().padStart(2, '0'); // 분을 가져오고 2의 자리수로 만들어주며, 1의 자리수면 앞에 0을 추가
        return `${hour}:${minutes}`;
    }

    else {
        let goalDate;
        // Type에 따라 goalDate 설정
        if (Type === "Test") {
            goalDate = new Date(TestTime).getTime();
        } else if (Type === "Moi") {
            goalDate = new Date(MoiTime).getTime(); // Moi의 경우 다른 날짜로 설정
        } else {
            throw new Error("Invalid Type");
        }

        const now = new Date().getTime();
        const distance = goalDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (distance > -86400000 && distance < 0) {
            if (IsDetail == true) {
                return `😭😭😭`;

            } else {
                return 'D-DAY';;
            }
        }


        if (distance < 0) {
            if (IsDetail == true) {
                return ``;

            } else {
                return '(지나감)';;
            }
        } else {
            if (IsDetail == true) {
                return `${hours}시간 ${minutes}분 ${seconds}초 남음..`;

            } else {
                return `${days}일`;
            }
        }
    }
}


setInterval(() => {
    document.getElementById('Test_Detail_Count').innerText = calcDate(true, "Test", "");
    document.getElementById('Test_Count').innerText = calcDate(false, "Test", "");
    document.getElementById('Test_Detail_Count_Moi').innerText = calcDate(true, "Moi", ""); // Type을 "Moi"로 설정
    document.getElementById('Test_Count_Moi').innerText = calcDate(false, "Moi", ""); // Type을 "Moi"로 설정
    document.getElementById('CurrentTime').innerText = calcDate(false, "", "GetCurrentTime");

}, 1000);

//밥
function isScrollActive(element) {
    return element.scrollHeight > element.clientHeight;
}


function adjustTextSizeToAvoidOverflow(element) 
{
    let sz = 48
    while (isScrollActive(element) == true)
    {
        sz = sz - 0.1;
        element.style.fontSize = sz+"px";
    }
}


var 시도교육청코드 = "J10";
var 행정표준코드 = "7530524";
function GetBoBData() {
    const 현재날짜 = getCurrentDate();
    console.log(시도교육청코드, 행정표준코드);
    const url = `https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=${시도교육청코드}&SD_SCHUL_CODE=${행정표준코드}&MLSV_YMD=${현재날짜}&KEY=${BoB_API_KEY}&Type=json`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.mealServiceDietInfo && data.mealServiceDietInfo[1] && data.mealServiceDietInfo[1].row && data.mealServiceDietInfo[1].row[0]) {
                const mealData = data.mealServiceDietInfo[1].row[0];

                const ScN = document.getElementById("SchoolName");
                ScN.innerText = mealData.SCHUL_NM;

                const BobList = document.getElementById("BobList");
                BobList.innerHTML = removeNumbersInParentheses(mealData.DDISH_NM); // trim() 함수를 사용하여 앞뒤 공백 제거
                const Calo = document.getElementById("Cal");
                Calo.innerText = "총 칼로리 : " + mealData.CAL_INFO;
                const Bugeer = document.getElementById("buger");
                Bugeer.innerText = "햄버거 약 " + BurgerCal(mealData.CAL_INFO) + "개의 칼로리";

                //Text Scalling
                if (isScrollActive(BobList)) {
                    adjustTextSizeToAvoidOverflow(BobList);
                    console.log('actived');
                } else {
                    console.log('disabled');
                }
            } else {
                const ScN = document.getElementById("SchoolName");
                BobList.innerHTML = "오류)시도교육청,행정표준 코드 확인 필요";
                ScN.innerText = "알수없음!";
                console.error('식사 데이터 없');
            }
        })
        .catch(error => {
            console.error('오류남:', error);
        });
}

//날자 설정
function getinput() {
    //시간 조정
    MoiTime = document.getElementById('MoitestDdayinput').value;
    TestTime = document.getElementById('testDdayinput').value;

    //급식 학교 id
    시도교육청코드 = document.getElementById('시도교육청코드').value;
    행정표준코드 = document.getElementById('행정표준코드').value;

    //localstorage
    window.localStorage.setItem("Moi", MoiTime);
    window.localStorage.setItem("Test", TestTime);
    window.localStorage.setItem("시도교육청코드", 시도교육청코드);
    window.localStorage.setItem("행정표준코드", 행정표준코드);
    GetBoBData(); //급식정보 새로고침
}


var ApplyButton = document.getElementById("ApplyButton");

if (ApplyButton) {
    ApplyButton.addEventListener("click", function () {
        console.log("Dddss");
        getinput();
    });
}

//날씨 온도
const API_KEY = ("7612e245f1d719a6ab7411868e6cc29f");
function GetWeatherData(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const lang = "kr"
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&lang=${lang}&units=metric`
    fetch(url).then(response => response.json())
        .then(data => {
            const temp = document.getElementById("Tem");
            const weather = document.getElementById("Weather");
            temp.innerText = "온도 : " + data.main.temp + "°C";
            const WeatherInfo = data.weather[0].description;
            weather.innerText = "날씨 : " + WeatherInfo;
        });
}

function onGeoOk(position) {
    GetWeatherData(position)

    setInterval(() => {
        GetWeatherData(position)
    }, 30000); //30초마다 새로고침
}


function onGeoErr() {
    //alert("위치권한 내놔")

    //함수로 만들기 귀찮

    const lang = "kr"
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=37&lon=127&appid=${API_KEY}&lang=${lang}&units=metric`
    fetch(url).then(response => response.json())
        .then(data => {
            const temp = document.getElementById("Tem");
            const weather = document.getElementById("Weather");
            temp.innerText = "온도 : " + data.main.temp + "°C";
            const WeatherInfo = data.weather[0].description;
            weather.innerText = "날씨 : " + WeatherInfo;
        });

}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoErr);


//localstorage 가져오기
if (window.localStorage.getItem('Moi') != null && window.localStorage.getItem('행정표준코드') != null) {
    MoiTime = window.localStorage.getItem('Moi');
    TestTime = window.localStorage.getItem('Test');

    행정표준코드 = window.localStorage.getItem('행정표준코드');
    시도교육청코드 = window.localStorage.getItem('시도교육청코드');

    document.getElementById('MoitestDdayinput').value = MoiTime;
    document.getElementById('testDdayinput').value = TestTime;
    document.getElementById('행정표준코드').value = 행정표준코드;
    document.getElementById('시도교육청코드').value = 시도교육청코드;

}

function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해준 후, 두 자리로 만들기 위해 padStart() 함수를 사용합니다.
    const day = String(today.getDate()).padStart(2, '0'); // 일도 두 자리로 만들기 위해 padStart() 함수를 사용합니다.

    return `${year}${month}${day}`;
}


//급식
const BoB_API_KEY = ("1d5ad5a9b1a34a12bd277961f25258e4");
function BurgerCal(caloriesString) {
    // 문자열에서 " kcal"을 제거하고 숫자 부분만 추출하여 숫자로 변환
    const calories = parseFloat(caloriesString.replace(" Kcal", ""));
    const dividedValue = calories / 294.9; // 칼로리 값을 294.9로 나눔
    const roundedValue = Math.round(dividedValue); // 반올림

    return roundedValue;
}

// 괄호 안의 숫자를 제거하는 함수
function removeNumbersInParentheses(str) {
    let cleanedStr = str;
    let match;
    const regex = /\(\d+(\.\d+)*\)/g; // 괄호 안에 있는 모든 숫자 패턴을 찾기 위한 정규표현식

    // 정규표현식에 맞는 모든 괄호를 찾아서 숫자를 제거
    while ((match = regex.exec(str)) !== null) {
        const numbersInParentheses = match[0]; // 괄호 안에 있는 숫자
        cleanedStr = cleanedStr.replace(numbersInParentheses, ''); // 괄호 안의 숫자를 제거
    }

    return cleanedStr;
}



GetBoBData();
setInterval(() => {
    GetBoBData();
}, 3600000);

