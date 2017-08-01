
import React,{Component} from "react";
import Config from "./config.json";

import style from "./component.css";

class Greet extends Component {
	reder(){
		return (
			<div className={style.title}>
				{Config.greetText}
			</div>
		);
	}
}

export default Greet;



