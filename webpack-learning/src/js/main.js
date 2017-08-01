let React = require('react');
let Router = require('react-router');

let App = require('./component/app');
let Home = require('./component/home');
let About = require('./component/about');

let {DefaultRoute, Route, Routes} = Router;

let routes = (
		<Route name="app" path="/" handler={App}>
			<Route name="about" handler={About}/>
			<DefaultRoute name="home" handler={Home}/>
		</Route>
	);

if (__DEV__) {
  console.warn('Extra logging');
}
if (__PRERELEASE__) {
  showSecretFeature();
}

Router.run(routes,Router.HistoryLocation,function(Handler){
	React.render(<Handler/>,document.getElementById("app"))
})