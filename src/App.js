import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



class Node  {



  constructor(props){
    this.x = props.X;
    this.y = props.Y;
    this.value = props.val;
    this.selected = false;
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
    let ind = null;
      this.list.forEach((elem , index) =>{
          if(this.distPoints(x , y , elem.node.x , elem.node.y) < 50){
            console.log(`find point with value ${elem.node.value}`);
            elem.node.selected = !elem.node.selected;
            ind = index; 
          }
      });
      return ind;
  }
}



class App extends Component {

 


  constructor(props){
    super(props);
    this. state = {
      selected : null,
      list : new AdjecencyList()
    };
    document.addEventListener('contextmenu', function(event){
      event.preventDefault();});

    document.addEventListener('mousedown',(event)=>{
      event.preventDefault();
      let oldSelected = this.state.selected;
      if(event.which === 3){
        this.state.list.addNode(new Node({X:event.clientX , Y:event.clientY }));
      }

      if(event.which === 1){
        let selected = this.state.list.findNode(event.clientX  , event.clientY);
        if(selected !== oldSelected && oldSelected != null){
          this.state.list.list[oldSelected].pushNode(this.state.list.list[selected].node);
          oldSelected = null;
        }else{
            oldSelected = selected;
        }
        
        console.log(selected);
      }
      this.setState(()=>{
        console.log("update");
        return {list : this.state.list , selected :oldSelected };
      })
    });
   

  }
  
  renderLines(){
    if(this.state.list.list.length != 0){
      const ctx = this.refs.canvas.getContext('2d');
      this.state.list.list.forEach((elem) =>{
        let node = elem.node;
        elem.list.forEach((elTo) =>{
          // ctx.beginPath();
          // ctx.moveTo(node.x, node.y);
          // ctx.lineTo(elTo.x , elTo.y);
          // ctx.lineWidth = 10;
          // ctx.stroke();
          this.canvas_arrow(ctx , node.x ,node.y , elTo.x , elTo.y);
          ctx.stroke();
        });
    });
    }
    
  }
  canvas_arrow(context, fromx, fromy, tox, toy) {
    var headlen = 20; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
  }
  renderNodes(){
    return this.state.list.list.map(elem => (<div style={{
      position:"absolute" ,left :elem.node.x ,top:elem.node.y ,
      width:'100px',height: '100px',display:'block',
      background: "#AA2323",
      borderRadius: "100px",
      textAlign: "center"
    }}>0</div>));
  }


  updateCanvas(){
    console.log("updateCanvas");
    if(this.state.list.list.length != 0){
      const ctx = this.refs.canvas.getContext('2d');
      ctx.canvas.width  = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
      ctx.clearRect(0, 0,  this.refs.canvas.width,  this.refs.canvas.height);
      this.state.list.list.map( (elem,index) => {
        ctx.beginPath();
        ctx.arc(elem.node.x, elem.node.y, 50, 0, 2 * Math.PI, false);

        if(index === this.state.selected){
          ctx.fillStyle = 'red';
        }else{
          ctx.fillStyle = 'green';
        }
        ctx.fill();
      });
    }
   
  }

  render(){
    this.updateCanvas();
    this.renderLines();
     return (
    <canvas ref="canvas"></canvas>
    );
  }
}

export default App;
