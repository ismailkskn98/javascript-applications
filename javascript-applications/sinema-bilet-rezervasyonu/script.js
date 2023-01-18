//! Selectors
const container = document.querySelector(".container");
const count = document.querySelector("#count");
const select = document.querySelector("#movie");
const amount = document.querySelector("#amount");

//! Events
// koltukları seçme
container.addEventListener("click", seatSelected);
// filme göre fiyat güncelleme
select.addEventListener("change", function(){
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
function calculateTotal(){
    // seçilen koltuk sayısı
    let selectedSeatCount = container.querySelectorAll(".seat.selected").length;
    // seçilen koltukları ekrana yazdırma
    count.innerHTML = selectedSeatCount;
    // ücret hesaplaması
    let price = select.value * selectedSeatCount;
    amount.innerText = price;
}