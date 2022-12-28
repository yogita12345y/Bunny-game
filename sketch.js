const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
function preload(){
  bgImg=loadImage("background.png")
  food=loadImage("melon.png")
  rabbit=loadImage("eat_1.png")
  blink=loadAnimation("blink_1.png","blink_2.png","blink_3.png")
  eat=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
  sad=loadAnimation("sad_1.png","sad_2.png","sad_3.png")
  blink.playing=true
  eat.playing=true
  eat.looping=false
  sad.looping=false
  sad.playing=true
  bgMusic=loadSound("sound1.mp3")
  sadSound=loadSound("sad.wav")
  cutSound=loadSound("rope_cut.mp3")
  eatSound=loadSound("eating_sound.mp3")
  air=loadSound("air.wav")
}

function setup() 
{
 var isMobile=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
 if(isMobile){
  w=displayWidth
  h=displayHeight
  createCanvas(w,h)
 }
 else{
  w=windowWidth
  h=windowHeight
  createCanvas(w,h)
 }
  frameRate(80);

  bgMusic.play()
  bgMusic.setVolume(0.05)
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,h,w,20);
  rope=new Rope(13,{x:130,y:33})

  rope2=new Rope(5,{x:w/2+30,y:43})
  rope3=new Rope(11,{x:w-200,y:233})

  fruit=Bodies.circle(300,300,15,{density:0.001})
  Composite.add(rope.body,fruit)
  link=new Link(rope,fruit)
  link2=new Link(rope2,fruit)
  link3=new Link(rope3,fruit)

  blink.frameDelay=20
  eat.frameDelay=20
  sad.frameDelay=20

  bunny=createSprite(170,h-80,100,100)
  bunny.addAnimation("blink",blink)
  bunny.addAnimation("eat",eat)
  bunny.addAnimation("sad",sad)
  bunny.scale=0.2

  button=createImg("cut_btn.png")
  button.position(100,30)
  button.size(50,50)
  button.mouseClicked(drop)

  button2=createImg("cut_btn.png")
  button2.position(w/2,40)
  button2.size(50,50)
  button2.mouseClicked(drop2)

  button3=createImg("cut_btn.png")
  button3.position(w-230,200)
  button3.size(50,50)
  button3.mouseClicked(drop3)
  
  muteButton=createImg("mute.png")
  muteButton.position(w-80,20)
  muteButton.size(50,50)
  muteButton.mouseClicked(mutebg)

  blower=createImg("balloon.png")
  blower.position(10,250)
  blower.size(150,100)
  blower.mouseClicked(airBlow)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(bgImg);
  ground.show();
  rope.show()
  rope2.show()
  rope3.show()
  Engine.update(engine);
  imageMode(CENTER)
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,60,60)

  }


  if(collide(fruit,bunny)==true){
    World.remove(world,fruit)
    fruit=null
    bunny.changeAnimation("eat")
    eatSound.play()
  }
  if(collide(fruit,ground.body)==true){
    bunny.changeAnimation("sad")
    bgMusic.stop()
    sadSound.play()
    fruit=null
  }
  drawSprites()
   
}
function drop(){
  cutSound.play()
  rope.break()
  link.break()
  link=null

  
}

function drop2(){
  cutSound.play()
  rope2.break()
  link2.break()
  link2=null

  
}

function drop3(){
  cutSound.play()
  rope3.break()
  link3.break()
  link3=null

  
}

function collide(a,b){
  if(a!=null){
    var d=dist (a.position.x,a.position.y,b.position.x,b.position.y)
    if(d<=80){
      return true
    }
    else{
      return false
    }
  }
}
function mutebg(){
  if(bgMusic.isPlaying()){
    bgMusic.stop()
  }
  else{
    bgMusic.play()
  }
}
function airBlow(){
  Matter.Body.applyForce(fruit,fruit.position,{x:0.01,y:0})
  air.play()
}