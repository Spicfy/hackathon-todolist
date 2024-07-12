const monthYearElement = document.getElementById('monthYear');
const datesElement = document.getElementById('dates');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const newToDoForm = document.getElementById('new-to-do-form');
const formDateElement = document.getElementById('formDate');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('taskInput');



let currentDate = new Date();

document.addEventListener('DOMContentLoaded', loadStoredData);

function openForm(dateTime){

        const date = new Date(parseInt(dateTime));
        formDateElement.textContent = `Tasks for ${date.toDateString()}`;
        newToDoForm.style.display = 'flex'; 
        loadTasksForSeledctedDate();
    


}

const updateCalender = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const firstDay = new Date(currentYear, currentMonth, 0);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDay.getDate();
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();

    const monthYearString = currentDate.toLocaleString
    ('default', { month: 'long', year: 'numeric' });
    monthYearElement.textContent = monthYearString;

    let dateHTML = '';

    for(let i = firstDayIndex; i > 0; i--){
        const prevDate = new Date(currentYear, currentMonth, 0 - i + 1);
        dateHTML += `<div class="date inactive'>${prevDate.getDate()}</div>`;
    }
    for(let i = 1; i <= totalDays; i ++){
        const date = new Date(currentYear, currentMonth, i);
        const activeClass = date.toDateString() === new Date().toDateString()? 'active' : '';
        const availableClass = (date.getFullYear() > new Date().getFullYear() ||
        (date.getFullYear() === new Date().getFullYear() && date.getMonth() > new Date().getMonth()) ||
        (date.getFullYear() === new Date().getFullYear() && date.getMonth() === new Date().getMonth() && date.getDate() > new Date().getDate())) ? 
        'available' : '';

        dateHTML += `<div class="date ${activeClass} ${availableClass}" data-date ="${date.getTime()}">${i}</div>`;
    }
    for(let i = 1; i<= (7 - lastDayIndex) %7; i++){
        const nextDate = new Date(currentYear, currentMonth + 1, i);
        dateHTML += `<div class="date inactive">${nextDate.getDate()}</div>`;
    }
    datesElement.innerHTML = dateHTML;

   document.querySelectorAll('.date.available').forEach(dateElement => {
         dateElement.addEventListener('click', () => {
              openForm(dateElement.getAttribute('data-date'));
         })
   })


}
prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalender();
})

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalender();
} )
updateCalender();

newToDoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = titleInput.ariaValueMax;
    const description = descriptionInput.ariaValueMax;

    if(title && description && selectedDate){
        const task = {
            title,
            description,
            date: selectedDate.toDateString()
        };
        saveTask(task);
        addTaskToDOM(task);
        titleInput.value = '';
        descriptionInput.value = '';
    }
});

function saveTask(task){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    
}