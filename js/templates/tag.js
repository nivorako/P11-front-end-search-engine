

export default class Tag{
    static count = 0
    constructor(text){
        this.instanceId = ++Tag.count
        this.tagWrapper = document.createElement('div')
        this.text = text
    }

    render(){
        const tag =/*html */ `
                <div class="tag__item">
                    ${this.text}
                    <i class="fa fa-window-close tag__itemClose tag__itemClose${this.instanceId}"></i>

                </div>
            `;

        this.tagWrapper.innerHTML = tag
        this.tagWrapper.classList.add('col-2')
        this.tagWrapper.classList.add(`tag__item${this.instanceId}`)
        return this.tagWrapper
    }
}
