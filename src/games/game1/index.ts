import { Player } from './player'
import { InputHandler } from './input'

export function gameSetUp(canvas: HTMLCanvasElement) {
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
        constructor(canvas: HTMLCanvasElement) {
            this.canvas = canvas
            this.ctx = canvas.getContext('2d')!
            this.width = 1200 //1200
            this.height = 1200
            // this.players = []
            // this.players.push(new Player(this))
            this.currentPlayer = new Player(this)
            this.mouseX = this.mouseY = 0
            this.input = new InputHandler(canvas)
            this.input.mouseX = this.currentPlayer.x
            this.input.mouseY = this.currentPlayer.y
        }
        update() {
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

            this.currentPlayer.update(this.input)
            updateBullets()

90        }

        draw() {
            this.ctx.clearRect(0, 0, this.width, this.height)

            //Draw Background
            this.drawBackGround()

            for(let i=0;i<this.bullets.length;i++)
                this.bullets[i].draw(this.ctx)
            //Draw Player
            this.currentPlayer.draw(this.ctx)

            //Draw Cursor
            this.drawCursor()
        }
        drawCursor() {
            this.ctx.beginPath()
            this.ctx.strokeStyle = '#000000'
            this.ctx.arc(this.input.mouseX, this.input.mouseY, 5, 0, Math.PI * 2)
            this.ctx.stroke()
        }
        drawBackGround() {
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
    const game = new Game(canvas)

    function animate() {
        game.update()
        game.draw()
        requestAnimationFrame(animate)
    }
    animate()
}
