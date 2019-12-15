import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



class Node  {

  constructor(props){
    this.x = props.X;
    this.y = props.Y;
    this.value = props.val;
  }

}

class ListItem{

  constructor(node){
    this.node = node;
    this.list = [];
  }

 

  pushNode(nodePush){
    this.list.push(nodePush);
  }
}


class AdjecencyList {

  constructor(){
    this.list = [];
  }

  addNode(node){
    this.list.push(new ListItem(node));
  }

  distPoints(x1 , y1 , x2 , y2){
      return Math.sqrt( (x2 - x1) * (x2 - x1)  + (y2 - y1) * (y2 - y1));
  }

  findNode(x ,y){
      this.list.forEach((elem) =>{
          if(this.distPoints(x , y , elem.node.x , elem.node.y) < 50){
            console.log(`find point with value ${elem.node.value}`);
          }
      });
  }
}
class App extends Component {

  state = {
    st : "oldState"
  }


  constructor(props){
    super(props);
    this.list = new AdjecencyList();
    document.addEventListener('contextmenu', function(event){
      event.preventDefault();});

    document.addEventListener('mousedown',(event)=>{
      if(event.which === 3){
        this.list.addNode(new Node({X:event.clientX , Y:event.clientY }));
      }

      if(event.which === 1){
       this.list.findNode(event.clientX  , event.clientY );
      }
      this.setState(()=>{
        console.log("update");
        return {st: "new State"};
      })
    });
   

  }
  
  renderLines(){

  }

  renderNodes(){
    console.log(this.list.list);
    return this.list.list.map(elem => (<div style={{
      position:"absolute" ,left :elem.node.x ,top:elem.node.y ,
      width:'100px',height: '100px',display:'block',
      background: "#AA2323",
      borderRadius: "100px",
      textAlign: "center"
    }}>0</div>));
  }


  updateCanvas(){
    console.log("updateCanvas");
    if(this.list.list.length != 0){
      const ctx = this.refs.canvas.getContext('2d');
      ctx.canvas.width  = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
      ctx.clearRect(0, 0,  this.refs.canvas.width,  this.refs.canvas.height);
      this.list.list.map( elem => {
        ctx.beginPath();
        ctx.arc(elem.node.x, elem.node.y, 50, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();
      });
    }
   
  }

  render(){
    this.updateCanvas();
     return (
    <canvas ref="canvas"></canvas>
    );
  }
}

export default App;
