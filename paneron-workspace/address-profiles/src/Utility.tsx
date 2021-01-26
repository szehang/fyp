import * as React from "react";

//small components
export function Title(props: any) {
    const divStyle = {
      backgroundColor: "rgb(69, 156, 145)",
      color: "rgb(255, 255, 255)",
      height: "19px",
      fontSize: "16px",
      width: "100%",
      paddingLeft: "5px",
    } as React.CSSProperties;
  
    return (<div style={divStyle}>{props.name}</div>);
  }
  
export function DropDown(props: any) {
    const divStyle = {
        height: "24px",
        fontSize: "18px",
        width: "90%",
    } as React.CSSProperties;

    const makeItem = function (x: string) {
        return <option value={x}>{x}</option>
    }
    
    return <select style={divStyle}>{props.data.map(makeItem)}</select>
}
  