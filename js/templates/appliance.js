

export default class Appliance{
    constructor(){
        this.toolsWrapper = document.querySelector('.tag__appliance');
        //this.tagInput = document.querySelector('.tag__input');
    
        this.applianceOnClick = () => {
           
            // this.toolsWrapper.addEventListener('click', () => {
            // console.log('tagInput: ', this.tagInput)
            // this.tagInput.classList.remove('hidden')    
            // })
        }
    }

    render(){
        const tool = `
            <div 
                class="tag__row row d-flex align-items-center dropdown-toggle"
                data-bs-toggle="dropdown"
                type="button"
                
            >
                <h2 class="tag__title text-center col-9">appliance</h2>
                <input class="tag__input hidden bg-primary" id="appliance" type="text" placeholder="rechercher un appareil"></input>
                <i class="fas fa-chevron-up col-3"></i>
            </div>
            <ul class="tag__dropdown-menu dropdown-menu">
                <li>liste</li>
                <li>liste</li>

                <li>liste</li>
                <li>liste</li>
                <li>liste</li>
                <li>liste</li>                
            </ul> 
        `;

        this.toolsWrapper.innerHTML = tool;
        //this.applianceOnClick();
        return this.toolsWrapper;
    }
}

