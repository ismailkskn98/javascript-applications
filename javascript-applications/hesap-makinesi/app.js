const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

// input'un başlanıç value
let displayValue = '0';
updateDisplay();

//! Events
keys.addEventListener("click", controlButtons);

//! Function

// input'un başlanıç value
function updateDisplay() {
    display.value = displayValue;
}

// calculator-keys kapsayıcının içine click yapıldığında sadece buttonlara tepki vermek için
// "matches" isminde ki özelliği kullanıyoruz ulaşmış olduğumuz element'in "button" olup olmadığını kontrol ediyoruz
// ve buttonun value'sunu , class'ını kontrol ediyoruz
function controlButtons(e) {
    const element = e.target;
    // tıkladığımız element button değilse return dediğimiz için bundan sonra ki kodlarımız çalışmıcak
    if (!(element.matches('button'))) return;
    // element operator buttonu mu
    if (element.classList.contains('operator')) {
        console.log('operator', element.value);
        return;
    }
    // element decimal (nokta) buttonu mu
    if (element.classList.contains('decimal')) {
        // console.log('Decimal', element.value);
        //nokta yoksa ekle varsa ekleme
        inputDecimal();
        // her seferinde update edilmesi gerekiyor
        updateDisplay();
        return;
    }
    // element clear buttonu mu
    if (element.classList.contains('clear')) {
        // console.log('Clear', element.value);
        // input'u temizleme
        inputClear();
        // her seferinde update edilmesi gerekiyor
        updateDisplay();
        return;
    }

    // kullanıcının tıklamış olduğu number'ı input alanına çekiyoruz
    inputNumber(element.value);
    // her seferinde update edilmesi gerekiyor
    updateDisplay();
}

// kullanıcının tıklamış olduğu number'ı input alanına çekiyoruz
function inputNumber(value) {
    // input'un içindeki değer '0' ise value direkt onun yerini alsın
    // input'un içinde önceden sayı yazıldıysa yanına eklensin
    displayValue = displayValue === '0' ? value : displayValue + value;
}

//nokta yoksa ekle varsa ekleme
function inputDecimal() {
    if(!displayValue.includes('.')){
        displayValue += '.';
    }
}

// input'u temizleme
function inputClear() {
    displayValue = '0';
};