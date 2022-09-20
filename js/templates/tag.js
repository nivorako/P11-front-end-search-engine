// import Appliance from "./appliance.js";

export default class Tag{
    constructor(text){
        this.tagWrapper = document.createElement('div')
        this.text = text
    }

    applianceTagSort(){
       let tabAppliance = []
       tabAppliance.push(this.text)
       console.log('tab: ', tabAppliance)
    }

    render(){
        const tag =/*html */ `
        <ul class="tag__item  text-center">
            ${this.text}
        </ul>
        `;

        this.tagWrapper.innerHTML = tag
        this.tagWrapper.classList.add('col-2')
        this.applianceTagSort()
        return this.tagWrapper
    }
}
