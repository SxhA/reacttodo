import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Item from 'components/Item';
import Footer from 'components/Footer';

require('style/base.css');
require('style/index.css');


export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            todosData: [],
            inputVal: '',
            view: 'all'
        }

        this.handleKeyDownPost = this.handleKeyDownPost.bind(this);
        this.onDestroy = this.onDestroy.bind(this);
        this.onClearCompleted = this.onClearCompleted.bind(this);
        this.inputChang = this.inputChang.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
        this.onToggle = this.onToggle.bind(this);
        this.changeView = this.changeView.bind(this);
        this.itemEditDown = this.itemEditDown.bind(this);
    }

    itemEditDown(todo, value){
        let {todosData} = this.state;
        todosData = todosData.map(elt => {
            if(todo.id === elt.id){
                elt.value = value;
            }
            return elt;
        });
    }

    changeView(view){
        this.setState({
            view
        });
    }

    inputChang(ev){
        this.setState({
            inputVal: ev.target.value
        });
    }

    handleKeyDownPost(ev){

        if(ev.keyCode !== 13) return;
        let {inputVal} = this.state;
        let value = inputVal.trim();
        if(value == '') return;

        let todo = {};
        todo.id = new Date().getTime();
        todo.value = value;
        todo.hasCompleted = false;

        let {todosData} = this.state;
        todosData.push(todo);
        this.setState({
            todosData,
            inputVal: '',
            view: 'all'
        });
    }

    toggleAll(ev){
        let {checked} = ev.target;
        let {todosData} = this.state;

        todosData = todosData.map(elt => {
            elt.hasCompleted = checked;
            return elt;
        });
        this.setState({
            todosData
        });
    }

    onToggle(todo){
        let {todosData} = this.state;
        todosData = todosData.map(elt => {
            if(elt.id === todo.id){
                elt.hasCompleted = !elt.hasCompleted;
            }
            return elt;
        });
        this.setState({
            todosData
        });
    }

    onDestroy(todo){
        
        let {todosData} = this.state;
        todosData = todosData.filter((elt ,i) => {
            return elt.id !== todo.id;
        });
        this.setState({
            todosData
        });
    }

    onClearCompleted(){
        let {todosData} = this.state;
        todosData = todosData.filter((elt ,i) => {
            return !elt.hasCompleted;
        });
        this.setState({
            todosData
        });
    }

    render(){
        let {handleKeyDownPost, onDestroy, onClearCompleted, inputChang, toggleAll, onToggle, changeView, itemEditDown} = this;

        let {todosData, inputVal, view} = this.state;
        let items = null,
            footer = null,
            itemsBox = null;
        let leftConut = todosData.length;
        items = todosData.filter(elt => {
            if(elt.hasCompleted) leftConut--;
            switch (view){
                case 'active':
                    return !elt.hasCompleted;
                case 'completed':
                    return elt.hasCompleted;  
                default:
                    return true;
            }
        });
        items = items.map((elt, i) => {
            return(
                <Item 
                    {...{
                        onDestroy,
                        todo: elt,
                        onToggle,
                        itemEditDown
                    }}
                    key={i}
                />
            );
        });

        if(todosData.length){
            itemsBox = (
                <section className="main">
                    <input 
                        type="checkbox" 
                        className="toggle-all"
                        checked={leftConut===0}
                        onChange={toggleAll}
                    />
                    <ul className="todo-list">
                        {items}
                    </ul>
                </section>
            );

            footer = (
                <Footer 
                    {...{
                        leftConut,
                        onClearCompleted,
                        showClearButton: leftConut < todosData.length,
                        changeView,
                        view
                    }}
                />
            );
        }

        return(
            <div>
                <header className="header">
                    <h1>todos</h1>
                    <input 
                        type="text" 
                        className="new-todo"
                        value={inputVal}
                        onChange={inputChang}
                        onKeyDown={handleKeyDownPost}    
                    />
                </header>
                {itemsBox}
                {footer}
            </div>
        );
    }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
