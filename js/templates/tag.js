// import Appliance from "./appliance.js";

export default class Tag{
    static count = 0
    constructor(text){
        this.instanceId = ++Tag.count
        this.tagWrapper = document.createElement('div')
        this.text = text
    }

    render(){
        const tag =/*html */ `

            <div class="tag__item d-flex justify-content-between align-items-center">
                <span class=" text-center">
                    ${this.text}
                </span>
                <i class="fa fa-window-close tag__itemClose"></i>

            </div>
            `;

        this.tagWrapper.innerHTML = tag
        this.tagWrapper.classList.add('col-2')
        return this.tagWrapper
    }
}
