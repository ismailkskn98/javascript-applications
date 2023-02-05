// Course Class
class Course {
    constructor(title, instructor, image) {
        this.courseId = Math.floor(Math.random() * 1000);
        this.title = title;
        this.instructor = instructor;
        this.image = image;
    };

}

// UI Class
class UI {
    // Adding the value entered by the user to the table
    addCourseToList(course) {
        const list = document.querySelector('#course-list');

        let html = `
            <tr>
                <td> <img src ="./img/${course.image}"/></td>
                <td>${course.title}</td>
                <td>${course.instructor}</td>
                <td> <a href = "#" data-id = ${course.courseId} class = "btn btn-danger btn-sm delete">Delete</a> </td>
            </tr>
        `;
        list.innerHTML += html;
    };

    // form input value clear
    clearControls() {
        //user datas
        const title = document.querySelector('#title').value = '';
        const instructor = document.querySelector('#instructor').value = '';
        const image = document.querySelector('#image').value = '';
    };

    // delete button
    deleteCourse(element) {
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
            return true;
        }
    };

    // form alert
    showAlert(message, alertType) {
        let alert = document.createElement('div');
        alert.className = `alert alert-${alertType}`;
        alert.role = 'alert';
        alert.innerHTML = message;
        const row = document.querySelector('.row');
        // insertBefore(yeni, hedef) =  methodu, bir düğümü çocuk olarak, belirttiğiniz mevcut bir çocuğun hemen önüne ekler.
        // insertAdjacentElement(position, element) =Method, belirli bir konuma, belirtilen elemanı ekler
        row.insertAdjacentElement('beforebegin', alert);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2500)
    }
};

// Local Storage
class Storage {
    // Static metotlar ES6 ile gelen özelliklerden biridir. Normalde bir class içindeki metot ya da özelliklere ulaşmak istiyorsak new classAdı() şeklinde yeni bir sınıf örneği oluşturup bu sınıf örneği üzerinden istediğimiz özelliklere ulaşabiliyoruz. Static metotlar bize new anahtar kelimesini kullanmadan sınıfAdı.ozellik şeklinde objesiz ulaşabilme imkanı sağlar.
    // Bazı metotları herhangi bir obje oluşturmadan sadece isim ile ulaşılsın isteyebiliriz örneğin Math.pow() fonksiyonu Math sınıfı içinde yazılmış static bir metottur ama biz pow fonksiyonunu new Math() şeklinde bir obje oluşturup kullanmıyoruz, bu gibi durumlarda yapmamız gereken şey fonksiyonun başına static kelimesini yazmaktır.

    // storage'den gelen veriler
    static getCourses() {
        let courses;

        // Controls
        if (localStorage.getItem('courses') == null) {
            courses = [];
        } else {
            courses = JSON.parse(localStorage.getItem('courses'));
        }

        return courses;
    }

    // getCourses'dan aldığı bilgiler ekranda göstericek
    static displayCourses() {
        // storage'den gelen veriler
        const courses = Storage.getCourses();
        // ui adında nesne oluşturalım
        const ui = new UI();
        for (let course of courses) {
            // local storage'den gelen courses bilgilerini ekranda gösterme
            ui.addCourseToList(course);
        }
    }

    // dişarıdan aldığı course bilgilerini local storage'e ekleme
    static addCourse(course) {
        // storage'den gelen veriler
        const courses = Storage.getCourses();
        // dişarıdan gelen course bilgisini courses array'ine aktarma
        courses.push(course);
        // local storage'e gönderme
        localStorage.setItem('courses', JSON.stringify(courses));
    }

    // bulduğu kursu local storage'den silsin
    static deleteCourse(element) {
        // delete button
        if (element.classList.contains('delete')) {
            // delete button data-id
            const elementDataId = element.getAttribute('data-id');
            // storage'den gelen veriler
            const courses = Storage.getCourses();

            courses.forEach((course, index) => {
                if (course.courseId == elementDataId) {
                    courses.splice(index, 1);
                }
            });

            // buna bak bi
            // for (let course in courses) {
            //     if (course.courseId == elementDataId) {
            //         courses.splice(course, 1);
            //     }
            // }
            localStorage.setItem('courses', JSON.stringify(courses));
        }
    }

}

// Sayfa Yüklendiğinde (Local Storage)
document.addEventListener('DOMContentLoaded', Storage.displayCourses);

// Form Submit
document.querySelector('#new-course').addEventListener('submit',
    function (e) {

        // user datas
        const title = document.querySelector('#title').value;
        const instructor = document.querySelector('#instructor').value;
        const image = document.querySelector('#image').value;

        // create course object
        const course = new Course(title, instructor, image);
        console.log(course);

        // create ui object
        const ui = new UI();

        if (title === '' || instructor === '' || image === '') {

            ui.showAlert('Please complete the form', 'warning');

        } else {

            // add course to list
            ui.addCourseToList(course);

            // save to local storage
            Storage.addCourse(course);

            // clear controls
            ui.clearControls();

            ui.showAlert('The course has been added', 'success');
        }

        // turn off refresh
        e.preventDefault();
    });

// delete button click event 
document.querySelector('#course-list').addEventListener('click', function (e) {
    const ui = new UI();
    // delete course
    if (ui.deleteCourse(e.target) == true) {
        // delete from local storage
        Storage.deleteCourse(e.target);
        // alert
        ui.showAlert('The course has been deleted', 'danger');
    }
});