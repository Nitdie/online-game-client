export class Sprite {
    private ctx: CanvasRenderingContext2D
    private x: number
    private y: number
    private frameMax: number
    // private angle:number
    private frameCurrent = 0
    private frameElapsed = 0
    private frameHold = 8
    private image: any
    private scale
    public expired = false
    private expirable
    constructor(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        angle: number,
        image: any,
        expirable: boolean,
        scale = 1,
        frameMax = 1
    ) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.image = image
        this.scale = scale
        this.frameMax = frameMax

        this.expirable = expirable
    }
    update() {
        if (!this.expired) {
            this.draw()
            this.animateFrame()
        }
    }
    draw() {
        this.ctx.drawImage(
            this.image,
            (this.frameCurrent * this.image.width) / this.frameMax, //x
            0, //y
            this.image.width / this.frameMax, //width
            this.image.height, //height
            this.x - ((this.image.width * this.scale) / this.frameMax)/2,
            this.y - (this.image.height * this.scale)/2,
            (this.image.width * this.scale) / this.frameMax,
            this.image.height * this.scale
        )
        this.animateFrame()
    }

    animateFrame() {
        this.frameElapsed += 1
        if (this.frameElapsed % this.frameHold == 0) {
            if (this.frameCurrent < this.frameMax - 1) this.frameCurrent += 1
            else {
                if (this.expirable) this.expired = true
            }
        }
    }
}
