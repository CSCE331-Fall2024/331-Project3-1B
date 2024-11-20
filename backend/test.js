

const options = '1';
const items = '1'

fetch(`http://localhost:3001/manager/get_ingredients?option=${options}&item=${items}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));