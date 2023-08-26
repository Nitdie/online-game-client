import { Player } from './player'
import { InputHandler } from './input'
import { mainStore } from '@/stores'
import { Bullet } from '@/games/game1/bullet'
import { Sprite } from '@/games/game1/sprite'
import './constants/ShipTypes'
const store = mainStore()

export function gameSetUp(canvas: HTMLCanvasElement, socket: any) {
    canvas.width = 800
    canvas.height = 500
    class Game {
        protected canvas
        protected ctx: CanvasRenderingContext2D
        private width: number
        private player_health = 100
        private height: number
        private input: InputHandler = new InputHandler(canvas)
        private currentPlayer: any
        private otherPlayers: any[] = [];
        protected bullets: any = []
        protected otherBullets: any = []
        protected bulletHitData: any = []
        protected sprites: Sprite[] = []
        private socket: any
        private roomData: {
            players: Player[] // Player[] 表示一个 Player 类型的数组
            bullets: Bullet[] // Bullet[] 表示一个 Bullet 类型的数组
        } = {
            players: [],
            bullets: [],
        }

        private camera: { x: number; y: number } = { x: 0, y: 0 }
        constructor(canvas: HTMLCanvasElement, socket: any) {
            this.canvas = canvas
            this.ctx = canvas.getContext('2d')!
            this.width = 1200 //1200
            this.height = 1200
            const shipType = store.game1type
            this.currentPlayer = new Player(this, socket.id,shipType)
            this.socket = socket

            const inputInitialize = () =>{
                this.input.mouseX = this.currentPlayer.x
                this.input.mouseY = this.currentPlayer.y
            }
            inputInitialize()

            socket.on('send_data', (data: any) => {
                this.roomData = data
            })
            socket.on('bullet_hit_player',(data:any)=> {
                this.bulletHitData = data
                for(const item of this.bulletHitData){
                    Bullet.finishBullet(this.ctx,this.sprites,item.hitBulletType,item.hitBulletX,item.hitBulletY)
                    for(const bullet of this.bullets){
                        if(bullet.idNumber==item.hitBulletIdNumber&&bullet.shooter==item.hitBulletShooter){
                            bullet.expired = true
                        }
                    }

                }

            })
            socket.on('taken_damage',(damage)=>{
                this.player_health -= damage
                console.log(this.player_health)
            })

        }

        upload() {
            const uploadBullets = () => {
                for (const bullet of this.bullets) {
                    this.socket.emit('upload_bullets', {
                        bulletX: bullet.x,
                        bulletY: bullet.y,
                        bulletAngle: bullet.angle,
                        bulletWidth: bullet.width,
                        bulletHeight: bullet.height,
                        bulletShooter: this.socket.id,
                        bulletType: bullet.type,
                        bulletIdNumber: bullet.idNumber
                    })
                }
            }
            uploadBullets()
            const uploadPlayer = () => {
                this.socket.emit('upload_player', {
                    playerX: this.currentPlayer.x,
                    playerY: this.currentPlayer.y,
                    playerAngle: this.currentPlayer.angle,
                    playerType: this.currentPlayer.type,
                    playerWidth: this.currentPlayer.width,
                    playerHeight: this.currentPlayer.height
                })
            }
            uploadPlayer()
        }
        update() {
            this.socket.emit('request_data') //已用socket.on创建事件监听器

            const updateSelfPlayer = () => {
                this.currentPlayer.state = 'normal'
                for(const data of this.bulletHitData){
                    if(data.hitPlayerName == socket.id){

                        this.currentPlayer.hurtTime += 150
                        this.bulletHitData.splice(this.bulletHitData.indexOf(data),1)
                    }
                }

                this.currentPlayer.update(this.input)
            }
            updateSelfPlayer()

            const updateOtherPlayer = () => {
                this.otherPlayers = this.roomData.players
            }
            updateOtherPlayer()

            const updateSelfBullets = () => {
                for (let i = 0; i < this.bullets.length; i++) {
                    const bullet = this.bullets[i]
                    bullet.update(this.otherPlayers)
                    if (bullet.isExpired()) {
                        this.bullets.splice(i, 1)
                        i--
                        socket.emit('remove_bullet', {
                            bulletType: bullet.type,
                            bulletShooter: socket.id,
                            bulletIdNumber:bullet.idNumber
                        })
                    }

                }
            }
            updateSelfBullets()

            const updateOtherBullets = () => {
                this.otherBullets = this.roomData.bullets
            }
            updateOtherBullets()


            const updateCamera = () => {
                this.camera.x = this.currentPlayer.x - canvas.width / 2
                this.camera.y = this.currentPlayer.y - canvas.height / 2
                this.camera.x = Math.max(this.camera.x, 0)
                this.camera.x = Math.min(this.camera.x, this.width - canvas.width)
                this.camera.y = Math.max(this.camera.y, 0)
                this.camera.y = Math.min(this.camera.y, this.height - canvas.height)
            }
            updateCamera()

            const updateSprites = () => {
                for (const sprite of this.sprites) {
                    sprite.update()
                }
            }
            updateSprites()

            this.upload()
        }

        draw() {
            const drawInitialize = () => {
                this.ctx.clearRect(0, 0, this.width, this.height)
                this.ctx.save()
                this.ctx.translate(-this.camera.x, -this.camera.y)
            }
            drawInitialize()

            //Draw Background
            const drawBackGround = () => {
                this.ctx.drawImage(document.getElementById('BackGround') as HTMLImageElement, 0, 0)
            }
            drawBackGround()

            //Draw Bullets
            const drawSelfBullets = () => {
                for (let i = 0; i < this.bullets.length; i++) {
                    this.bullets[i].draw(this.ctx)
                }
            }
            drawSelfBullets()

            //Draw Other Bullets
            const drawOtherBullets = () => {
                if (this.roomData) {
                    for (const bullet of this.otherBullets) {
                        if (bullet.shooter != store.getCurrentUser) {
                            Bullet.drawBullet(
                                this.ctx,
                                bullet.type,
                                bullet.x,
                                bullet.y,
                                bullet.angle,
                                bullet.width,
                                bullet.height
                            )
                        } else {
                            // console.log("MISS")
                            // 可以根据roomData提前构建各玩家子弹数组，从而避免MISS
                        }
                    }
                }
            }
            drawOtherBullets()

            //Draw Client Player
            const drawClientPlayer = () => {
                this.currentPlayer.draw(this.ctx)
            }
            drawClientPlayer()

            //Draw Other Player
            const drawOtherPlayers = () => {
                let state = 'normal'
                if (this.roomData) {
                    for (const player of this.otherPlayers) {
                        for(const item of this.bulletHitData){
                            if(item.hitPlayerName==player.name){
                                player['hurtTime'] = 150
                                this.bulletHitData.splice(this.bulletHitData.indexOf(item),1)
                            }
                        }
                        if(player.hurtTime)
                            player.hurtTime-=16

                        if(player.hurtTime&&player.hurtTime>0)
                            state = 'hurt'
                        else
                            state = 'normal'

                        if (player.name != store.getCurrentUser) {
                            Player.drawPlayer(
                                this.ctx,
                                player.type,
                                player.x,
                                player.y,
                                player.angle,
                                state
                            )
                        }
                    }
                }
            }
            drawOtherPlayers()

            //Draw Sprites
            const drawSprites = () => {
                for (const sprite of this.sprites) {
                    sprite.update()
                    if (sprite.expired) {
                        this.sprites.splice(this.sprites.indexOf(sprite), 1)
                    }
                }
            }
            drawSprites()

            this.ctx.restore()
            //Draw Cursor
            const drawCursor = () => {
                this.ctx.beginPath()
                this.ctx.strokeStyle = '#000000'
                this.ctx.arc(this.input.mouseX, this.input.mouseY, 5, 0, Math.PI * 2)
                this.ctx.stroke()
            }
            drawCursor()
        }
    }
    const game = new Game(canvas, socket)

    function animate() {
        game.update()
        game.draw()

        requestAnimationFrame(animate)
    }

    animate()
}
