// Course Constructor (sınıf, class)
function Course(title, instructor, image) {
    this.title = title;
    this.instructor = instructor;
    this.image = image;
}

// Uİ Constructor (sınıf, class)
function UI() {

}

UI.prototype.addCourseToList = function (course) {
    const list = document.querySelector('#course-list');

    let html = `

        <tr>
            <td> <img src ="./img/${course.image}"/></td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td> <a href = "#" class = "btn btn-danger btn-sm delete">Delete</a> </td>
        </tr>

    `;

    list.innerHTML += html;
}

UI.prototype.clearControls = function () {
    // user datas
    const title = document.querySelector('#title').value = '';
    const instructor = document.querySelector('#instructor').value = '';
    const image = document.querySelector('#image').value = '';
}

// delete button function
UI.prototype.deleteCourse = function (element) {
    if (element.classList.contains('delete')) {
        element.parentElement.parentElement.remove();
    }
}

document.querySelector('#new-course').addEventListener('submit',
    function (e) {

        // user datas
        const title = document.querySelector('#title').value;
        const instructor = document.querySelector('#instructor').value;
        const image = document.querySelector('#image').value;

        // create course object
        const course = new Course(title, instructor, image);

        // create ui object
        const ui = new UI();

        // add course to list
        ui.addCourseToList(course);

        // clear controls
        ui.clearControls();

        // turn off refresh
        e.preventDefault();
    });

// delete button click event 
document.querySelector('#course-list').addEventListener('click', function (e) {
    const ui = new UI();
    ui.deleteCourse(e.target);
});