//! Selectors
const keys = document.querySelector(".calculator-keys");
const input = document.querySelector(".calculator-input");

// input'u sıfırlama
let displayValue = '0';
updateDisplay()
// input'u sıfırlama

// hesaplama için
let firstValue = null;
let operator = null;
let ikinciSayiyiBekliyor = false;
// hesaplama için

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
        // kullanıcıdan aldığımız operatore göre işlem yapalım
        hangiOperator(element.value);
        updateDisplay();
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
    if (ikinciSayiyiBekliyor) {
        //inputu girilen sayı ile sıfırliyoruz (girilen sayı input'daki sayının yerini alıyor)
        displayValue = number;
        // ardından girdiğimiz sayı tekrar bu koşula girmemesi için "false" döndürüyoruz (ilk 5 sonra 3 = 53 gibi)
        ikinciSayiyiBekliyor = false;
    }
    else {
        // input'un içi 0'ise bunu girilen değer ile değiştir
        // değil ise girilen sayı veya sayıları yanına ekle
        displayValue = displayValue === '0' ? number : displayValue + number;
    }
    //kontrol
    console.log("displayValue: " + displayValue, " firstValue: " + firstValue, " operator: " + operator, " ikinciSayiyiBekliyor: " + ikinciSayiyiBekliyor);
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
    firstValue = null;
    ikinciSayiyiBekliyor = false;
    operator = null;
}

// kullanıcıdan aldığımız operatore göre işlem yapalım
function hangiOperator(girilenOperator) {
    // input'un içindeki değer string olduğu için number'a çeviriyoruz
    // float değer olabilirs
    const value = parseFloat(displayValue);

    // firstValue eğer null ise
    if (firstValue == null) {
        firstValue = value;
    }
    else if (operator) { // firstValue null olmadığı için (içinde ilk girilen değer var) buraya girecek
        // operator ile işlem yapalım (eşittir)
        const result = calculate(firstValue, value, operator);

        displayValue = String(result);
        // çıkan sonucu tekrar firstValue'nun içine yedekliyoruz ki işlem yapmaya devam edebilelim
        firstValue = result;
    }
    ikinciSayiyiBekliyor = true;
    operator = girilenOperator;

    //kontrol
    console.log("displayValue: " + displayValue, " firstValue: " + firstValue, " operator: " + operator, " ikinciSayiyiBekliyor: " + ikinciSayiyiBekliyor);
}

//operator'e göre işlem yapalım
function calculate(first, value, operator) {
    if (operator === '+') {
        return first + value;
    }
    else if (operator === '-') {
        return first - value;
    }
    else if (operator === '*') {
        return first * value;
    }
    else if (operator === '/') {
        return first / value;
    }
    // eşittir'e tıkladığımızda boş geri dönmemesi için (undefined) son girilen değeri input'da tutuyoruz.
    return value;
}