import {Link} from 'react-router-dom';

let propTypes = {
    leftConut: PT.number,
    showClearButton: PT.bool,
    onClearCompleted: PT.func,
    pathname: PT.string
}

export default class Footer extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let {leftConut, onClearCompleted, showClearButton, pathname} = this.props;

        let clearBtn = null;
        if(showClearButton){
            clearBtn = (
                <button 
                    className="clear-completed"
                    onClick={onClearCompleted}
                >clear all completed</button>
            );
        }

        return(
            <footer className="footer">
                <span className="todo-count">
                    <strong>{leftConut}</strong>
                    <span>item left</span>
                </span>
                <ul className="filters">
                    <li>
                        <Link
                            to="/"
                            className={pathname === '/' ? 'selected' : ''}
                        >All</Link>
                    </li>
                    <li>
                        <Link
                            to="/active"
                            className={pathname === '/active' ? 'selected' : ''}
                        >Active</Link>
                    </li>
                    <li>
                        <Link
                            to="/completed"
                            className={pathname === '/completed' ? 'selected' : ''}
                        >Completed</Link>
                    </li>
                </ul>
                {clearBtn}
            </footer>
        );
    }
}

Footer.propTypes = propTypes;