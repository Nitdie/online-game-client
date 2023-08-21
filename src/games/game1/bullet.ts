export class Bullet {
    private x: number;
    private y: number;
    private width:number;
    private height: number;
    private speed: number;
    private dx: number;
    private dy: number;
    private expirationTime: number;
    private expired:boolean;
    private image: HTMLImageElement;
    private angle: number;
    sound: HTMLAudioElement;
    constructor(x: number, y: number, angle: number, speed: number,expirationTime: number) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        // 可以根据角度和速度计算子弹的运动方向
        this.angle = angle
        this.dx = Math.cos(angle) * this.speed;
        this.dy = Math.sin(angle) * this.speed;
        this.expirationTime = expirationTime;
        this.expired = false
        this.width = this.height = 20
        this.image = document.getElementById('Missile1') as HTMLImageElement
        this.sound = document.getElementById('Missile1Shoot') as HTMLAudioElement
    }

    update() {
        if(!this.expired){
            // 更新子弹的位置
            this.x += this.dx;
            this.y += this.dy;

            this.expirationTime -= 16;
            if(this.expirationTime<=0)
                this.expired = true
        }

    }

    draw(ctx: CanvasRenderingContext2D) {
        if(!this.expired){
            // 绘制子弹
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle+Math.PI/2)
            ctx.drawImage(this.image,-this.width/2,-this.height/2,this.width,this.height)
            ctx.restore();

        }
    }
    playSound(){
        this.sound.currentTime = 0;
        this.sound.volume = 0.1
        this.sound.play()
    }

    isExpired(){
        return this.expired
    }
}
