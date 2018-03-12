let propTypes = {
    todo: PT.object,
    onDestroy: PT.func,
    onToggle: PT.func,
    itemEditDown: PT.func
}

export default class Item extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            inEdit: false,
            val: ''
        }

        this.onEdit = this.onEdit.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onEnter = this.onEnter.bind(this);
        this.itemEditDown = this.itemEditDown.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }

    inputChange(ev){
        this.setState({
            val: ev.target.value
        });
    }

    itemEditDown(){
        this.setState({
            inEdit: false
        });

        let{itemEditDown, todo} = this.props;
        itemEditDown(todo, this.state.val);
    }

    onBlur(){
        this.itemEditDown();
    }

    onEnter(ev){
        if(ev.keCode !== 13) return;
        this.itemEditDown();
    }
    
    onEdit(){
        let {value} = this.props.todo;
        this.setState({
            inEdit: true,
            val: value
        }, () => this.refs.editInput.focus()); 
    }

    render(){
        let {onEdit, onBlur, onEnter, inputChange} = this;

        let {todo, onDestroy, onToggle} = this.props;

        let {inEdit, val} = this.state;

        let itemClassName = '';

        if(inEdit) itemClassName += 'editing';
        
        return(
            <li className={itemClassName}>
                <div className="view">
                    <input 
                        type="checkbox" 
                        className="toggle"
                        checked={todo.hasCompleted}
                        onChange={ev => onToggle(todo)}
                    />
                    <label
                        onDoubleClick={onEdit}
                    >{todo.value}</label>
                    <button 
                        className="destroy"
                        onClick={ev => onDestroy(todo)}
                    ></button>
                </div>
                <input 
                    type="text" 
                    className="edit"
                    value={val}
                    onBlur={onBlur}
                    onKeyDown={onEnter}
                    onChange={inputChange}
                    ref='editInput'
                />
            </li>
        );
    }
}

Item.propTypes = propTypes;