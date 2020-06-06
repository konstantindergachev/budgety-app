const getDate = () => {
    let now = new Date();
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let monthsRus = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    let month = now.getMonth();
    let day = now.getDate();
    let year = now.getFullYear();
    let myDate = `${day} ${monthsRus[month]} ${year}г.`;
    return myDate;
};

export default getDate;
