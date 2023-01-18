//! Selectors
// container
const container = document.querySelector(".container");
// select (filmler)
const select = document.querySelector("#movie");
// seçilen film adet kısmı (span)
const count = document.querySelector("#count");
// toplam fiyat kısmı (span)
const amount = document.querySelector("#amount");
// koltukların hepsini seçme (reserved class'ına sahip olanlar hariç)
const seats = document.querySelectorAll(".seat:not(.reserved)");
// seçilen koltuklar
let selectedSeats;

// local strage'den verileri çekme
getLocalStorage();
// toplam fiyatlama
calculateTotal();

//! Events

// koltukları seçme
container.addEventListener("click", seatSelected);
// filme göre fiyat güncelleme
select.addEventListener("change", function () {
    // select her değiştiğinde "calculateTotal" methodu tekrar çalışıyor
    calculateTotal();
});

//! Function

// koltuk seçme
function seatSelected(e) {
    if (e.target.classList.contains("seat")) {
        // tıklanan kotluklar
        let seat = e.target;
        if (!(seat.classList.contains("reserved"))) {
            // reserve class'ı olmayan koltuklar
            seat.classList.toggle("selected");
            // toplam fiyat hesaplama
            calculateTotal();
        }
    }

}

// toplam fiyatı hesaplama
function calculateTotal() {
    // seçilen koltuklar
    selectedSeats = container.querySelectorAll(".seat.selected");
    // seçilen ve seçilmeyen koltukları array haline getirme
    seatsArray();
    // seçilen koltuk sayısı
    let selectedSeatCount = selectedSeats.length;
    // seçilen koltukları ekrana yazdırma
    count.innerHTML = selectedSeatCount;
    // ücret hesaplaması
    let price = select.value * selectedSeatCount;
    amount.innerText = price;

}

// seçilen ve seçilmeyen koltukları array haline getirme
function seatsArray() {
    // seçilen koltuklar için önce boş dizi
    selectedSeatsArr = [];
    // boş koltuklar için önce boş dizi
    seatsArr = [];
    // seçilen koltukların üzerinde dolaş her birini seat'ın içine koy
    // "selectedSeatsArr" in içine push et
    for (let seat of selectedSeats) {
        selectedSeatsArr.push(seat);
    }
    // "seats" nodeList'in üzerinde dolaş her birini seat'ın içine koy
    //"seatsArr'"in içine push et
    for (let seat of seats) {
        seatsArr.push(seat);
    }
    // seçilen koltukların index numaralarını bulma
    // bulunan index numaraları array halinde geri döner
    let selectSeatIndexs = selectedSeatsArr.map(function (seat) {
        return seatsArr.indexOf(seat);
    });

    //local storage'e ekleme
    setLocalStorage(selectSeatIndexs);
}

//! Local Storage

// oluşturduğumuz array'leri local storage'e gönderme
function setLocalStorage(indexs) {
    // local storage'e seçilen koltukların index'lerini array halinde ekleme
    localStorage.setItem("selectedSeats", JSON.stringify(indexs));
    // seçili olan select (film) dinamik olarak eklenmekte
    localStorage.setItem("selectedMovieIndex", select.selectedIndex);
}

//local storage'den verileri çekme
function getLocalStorage() {
    let selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    if(!(selectedSeats == null) && selectedSeats.length > 0){
        seats.forEach(function(seat, index){
            if(selectedSeats.indexOf(index) >= 0){
                seat.classList.add("selected");
            }
        });
    }
    let selectedMovie = localStorage.getItem("selectedMovieIndex");  
    if(!(selectedMovie == null)){
        select.selectedIndex = selectedMovie;
    }
}