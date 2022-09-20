// import Appliance from "./appliance.js";

export default class Tag{
    constructor(text){
        this.tagWrapper = document.querySelector('.tag__items')
        this.text = text
    }

    applianceTagSort(){
       let tabAppliance = []
       tabAppliance.push(this.text)
       console.log('tab: ', tabAppliance)
    }

    render(){
        const tag =/*html */ `
        <ul class="tag__item  text-center row">
            ${this.text}
        </ul>
        `;

        this.tagWrapper.innerHTML = tag
        this.applianceTagSort()
        return this.tagWrapper
    }
}

{/* <li class="col-2 tag__itemTexte"><span class="tag__itemText"> liste </span></li>
            <li class="col-2 tag__itemTexte"><span class="tag__itemText"> liste </span></li>
            <li class="col-2 tag__itemTexte"><span class="tag__itemText"> liste </span></li> */}