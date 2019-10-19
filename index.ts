class Light {
    pos: {
        x: number,
        y: number
    }
    elm: HTMLElement
    constructor(element: HTMLElement, x: number, y: number) {
        this.elm = element
        this.elm.innerHTML = Math.random() > 0.5 ? '1' : '0'
        this.pos = { x,y }
    }
    toggle() {
        this.elm.innerHTML = this.elm.innerHTML === '1' ? '0' : '1'
    }

}

class GameManager {
    lights: Light[] = []
    constructor() {
        this.setupLights(3)
        // const resetBtn = document.getElementById('js-reset')
    }

    setupLights(size: number) {
        const $table = document.getElementById('js-game-table') as HTMLElement
        for (let rowIdx in [...Array(size)]){
            const $tr = document.createElement('tr')
            for (let colIdx in [...Array(size)] ) {
                const $td = document.createElement('td')
                const light = new Light($td, Number(colIdx), Number(rowIdx))
                $td.addEventListener('click', () => this.onClickLight(light))
                this.lights.push(light)
                $tr.appendChild($td)
            }
            $table.appendChild($tr)
        }
    }

    findLight(x: number, y: number): (Light | undefined) {
        return this.lights.find(light => {
            return (light.pos.x === x && light.pos.y === y)
        })
    }

    onClickLight(light: Light) {
        // 自分をトグル
        light.toggle()
        // 周りをトグル
        const neighbourLights: (Light | undefined)[] = []
        neighbourLights.push(this.findLight(light.pos.x + 1, light.pos.y))
        neighbourLights.push(this.findLight(light.pos.x - 1, light.pos.y))
        neighbourLights.push(this.findLight(light.pos.x, light.pos.y + 1))
        neighbourLights.push(this.findLight(light.pos.x, light.pos.y - 1))
        neighbourLights.forEach(light  => {
            if(light) {
                light.toggle()
            }
        })
        if(this.lights.map(light => light.elm.innerHTML === '1').reduce((acc, val) => acc && val)) {
            console.log('YOU DID IT!')
        }

    }
}

new GameManager()

// window.game = new GameManager()

