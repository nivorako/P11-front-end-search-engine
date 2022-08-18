class App{
    constructor(){
        this.wrapper = document.getElementById('body')
    }

    main(){
        const main = `
            <h1> Hello world by JS </h1>
        `
        this.wrapper.innerHTML = main;
    }
}

const app = new App();
app.main();