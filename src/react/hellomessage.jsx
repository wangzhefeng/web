// 简单组件
class HelloMessage extends React.Component {
    render() {
        return (
            <div>
                Hello {this.props.name}
            </div>
        );
    }
}
ReactDOM.render(
    <HelloMessage name="Taylor" />,
    document.getElementById("hello-example")
);



// 有状态组件
class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { seconds: 0 };
    }

    tick() {
        this.setState(state => ({
            seconds: state.seconds + 1
        }));
    }

    componentDidMount() {
        this.interval = serInterval(() => this.tick(), 1000);
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                Seconds: {this.state.seconds}
            </div>
        );
    }
}
ReactDOM.render(
    <Timer />,
    document.getElementById("timer-example")
);



// 应用
class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], text: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div>
                <h3>TODO</h3>
                <TodoList items={this.state.items} />
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="new-todo">
                        What needs to be done?
                    </label>
                    <input 
                        id="new-todo"
                        onChange={this.handleChange}
                        value={this.state.text}
                    />
                    <button>
                        Add #{this.state.items.length + 1}
                    </button>
                </form>
            </div>
        );
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.text.length === 0) {
            return;
        }
        const newItem = {
            text: this.state.text,
            id: Date.now()
        };
        this.setState(state => ({
            items: state.items.concat(newItem),
            text: ''
        }));
    }
}

class TodoList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.items.map(item => (
                    <li key={item.id}>{item.text}</li>
                ))}
            </ul>
        );
    }
}

ReactDOM.render(
    <TodoApp />,
    document.getElementById("todos-example")
);




// 在组件中使用外部插件
class MarkdownEditor extends React.Component {
    constructor(props) {
        super(props);
        this.md = new Remarkable();
        this.handleChange = this.handleChange.bind(this);
        this.state = { value: 'Hello, **world**!' };
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    getRawMarkup() {
        return { __html: this.md.render(this.state.value) };
    }

    render() {
        return (
            <div className="MarkdownEditor">
            <h3>Input</h3>
            <label htmlFor="markdown-content">
                Enter some markdown
            </label>
            <textarea
                id="markdown-content"
                onChange={this.handleChange}
                defaultValue={this.state.value}
            />
            <h3>Output</h3>
            <div
                className="content"
                dangerouslySetInnerHTML={this.getRawMarkup()}
            />
            </div>
        );
    }
}
ReactDOM.render(
    <MarkdownEditor />,
    document.getElementById("markdown-example")
);