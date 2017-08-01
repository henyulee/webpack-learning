let React = require("react");
let {Link,RouteHandler} = require('react-router');

let Logo = require('../../image/logo.jpg');
let Style = require('../../css/common.css');

let App = React.createClass({
	render(){
		return (
			<div className={ Style.panel}>
				<header>
					<img src={Logo}/>
				</header>
				<ul>
					<li><Link to="home">Home</Link></li>
					<li><Link to="About">About</Link></li>
				</ul>
				<RouteHandler />
			</div>
		)
	}
});

module.export = App;