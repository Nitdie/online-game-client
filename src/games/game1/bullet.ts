import { mainStore } from '@/stores'
const store = mainStore()
import { Sprite } from '@/games/game1/sprite'
import {_missile1, _laser1, _missile2,_laser2} from "@/games/game1/constants/BulletTypes";

export class Bullet {
    x: number
    y: number
    width: number
    height: number
    private speed: number
    private dx: number
    private dy: number
    private expirationTime: number
    private expired: boolean = false
    private image: HTMLImageElement
    angle: number
    private type = 'missile1'
    sound: HTMLAudioElement
    private static expired: Boolean
    private addSpeed = 4
    shooter
    idNumber: number
    constructor(
        type:string,
        shooter: string,
        x: number,
        y: number,
        angle: number,
        originSpeed: number,
        expirationTime: number,
        idNumber: number
    ) {
        this.type=type
        this.shooter = shooter
        this.x = x
        this.y = y
        this.speed = originSpeed + this.addSpeed
        // 可以根据角度和速度计算子弹的运动方向
        this.angle = angle
        this.dx = Math.cos(angle) * this.speed
        this.dy = Math.sin(angle) * this.speed
        this.expirationTime = expirationTime
        this.expired = false

        this.idNumber = idNumber

        this.width = this.height = 20
        this.image = document.getElementById('Missile1') as HTMLImageElement
        this.sound = document.getElementById('Missile1Shoot') as HTMLAudioElement
        const selectType = ()=>{
            switch (type){
                case _missile1.type:
                    this.image = document.getElementById('Missile1') as HTMLImageElement
                    this.sound = document.getElementById('Missile1Shoot') as HTMLAudioElement
                    this.width = _missile1.width
                    this.height = _missile1.height
                    this.speed = originSpeed + _missile1.speed
                    this.dx = Math.cos(angle) * this.speed
                    this.dy = Math.sin(angle) * this.speed
                    break
                case _laser1.type:
                    this.image = document.getElementById('Laser1') as HTMLImageElement
                    this.sound = document.getElementById('Missile1Shoot') as HTMLAudioElement
                    this.width = _laser1.width
                    this.height = _laser1.height
                    this.speed = originSpeed + _laser1.speed
                    this.dx = Math.cos(angle) * this.speed
                    this.dy = Math.sin(angle) * this.speed
                    break
                case _missile2.type:
                    this.image = document.getElementById('Missile2') as HTMLImageElement
                    this.sound = document.getElementById('Missile1Shoot') as HTMLAudioElement
                    this.width = _missile2.width
                    this.height = _missile2.height
                    this.speed = originSpeed + _missile2.speed
                    this.dx = Math.cos(angle) * this.speed
                    this.dy = Math.sin(angle) * this.speed
                    break
                case _laser2.type:
                    this.image = document.getElementById('Laser2') as HTMLImageElement
                    this.sound = document.getElementById('Missile1Shoot') as HTMLAudioElement
                    this.width = _laser2.width
                    this.height = _laser2.height
                    this.speed = originSpeed + _laser2.speed
                    this.dx = Math.cos(angle) * this.speed
                    this.dy = Math.sin(angle) * this.speed
                    break
                default:
                    console.log("Bullet Initialize Used Default")
            }
        }
        selectType()
    }

    update(players:any[]) {
        if (!this.expired) {
            const updatePosition = () => {
               if(this.type==_missile2.type){
                   let distance = 9999
                   let chooseX = this.x
                   let chooseY = this.y
                   let targetAngle = this.angle
                   for(const player of players){
                       if(player.name != this.shooter){
                           const dx = this.x - player.x
                           const dy = this.y - player.y
                           const newDistance = Math.sqrt(dx*dx+dy*dy)
                           if(newDistance<distance){

                               distance=newDistance
                               chooseX = player.x
                               chooseY = player.y
                               }
                           }
                       }
                   const dx = chooseX - this.x
                   const dy = chooseY - this.y
                   if(players.length>=2)
                       targetAngle = Math.atan2(dy, dx)
                   let diff = targetAngle - this.angle
                   if(diff>Math.PI)
                       diff -= 2*Math.PI
                   else if(diff<-Math.PI)
                       diff += 2*Math.PI

                   if(diff>0)
                       this.angle += 0.03
                   if(diff<0)
                        this.angle -= 0.03
                   this.x += Math.cos(this.angle) * this.speed;
                   this.y += Math.sin(this.angle) * this.speed;
               }
               else{
                   this.x += this.dx
                   this.y += this.dy
               }

            }
            updatePosition()

            const updateExpirationTime = () => {
                this.expirationTime -= 16
            }
            updateExpirationTime()

            const checkExpire = () => {
                if (this.expirationTime <= 0) {
                    this.expired = true
                    // this.finish(ctx, spritesList)
                }
            }
            checkExpire()
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        Bullet.drawBullet(ctx, this.type,this.x, this.y, this.angle, this.width, this.height)
    }
    static drawBullet(
        ctx: CanvasRenderingContext2D,
        type:string,
        x: number,
        y: number,
        angle: number,
        width: number,
        height: number
    ) {
        if (!this.expired) {
            // 绘制子弹
            ctx.save()
            ctx.translate(x, y)
            ctx.rotate(angle + Math.PI / 2)
            if (store.debug_mode) {
                ctx.fillStyle = '#5f9ada'
                ctx.fillRect(-width / 2, -height / 2, width, height)
            }
            //image
            let img: HTMLImageElement = document.getElementById('Missile1') as HTMLImageElement
            switch (type){
                case _missile1.type:
                    img = document.getElementById('Missile1') as HTMLImageElement
                    break
                case _laser1.type:
                    img = document.getElementById('Laser1') as HTMLImageElement
                    break
                case _missile2.type:
                    img = document.getElementById('Missile2') as HTMLImageElement
                    break
                case _laser2.type:
                    img = document.getElementById('Laser2') as HTMLImageElement
                    break
                default:
                    console.log("Bullet Draw Other Used Default")
            }
            ctx.drawImage(
                img,
                -width / 2,
                -height / 2,
                width,
                height
            )
            ctx.restore()
        }
    }

    finish(ctx: CanvasRenderingContext2D, spriteList: any[]) {
        Bullet.finishBullet(ctx, spriteList, this.type,this.x, this.y)
    }
    static finishBullet(ctx: CanvasRenderingContext2D, spriteList: any, type:string,x: number, y: number) {
        let img = document.getElementById('ExplosionEffect1') as HTMLImageElement
        let frameMax = 3

        switch (type){
            case _missile1.type:
                img =  document.getElementById('ExplosionEffect1') as HTMLImageElement
                frameMax = 3
                break
            case _laser1.type:
                img =  document.getElementById('Laser1Explosion') as HTMLImageElement
                frameMax = 3
                break
            case _missile2.type:
                img =  document.getElementById('Missile2Explosion') as HTMLImageElement
                frameMax = 3
                break
            case _laser2.type:
                img =  document.getElementById('Laser2Explosion') as HTMLImageElement
                frameMax = 3
                break
            default:
                console.log("FINISH BULLET USED DEFAULT")
        }
        spriteList.push(new Sprite(ctx, x, y, 1, img, true, 1, frameMax))
    }

    playSound() {
        this.sound.currentTime = 0
        this.sound.volume = 0
        this.sound.play()
    }

    isExpired() {
        return this.expired
    }
}
