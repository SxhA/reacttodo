export default class Item extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <li>
                <div className="view">
                    <input type="text" className="toggle"/>
                    <label>content</label>
                    <button className="destroy"></button>
                </div>
                <input type="text" className="edit"/>
            </li>
        );
    }
}