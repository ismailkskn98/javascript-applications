//! Selectors
const keys = document.querySelector(".calculator-keys");
const input = document.querySelector(".calculator-input");

// input'u sıfırlama
let displayValue = '0';
updateDisplay()
// input'u sıfırlama

//! Events
keys.addEventListener("click", elementValues);

//! Function
// input'u sıfırlama
function updateDisplay() {
    input.value = displayValue;
}

// hangi buttona basıyoruz o değeri çekip üzerinde işlem yapıcağız
function elementValues(e) {
    element = e.target;
    //element'i button olanları seçicez
    // matches : ulaşmış olduğumuz element'in button olup olmadığını veya neyi arıyosak olup olmadığını kontrol eder
    if (!(element.matches('button'))) return;
    //  ulaşmış olduğumuz element button ise aşağıdaki kodları çalıştır
    // button'un class'ı operator olanlar
    if (element.classList.contains('operator')) {
        console.log(element);
        return;
    }
    // button'un class'ı decimal olan
    else if (element.classList.contains('decimal')) {
        // decimal'e tıkladığımızda sayının sonuna nokta ekleyeceğiz
        decimal();
        // değişen displayValue değişkenini tekrar çağırmamız gerekiyor güncellenmesi için
        updateDisplay();
        return;
    }
    // button'un class'ı clear olan
    else if (element.classList.contains('clear')) {
        // input alanını temizleyelim
        inputClear();
        // değişen displayValue değişkenini tekrar çağırmamız gerekiyor güncellenmesi için
        updateDisplay();
        return;
    }
    // yukardakiler değilse tıklanmış olan button number'dır
    // console.log(element.value);

    // girdiğimiz number değeri input alanında göstermek
    inputNumber(element.value);
    // değişen displayValue değişkenini tekrar çağırmamız gerekiyor güncellenmesi için
    updateDisplay();
}

// girdiğimiz number değeri input alanında göstermek
function inputNumber(number) {
    // input'un içi 0'ise bunu girilen değer ile değiştir
    // değil ise girilen sayı veya sayıları yanına ekle
    displayValue = displayValue === '0' ? number : displayValue + number;
}

// decimal'e tıkladığımızda sayının sonuna nokta ekleyeceğiz
function decimal() {
    // önceden nokta kullanılmış mı kontrol edelim
    // includes metodu var olup olmadığını kontrol eder (false, true döndürür)
    if (!(displayValue.includes('.'))) {
        displayValue += '.';
    }
}

// input alanını temizleyelim
function inputClear() {
    displayValue = '0';
}