// Course Constructor (sınıf, class)
function Course(title, instructor, image) {
    this.title = title;
    this.instructor = instructor;
    this.image = image;
}


document.querySelector('#new-course').addEventListener('submit',
    function (e) {

        // user datas
        const title = document.querySelector('#title').value;
        const instructor = document.querySelector('#instructor').value;
        const image = document.querySelector('#image').value;

        // create course object
        const course = new Course(title, instructor, image);

        // save to database

        // show on the iu

        // turn off refresh
        e.preventDefault();
    });