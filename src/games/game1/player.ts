import {Bullet} from "./bullet";
import {mainStore} from "@/stores"; const store = mainStore()
const SPEED = 4

export class Player {
    private game: any
    private width: number
    private height: number
    private x: number
    private y: number
    private image: HTMLImageElement
    private angle: number = 1
    private lastShootTime: number; // 上次射击的时间戳
    private shootInterval: number; // 射击间隔，以毫秒为单位
    private socket: any;
    private moveSpeed = SPEED
    constructor(game: any,socket:any) {
        this.game = game
        this.width = 50
        this.height = 50
        this.x = 400
        this.y = 250
        this.image = document.getElementById('spaceShip') as HTMLImageElement
        this.lastShootTime = 0;
        this.shootInterval = 800;

    }
    update(input: any) {
        //UpdateSpeed
        if(input.mouseDown)
            this.moveSpeed = 2 * SPEED
        else
            this.moveSpeed = SPEED

        const dx = input.mouseX - (this.x-this.game.camera.x)
        const dy = input.mouseY - (this.y-this.game.camera.y)
        this.angle = Math.atan2(dy, dx)
        if (Math.sqrt(dx * dx + dy * dy) > 40) {
            this.x += Math.cos(this.angle) * this.moveSpeed
            this.y += Math.sin(this.angle) * this.moveSpeed
        }

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
        this.drawPlayer(ctx,this.x,this.y,this.angle,this.width,this.height)
    }
    drawPlayer(ctx:CanvasRenderingContext2D,x:number,y:number,angle:number,width:number,height:number){
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(angle - Math.PI / 2)
        //draw box
        // ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height - 10)
        ctx.drawImage(
            this.image,       //TO BE CHANGED
            -width / 2,
            -height / 2,
            width,
            height - 10 //Shorten the img
        )
        ctx.restore()
    }
    shoot(){
        const bulletAddSpeed = 5;
        const bulletAngle = this.angle; // 子弹射击方向和玩家当前角度相同
        const bulletX = this.x; // 子弹的初始 X 位置，可以根据需要调整
        const bulletY = this.y; // 子弹的初始 Y 位置，可以根据需要调整
        // 创建新的子弹对象并添加到游戏世界中
        const bullet = new Bullet(bulletX, bulletY, bulletAngle, this.moveSpeed+bulletAddSpeed,1000);
        this.game.bullets.push(bullet); // 假设游戏维护一个 bullets 数组来存储所有的子弹
        bullet.playSound()
    }
}
