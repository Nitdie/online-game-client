import {Bullet} from "./bullet";
export class Player {
    private game: any
    private width: number
    private height: number
    private x: number
    private y: number
    private drawX: number
    private drawY: number
    private image: HTMLImageElement
    private angle: number = 1
    private lastShootTime: number; // 上次射击的时间戳
    private shootInterval: number; // 射击间隔，以毫秒为单位
    constructor(game: any) {
        this.game = game
        this.width = 50
        this.height = 50
        this.x = 400
        this.y = 250
        this.image = document.getElementById('spaceShip') as HTMLImageElement
        this.drawX = this.game.canvas.width / 2
        this.drawY = this.game.canvas.height / 2

        this.lastShootTime = 0;
        this.shootInterval = 1000;
    }
    update(input: any) {
        const dx = input.mouseX - this.drawX
        const dy = input.mouseY - this.drawY
        this.angle = Math.atan2(dy, dx)
        if (Math.sqrt(dx * dx + dy * dy) > 40) {
            let moveSpeed = 4
            if(input.mouseDown)
                moveSpeed *= 2
            this.x += Math.cos(this.angle) * moveSpeed
            this.y += Math.sin(this.angle) * moveSpeed
        }

        // this.drawX = 2 * this.x - (this.game.width / 2)
        // this.drawY = 2 * this.y - (this.game.height / 2)
        this.drawX = this.game.canvas.width / 2
        this.drawY = this.game.canvas.height / 2
        //Near border draw
        if (this.x < this.game.canvas.width / 2) this.drawX = this.x
        if (this.x > this.game.width - this.game.canvas.width / 2)
            this.drawX = this.x - (this.game.width - this.game.canvas.width)
        if (this.y < this.game.canvas.height / 2) this.drawY = this.y
        if (this.y > this.game.height - this.game.canvas.height / 2)
            this.drawY = this.y - (this.game.height - this.game.canvas.height)

        const autoShoot = () => {
            const currentTime = Date.now();
            if(currentTime - this.lastShootTime >= this.shootInterval){
                this.shoot();
                this.lastShootTime = currentTime
            }
        }
        autoShoot()
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = '#E170B8'

        ctx.save()
        ctx.translate(this.drawX, this.drawY)
        ctx.rotate(this.angle - Math.PI / 2)
        //draw box
        // ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height - 10)
        ctx.drawImage(
            this.image,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height - 10 //Shorten the img
        )
        ctx.restore()

    }
    shoot(){
        const bulletSpeed = 6;
        const bulletAngle = this.angle; // 子弹射击方向和玩家当前角度相同
        const bulletX = this.drawX; // 子弹的初始 X 位置，可以根据需要调整
        const bulletY = this.drawY; // 子弹的初始 Y 位置，可以根据需要调整
        // 创建新的子弹对象并添加到游戏世界中
        const bullet = new Bullet(bulletX, bulletY, bulletAngle, bulletSpeed,1000);
        this.game.bullets.push(bullet); // 假设游戏维护一个 bullets 数组来存储所有的子弹
        bullet.playSound()
    }
}
