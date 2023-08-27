import { Bullet } from './bullet'
import { mainStore } from '@/stores'
import './constants/ShipTypes'
import {_laser1, _missile1, _missile2,_laser2} from "@/games/game1/constants/BulletTypes";
import {_spaceShip1, _spaceShip2,_spaceShip3,_spaceShip4} from '@/games/game1/constants/ShipTypes'

const store = mainStore()
let SPEED = 4

export class Player {
    private game: any
    private lift: number = 100
    name: string
    width: number
    height: number
    x: number
    y: number
    // private image: HTMLImageElement | null
    public type: string
    angle: number = 1
    public state = 'normal'
    private lastShootTime: number // 上次射击的时间戳
    private shootInterval: number // 射击间隔，以毫秒为单位
    private moveSpeed:number = SPEED;
    private hurtTime = 0
    constructor(game: any, name: string, type: string) {
        this.game = game
        this.width = _spaceShip1.width
        this.height = _spaceShip1.height
        this.x = 400
        this.y = 250
        this.type = type
        this.lastShootTime = 0
        this.shootInterval = 800
        this.name = name
        const typeSelect = () => {
            switch (type) {
                case 'spaceShip1':
                    this.width = _spaceShip1.width
                    this.height = _spaceShip1.height
                    this.shootInterval = _spaceShip1.shootInterval
                    SPEED = _spaceShip1.speed
                    break
                case 'spaceShip2':
                    this.width = _spaceShip2.width
                    this.height = _spaceShip2.height
                    this.shootInterval = _spaceShip2.shootInterval
                    SPEED = _spaceShip2.speed
                    break
                case 'spaceShip3':
                    this.width = _spaceShip3.width
                    this.height = _spaceShip3.height
                    this.shootInterval = _spaceShip3.shootInterval
                    SPEED = _spaceShip3.speed
                    break
                case 'spaceShip4':
                    this.width = _spaceShip4.width
                    this.height = _spaceShip4.height
                    this.shootInterval = _spaceShip4.shootInterval
                    SPEED = _spaceShip4.speed
                    break
                default:
                    console.log("Player Initialize Used Default")
            }
        }
        typeSelect()
    }
    update(input: any) {
        const updateState = ()=>{
            if(this.hurtTime>0)
                this.hurtTime-=16

            if(this.hurtTime>0)
                this.state = 'hurt'
            else{
                this.state = 'normal'
            }
        }
        updateState()


        const updatePosition = () => {
            if (input.mouseDown) this.moveSpeed = 1.4 * SPEED
            else this.moveSpeed = SPEED
            const dx = input.mouseX - (this.x - this.game.camera.x)
            const dy = input.mouseY - (this.y - this.game.camera.y)
            this.angle = Math.atan2(dy, dx)
            if (Math.sqrt(dx * dx + dy * dy) > 40) {
                this.x += Math.cos(this.angle) * this.moveSpeed
                this.y += Math.sin(this.angle) * this.moveSpeed
            }
        }
        updatePosition()

        const autoShoot = () => {
            const currentTime = Date.now()
            if (currentTime - this.lastShootTime >= this.shootInterval) {
                this.shoot()
                this.lastShootTime = currentTime
            }
        }
        autoShoot()
    }
    draw(ctx: CanvasRenderingContext2D) {
        Player.drawPlayer(ctx, this.type, this.x, this.y, this.angle, this.state)
    }
    static drawPlayer(
        ctx: CanvasRenderingContext2D,
        type: string,
        x: number,
        y: number,
        angle: number,
        state: string
    ) {
        const drawInitialize = () => {
            ctx.save()
            ctx.translate(x, y)
            ctx.rotate(angle - Math.PI / 2)
        }
        drawInitialize()

        const debugDraw = () => {
            ctx.fillStyle = '#ffc46f'
            if (store.debug_mode === true) ctx.fillRect(-width / 2, -height / 2, width, height)
        }
        debugDraw()


        let normalImg: HTMLImageElement = document.getElementById('spaceShip1') as HTMLImageElement
        let hurtImg: HTMLImageElement = document.getElementById(
            'spaceShip1Hurt'
        ) as HTMLImageElement
        let width: number = _spaceShip1.width
        let height: number = _spaceShip1.height
        const typeSelect = () => {
            switch (type) {
                case 'spaceShip1':
                    normalImg = document.getElementById('spaceShip1') as HTMLImageElement
                    hurtImg = document.getElementById('spaceShip1Hurt') as HTMLImageElement
                    width = _spaceShip1.width
                    height = _spaceShip1.height
                    break
                case 'spaceShip2':
                    normalImg = document.getElementById('spaceShip2') as HTMLImageElement
                    hurtImg = document.getElementById('spaceShip2Hurt') as HTMLImageElement
                    width = _spaceShip2.width
                    height = _spaceShip2.height
                    break
                case 'spaceShip3':
                    normalImg = document.getElementById('spaceShip3') as HTMLImageElement
                    hurtImg = document.getElementById('spaceShip3Hurt') as HTMLImageElement
                    width = _spaceShip3.width
                    height = _spaceShip3.height
                    break
                case 'spaceShip4':
                    normalImg = document.getElementById('spaceShip4') as HTMLImageElement
                    hurtImg = document.getElementById('spaceShip4Hurt') as HTMLImageElement
                    width = _spaceShip4.width
                    height = _spaceShip4.height
                    break
                default:
                    console.log('DRAW USED DEFAULT')
            }
        }
        typeSelect()
        const drawState = () => {
            let drawingImg: HTMLImageElement = normalImg
            switch (state) {
                case 'normal':
                    drawingImg = normalImg
                    break
                case 'hurt':
                    drawingImg = hurtImg
                    break
                default:
                    console.log('DRAWING STATE USED DEFAULT')
            }
            ctx.drawImage(drawingImg, -width / 2, -height / 2, width, height)
        }
        drawState()

        ctx.restore()
    }
    shoot() {
        const shootMissile1 =  ()=>{
            const bulletAngle = this.angle
            const bulletX = this.x
            const bulletY = this.y
            //Generate Bullet Id Number
            let newBulletIdNumber: number = -1
            const generateBulletIdNumber = () => {
                let i = 1
                while (i < 9999) {
                    let isIdExisted = false
                    if (this.game.bullets.length == 0) break
                    else {
                        for (const bullet of this.game.bullets) {
                            if (bullet.idNumber === i) {
                                isIdExisted = true //Current I Cant Use
                                break
                            }
                        }
                    }
                    if (!isIdExisted) {
                        break
                    } else {
                        i++
                    }
                }
                newBulletIdNumber = i
                if (newBulletIdNumber == -1) console.log('BULLET ID NUMBER ERROR')
            }
            generateBulletIdNumber()

            const bullet = new Bullet(
                _missile1.type,
                this.game.socket.id,
                bulletX,
                bulletY,
                bulletAngle,
                this.moveSpeed,
                _missile1.expirationTime,
                newBulletIdNumber
            )
            this.game.bullets.push(bullet)

            // bullet.playSound()
        }
        const shootLaser1 =  ()=>{
            const bulletAngle = this.angle
            for(let i=-1;i<=1;i+=2){
            const bulletX = this.x + Math.cos(this.angle+Math.PI/2)*_spaceShip2.width/3*i
            const bulletY = this.y + Math.sin(this.angle+Math.PI/2)*_spaceShip2.height/3*i
            //Generate Bullet Id Number
            let newBulletIdNumber: number = -1
            const generateBulletIdNumber = () => {
                let i = 1
                while (i < 9999) {
                    let isIdExisted = false
                    if (this.game.bullets.length == 0) break
                    else {
                        for (const bullet of this.game.bullets) {
                            if (bullet.idNumber === i) {
                                isIdExisted = true //Current I Cant Use
                                break
                            }
                        }
                    }
                    if (!isIdExisted) {
                        break
                    } else {
                        i++
                    }
                }
                newBulletIdNumber = i
                if (newBulletIdNumber == -1) console.log('BULLET ID NUMBER ERROR')
            }
            generateBulletIdNumber()
            const bullet = new Bullet(
                _laser1.type,
                this.game.socket.id,
                bulletX,
                bulletY,
                bulletAngle,
                this.moveSpeed,
                _laser1.expirationTime,
                newBulletIdNumber
            )
            this.game.bullets.push(bullet)
            // bullet.playSound()
            }
        }
        const shootMissile2 = () =>{
            const bulletAngle = this.angle
            const bulletX = this.x
            const bulletY = this.y
            //Generate Bullet Id Number
            let newBulletIdNumber: number = -1
            const generateBulletIdNumber = () => {
                let i = 1
                while (i < 9999) {
                    let isIdExisted = false
                    if (this.game.bullets.length == 0) break
                    else {
                        for (const bullet of this.game.bullets) {
                            if (bullet.idNumber === i) {
                                isIdExisted = true //Current I Cant Use
                                break
                            }
                        }
                    }
                    if (!isIdExisted) {
                        break
                    } else {
                        i++
                    }
                }
                newBulletIdNumber = i
                if (newBulletIdNumber == -1) console.log('BULLET ID NUMBER ERROR')
            }
            generateBulletIdNumber()
            const bullet = new Bullet(
                _missile2.type,
                this.game.socket.id,
                bulletX,
                bulletY,
                bulletAngle,
                this.moveSpeed,
                _missile2.expirationTime,
                newBulletIdNumber
            )
            this.game.bullets.push(bullet)
            // bullet.playSound()
        }
        const shootLaser2 =  ()=>{
            const bulletAngle = this.angle
            const bulletX = this.x
            const bulletY = this.y
            //Generate Bullet Id Number
            let newBulletIdNumber: number = -1
            const generateBulletIdNumber = () => {
                let i = 1
                while (i < 9999) {
                    let isIdExisted = false
                    if (this.game.bullets.length == 0) break
                    else {
                        for (const bullet of this.game.bullets) {
                            if (bullet.idNumber === i) {
                                isIdExisted = true //Current I Cant Use
                                break
                            }
                        }
                    }
                    if (!isIdExisted) {
                        break
                    } else {
                        i++
                    }
                }
                newBulletIdNumber = i
                if (newBulletIdNumber == -1) console.log('BULLET ID NUMBER ERROR')
            }
            generateBulletIdNumber()

            const bullet = new Bullet(
                _laser2.type,
                this.game.socket.id,
                bulletX,
                bulletY,
                bulletAngle,
                this.moveSpeed,
                _laser2.expirationTime,
                newBulletIdNumber
            )
            this.game.bullets.push(bullet)

            // bullet.playSound()
        }

        switch(this.type){
            case "spaceShip1":
                shootMissile1()
                break
            case "spaceShip2":
                shootLaser1()
                break
            case "spaceShip3":
                shootMissile2()
                break
            case "spaceShip4":
                shootLaser2()
                break
            default:
                shootMissile1()
                console.log("SHOOT USED DEFAULT")
        }

    }

}
