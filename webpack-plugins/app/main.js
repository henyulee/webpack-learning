
import React from "react";
import ReactDom from "react-dom";

import Greet from "./Greet";

//导入css文件
import "./main.css";

ReactDom.render(<Greet />,document.getElementById("greet"));

//document.getElementById("greet").innerHTML = "hello world!";