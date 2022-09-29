import Appliance from "../templates/appliance.js"

export function displaySelected(array){
    const cards = document.querySelector('.cards')
    console.log('crads: ', cards)
    const appliance = new Appliance(array)
    appliance.render()
}