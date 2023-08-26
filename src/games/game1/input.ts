export class InputHandler {
    mouseX: number
    mouseY: number
    private keys: any[]
    private mouseDown: boolean
    constructor(canvas: HTMLCanvasElement) {
        this.keys = []
        window.addEventListener('keydown', (e) => {
            if (
                (e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight' ||
                    e.key === 'Enter') &&
                this.keys.indexOf(e.key) === -1
            ) {
                this.keys.push(e.key)
            }
        })
        window.addEventListener('keyup', (e) => {
            if (
                e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'Enter'
            ) {
                this.keys.splice(this.keys.indexOf(e.key), 1)
            }
        })

        //Mousemove input
        this.mouseX = this.mouseY = 0
        canvas.addEventListener('mousemove', (event) => {
            this.mouseX = event.offsetX
            this.mouseY = event.offsetY
        })
        //Mousedown input
        this.mouseDown = false
        canvas.addEventListener('mousedown', (event) => {
            if (event.button === 0) this.mouseDown = true
        })
        canvas.addEventListener('mouseup', (event) => {
            if (event.button === 0) this.mouseDown = false
        })

        canvas.addEventListener('click', (event) => {
            event.preventDefault()
        })
    }
}
