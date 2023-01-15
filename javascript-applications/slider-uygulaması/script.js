//! Selectors
const cardImg = document.querySelector(".card-img-top");
const cardTitle = document.querySelector(".card-title");
const cardText = document.querySelector(".card-text");
const cardLink = document.querySelector(".card-link");
//button
const leftBtn = document.querySelector(".card-footer").children[0];
const rightBtn = document.querySelector(".card-footer").children[1];

//! Car information
let models = [
    {
        name: "Bmw 418d",
        image: "img/bmw.jpg",
        link: "http://www.arabalar.com.tr/bmw/1-serisi"
    },
    {
        name: "Mazda CX-3",
        image: "img/mazda.jpg",
        link: "http://www.arabalar.com.tr/mazda/mx-5/2017/1-5-motion"
    },
    {
        name: "Volvo S60",
        image: "img/volvo.jpg",
        link: "http://www.arabalar.com.tr/volvo/s90/2020/2-0-d5-inscription-plus"
    },
    {
        name: "Skoda Superb",
        image: "img/skoda.jpg",
        link: "http://www.arabalar.com.tr/skoda/superb/2022/1-5-tsi-crystal-dsg"
    },
    {
        name: "Honda Civic",
        image: "img/honda.jpg",
        link: "http://www.arabalar.com.tr/honda/civic/2022/1-5-eco-elegance-cvt"
    }
];

//slider control
let index = 0;
let sliderCount = models.length;
showSlide(index);

//! Events
leftBtn.addEventListener("click", dragLeft);
rightBtn.addEventListener("click", dragRight);


//! function

//show slider
function showSlide(i){

    //slider control 2
    index = i;
    if(index < 0){
        // index değeri 0'ın altına inerse sıranın sonundan devam et
        index = sliderCount - 1;
    }
    if(index >= sliderCount){
        // index değeri "Car information" array'ın uzunluğunu aşarsa sırası başına dön
        index = 0;
    }

    //img
    cardImg.setAttribute("src", models[index].image);
    //card title
    cardTitle.innerHTML = models[index].name;
    //card link
    cardLink.setAttribute("href",models[index].link);
}

// buttons
//left button
function dragLeft(){
    index --;
    showSlide(index);
    console.log(index);
};

//right button
function dragRight(){
    index ++;
    showSlide(index);
    console.log(index);
};
