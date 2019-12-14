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

  findNode(x ,y){

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
        this.list.addNode(new Node({X:event.clientX , Y:event.clientY}));
      }

      if(event.which === 1){
       this.list.findNode(event.clientX , event.clientY);
      }
      this.setState(()=>{
        console.log("update");
        return {st: "new State"};
      })
    });
   

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

  render(){
    let nodes = this.renderNodes();
    return(
      <div><button>clear</button>{nodes}</div>
    );
  } 
}

export default App;
