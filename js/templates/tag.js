// import Appliance from "./appliance.js";

export default class Tag{
    static count = 0
    constructor(text){
        this.instanceId = ++Tag.count
        this.tagWrapper = document.createElement('div')
        this.text = text
    }

    tagItemClose(){
        const tagItem = document.querySelector('.tag__item')
        const tagClose = document.querySelector('.tag__itemClose')
        if(tagItem){
            console.log('c est ok pour tagItem')
            tagClose.addEventListener('click', () => {
                console.log('c est ok avec clic')
                //console.log('tagItem: ', tagItem)
            })
        }
    }

    render(){
        const tag =/*html */ `
                <div class="tag__item ">
                    ${this.text}
                    <i class="fa fa-window-close tag__itemClose tag__itemClose"></i>

                </div>
            `;

        this.tagWrapper.innerHTML = tag
        this.tagWrapper.classList.add('col-2')
        //this.tagItemClose()
        return this.tagWrapper
    }
}


{/* <span class=" text-center">
                    ${this.text}
                </span> */}