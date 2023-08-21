import { Player } from './player'
import { InputHandler } from './input'
import {mainStore} from "@/stores"; const store = mainStore()

export function gameSetUp(canvas: HTMLCanvasElement,socket:any) {
    canvas.width = 800
    canvas.height = 500
    class Game {
        protected canvas
        protected ctx: CanvasRenderingContext2D
        private width: number
        private height: number
        // private players: any[];
        private currentPlayer: any
        private mouseX: number
        private mouseY: number
        private input: InputHandler
        protected bullets:any = []
        private socket: any;
        private roomData: any;
        private camera:{x:number,y:number} = {x:0,y:0}
        constructor(canvas: HTMLCanvasElement,socket: any) {
            this.canvas = canvas
            this.ctx = canvas.getContext('2d')!
            this.width = 1200 //1200
            this.height = 1200
            // this.otherPlayers = []
            // this.players.push(new Player(this))
            this.currentPlayer = new Player(this,socket)
            this.mouseX = this.mouseY = 0
            this.input = new InputHandler(canvas)
            this.input.mouseX = this.currentPlayer.x
            this.input.mouseY = this.currentPlayer.y
            this.socket = socket
            socket.on('send_data',(data:any)=>{
                this.roomData = data;
            })
        }
        update() {
            this.socket.emit('request_data')   //已用socket.on创建事件监听器

            this.currentPlayer.update(this.input)
            const updateBullets = () => {
                for(let i=0;i<this.bullets.length;i++)
                {
                    this.bullets[i].update()
                    if(this.bullets[i].isExpired()){
                        this.bullets.splice(i,1)
                        i--
                    }
                }
            }
            console.log(this.bullets)
            updateBullets()
            const updateCamera = () => {
                this.camera.x = this.currentPlayer.x - canvas.width/2
                this.camera.y = this.currentPlayer.y - canvas.height/2
                this.camera.x = Math.max(this.camera.x,0)
                this.camera.x = Math.min(this.camera.x,this.width-canvas.width)
                this.camera.y = Math.max(this.camera.y,0)
                this.camera.y = Math.min(this.camera.y,this.height-canvas.height)
            }
            updateCamera()
            // console.log("Camera:"+this.camera.x)

            this.socket.emit("update_data",{
                playerX:this.currentPlayer.x,
                playerY:this.currentPlayer.y,
                playerAngle:this.currentPlayer.angle

            })
        }

        draw() {

            this.ctx.clearRect(0, 0, this.width, this.height)
            this.ctx.save()
            this.ctx.translate(-this.camera.x,-this.camera.y)
            //Draw Background
            const drawBackGround = ()=> {
                this.ctx.drawImage(
                    document.getElementById('BackGround') as HTMLImageElement,
                    0,
                    0
                )
            }
            drawBackGround()

            for(let i=0;i<this.bullets.length;i++)
                this.bullets[i].draw(this.ctx)

            //Draw Client Player
            this.currentPlayer.draw(this.ctx,this.currentPlayer.x,this.currentPlayer.y,this.currentPlayer.angle,this.currentPlayer.width,this.currentPlayer.height)
            //Draw Other Player
            if(this.roomData){
                for(const player of this.roomData.players){
                    if(player.name!=store.getCurrentUser){
                        this.currentPlayer.drawPlayer(this.ctx,player.x,player.y,player.angle,this.currentPlayer.width,this.currentPlayer.height)
                    }
                }
            }

            this.ctx.restore()



            //Draw Cursor
            this.drawCursor()
        }
        drawCursor() {
            this.ctx.beginPath()
            this.ctx.strokeStyle = '#000000'
            this.ctx.arc(this.input.mouseX, this.input.mouseY, 5, 0, Math.PI * 2)
            this.ctx.stroke()
        }
        drawBackGroundDeprecated() {
            const backGroundX = Math.max(
                Math.min(0, canvas.width / 2 - this.currentPlayer.x),
                -(game.width - canvas.width)
            )
            const backGroundY = Math.max(
                Math.min(0, canvas.height / 2 - this.currentPlayer.y),
                -(game.height - canvas.height)
            )
            this.ctx.drawImage(
                document.getElementById('BackGround') as HTMLImageElement,
                backGroundX,
                backGroundY
            )
        }
    }
    const game = new Game(canvas,socket)

    function animate() {
        game.update()
        game.draw()
        requestAnimationFrame(animate)
    }
    animate()
}
