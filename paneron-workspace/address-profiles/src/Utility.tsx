import * as React from "react";
import yaml from "js-yaml";
import fs from 'fs';
import path from 'path';
import log from "electron-log"

Object.assign(console, log);

//RW yaml components
export function get_yaml(file_name: string) {
  try {
    //create data folder if not exist
    if (!fs.existsSync(`./yaml-data/`)) {
      fs.mkdirSync(`./yaml-data/`);
    }
    //create name.yml if not exist
    if (!fs.existsSync(`./yaml-data/${file_name}.yml`)) {
      output_yaml({}, file_name)
    }
    //log
    log.info("reading file:", path.resolve(`./`) + `/yaml-data/${file_name}.yml`);
    //return json format
    return yaml.load(fs.readFileSync(`./yaml-data/${file_name}.yml`, 'utf8'));
  } catch (e) {
    //error
    log.warn(e);
    return null;
  }
}

export function output_yaml(data: object, file_name: string) {
  try {
    //create data folder if not exist
    if (!fs.existsSync(`./yaml-data/`)) {
      fs.mkdirSync(`./yaml-data/`);
    }
    //log
    log.info("writing file:", path.resolve(`./`) + `/yaml-data/${file_name}.yml`);
    //writing data
    let yamlStr = yaml.dump(data);
    fs.writeFileSync(`./yaml-data/${file_name}.yml`, yamlStr, 'utf8');
  } catch (e) {
    //error
    log.warn(e);
  }
}


//small components
export function Title(props: any) {
  const divStyle = {
    backgroundColor: "rgb(69, 156, 145)",
    color: "rgb(255, 255, 255)",
    height: "21px",
    fontSize: "16px",
    width: "100%",
    paddingLeft: "5px",
  } as React.CSSProperties;

  return (<div style={divStyle}>{props.name}</div>);
}

export function DropDown(props: DropDownProps) {
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

export interface DropDownProps {
  content: any,
  onChange: any,
  items: any[]
}