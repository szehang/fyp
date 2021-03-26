import { AnchorButton, Code, Collapse, Divider, InputGroup, Tab, TabId, Tabs } from "@blueprintjs/core";

import { stat } from "fs";
import React from "react";
import { AddressClassProfile, AddressComponentProfile, AddressProfile, FormTemplate } from "./AddressProfile";


import log from "electron-log"
import { info, table } from "console";
import { execPath, listeners } from "process";
import { parse } from "path";
Object.assign(console, log);

export class LayoutPanel extends React.Component<LayoutPanelProps, any> {
    constructor(props:any){
        super(props);
        this.state={
            currentClassProfile: null,
            currentAddressProfile: this.props.currentAddressProfile,
            changeStateHandler: this.props.changeStateHandler,

            selectedTabId: "formTemplate",
        }
    }

    render(){
        return (
            <div style={{margin:"5px"}}>
                <div style={{borderRadius: "5px", backgroundColor: "#FFF", padding:"5px",}}>
                    <div>
                        <span style={{fontSize:"16px",}}>Address Class Profile:&nbsp;</span>
                        <select style={{display:"inline",}} value={this.state.currentClassProfile? this.state.currentClassProfile.id: this.state.currentClassProfile} onChange={(event)=>{this.changeCurrentClassProfile(event.target.value)}}>
                            <option value={""} disabled selected>Select Class Profile</option>
                            {
                                this.props.currentAddressProfile.addressProfiles.map((addressClassProfile)=>(
                                    <option key={addressClassProfile.id} value={addressClassProfile.id}>{addressClassProfile.id}</option>
                                ))
                            }
                        </select>
                        <div style={{display:"inline"}}><Code>{this.state.currentClassProfile != null? this.state.currentClassProfile.id: "null"}</Code></div>
                    </div>
                    <Collapse isOpen={this.state.currentClassProfile!=null}>
                        <Tabs selectedTabId={this.state.selectedTabId} id={"LayoutPanelTabs"} renderActiveTabPanelOnly={true} onChange={(tabId: TabId)=>{this.setState({selectedTabId: tabId})}}>
                            <Tab id={"formTemplate"} title={"Form Template"} panel={<FormTemplatePanel currentAddressProfile={this.state.currentAddressProfile} currentClassProfile={this.state.currentClassProfile} changeStateHandler={this.state.changeStateHandler} />}></Tab>
                            <Tab id={"displayTemplate"} title={"Display Template"} panel={<DisplayTemplatePanel />}></Tab>
                        </Tabs>
                    </Collapse>
                </div>
            </div>
        )
    }

    changeCurrentClassProfile(profileId: string | null) {
        if(profileId != null){
            this.props.currentAddressProfile.addressProfiles.forEach((addressClassProfile)=>{
                if(addressClassProfile.id == profileId){
                    this.setState({currentClassProfile: addressClassProfile});
                }
            });
        }
    }
}

class FormTemplatePanel extends React.Component<FormTemplatePanelProps, any>{
    constructor(props:any){
        super(props);
        this.state={
            currentAddressProfile : this.props.currentAddressProfile,
            currentClassProfile: this.props.currentClassProfile,
            changeStateHandler: this.props.changeStateHandler,
            currentFormTemplate: null,

            isFormOpen: false,

            //form input
            id: "",
            name: "",
            description: "",
            localization: {locale: "", script: "", writingSystem: "", textDirection: "leftToRightTopToBottom"},
        }
    }

    handleFormOpen() {
        this.setState({isFormOpen: !this.state.isFormOpen});
    }

    handleTextDirectionChange(verticalValue:string|null, horizontalValue:string|null, callBack: any) {
        let oldVerticalValue = "";
        let oldHorizontalValue = "";

        let textDirection = this.state.localization.textDirection;

        textDirection.includes("TopToBottom")
        ? oldVerticalValue = "TopToBottom"
        : oldVerticalValue = "BottomToTop"

        textDirection.includes("leftToRight")
        ? oldHorizontalValue = "leftToRight"
        : oldHorizontalValue = "rightToLeft"

        if(verticalValue){
            oldVerticalValue = verticalValue;
        }else if(horizontalValue){
            oldHorizontalValue = horizontalValue;
        }

        this.setState({localization: {...this.state.localization, textDirection: oldHorizontalValue + oldVerticalValue}});
    }

    handleEditFormTemplate(formId:string | null){
        if(formId == null) {
            this.setState({currentFormTemplate: null});
        } else {
            this.state.currentClassProfile.formTemplates.forEach((formTemplate:any) => {
                if(formTemplate.id == formId) {
                    this.setState({currentFormTemplate: formTemplate});
                }
            });
        }
    }

    updateCurrentClassProfile(currentClassProfile:any){
        this.setState({currentClassProfile: currentClassProfile});
    }

    createTemplate() {

        const newCurrentClassProfile = JSON.parse(JSON.stringify(this.state.currentClassProfile));

        let isIdUsed = false;

        newCurrentClassProfile.formTemplates.forEach(item => {
            if(item.id == this.state.id) {
                isIdUsed = true;
            }
        });

        if(isIdUsed) {
            alert("\"" + this.state.id + "\"" + " is being used.\nTry another one");
            return;
        }

        const formTemplate = {
            id: this.state.id,
            name : this.state.name,
            description: this.state.description,
            localization: this.state.localization,
            dimensions: [],
            orientation: null,
            lines:[],
        }

        newCurrentClassProfile.formTemplates.splice(newCurrentClassProfile.length, 0 , formTemplate)

        this.state.changeStateHandler("class", "edit", newCurrentClassProfile);

        this.setState({
            isFormOpen: false,
            currentClassProfile: newCurrentClassProfile,

            //form input
            id: "",
            name: "",
            description: "",
            localization: {locale: "", script: "", writingSystem: "", textDirection: "leftToRightTopToBottom"},
        });
    }

    render(){
        return(
            <>
            <Collapse isOpen={this.state.currentClassProfile != null && this.state.currentFormTemplate==null}>
            <div style={{borderRadius: "5px", backgroundColor: "#15B371",}}>
                <Collapse isOpen={!this.state.isFormOpen}>
                    {
                        this.state.currentClassProfile.formTemplates.length == 0
                        ? <>there is no existing form template</>
                        : <></>
                    }
                    {
                        this.state.currentClassProfile.formTemplates.map((form:any)=>(
                            <div key={form.id} style={{padding:"5px", display:"flex", justifyContent:"space-between"}}>
                                <div style={{textOverflow:"ellipsis", whiteSpace:"nowrap", width:"30%", overflow:"hidden"}}>{form.id}: {form.name}</div>
                                <div style={{textOverflow:"ellipsis", whiteSpace:"nowrap", width:"30%", overflow:"hidden"}}>{form.description}</div>
                                <div>
                                    <AnchorButton text={"edit"} onClick={()=>{this.handleEditFormTemplate(form.id)}}/>
                                    <AnchorButton text={"delete"}/>
                                </div>
                            </div>
                        ))
                    }
                    

                </Collapse>
                {this.state.isFormOpen
                    ?<div style={{borderRadius: "5px", padding:"5px", textAlign:"center" ,backgroundColor:"#FF7373", cursor:"pointer"}} onClick={()=>{this.handleFormOpen()}}>Discard New Template</div>
                    :<div style={{borderRadius: "0 0 5px 5px", padding:"5px", textAlign:"center" ,backgroundColor:"#3DCC91", cursor:"pointer"}} onClick={()=>{this.handleFormOpen()}}>New Template</div>
                }
                <Collapse isOpen={this.state.isFormOpen}>
                    <div style={{padding:"5px"}}>
                        <table>
                            <tr>
                                <td>ID</td>
                                <td>:</td>
                                <td>
                                    <InputGroup value={this.state.id} onChange={(event:any)=>{this.setState({id: event.target.value})}}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>:</td>
                                <td>
                                    <InputGroup value={this.state.name} onChange={(event:any)=>{this.setState({name: event.target.value})}}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>:</td>
                                <td>
                                    <InputGroup value={this.state.description} onChange={(event:any)=>{this.setState({description: event.target.value})}}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Localization</td>
                                <td>:</td>
                                <td style={{padding:"0"}}>
                                    <table>
                                        <tr>
                                            <td>Locale</td>
                                            <td>:</td>
                                            <td style={{padding:"0"}}>
                                                <InputGroup value={this.state.localization.locale}
                                                    onChange={(event:any)=>{
                                                        this.setState({localization: {...this.state.localization, locale: event.target.value,}})}
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Script</td>
                                            <td>:</td>
                                            <td style={{padding:"0"}}>
                                                <InputGroup value={this.state.localization.script}
                                                        onChange={(event:any)=>{
                                                            this.setState({localization: {...this.state.localization, script: event.target.value,}})}
                                                        }
                                                    />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Writing System</td>
                                            <td>:</td>
                                            <td style={{padding:"0"}}>
                                                <InputGroup value={this.state.localization.writingSystem}
                                                        onChange={(event:any)=>{
                                                            this.setState({localization: {...this.state.localization, writingSystem: event.target.value,}})}
                                                        }
                                                    />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Text Direction</td>
                                            <td>:</td>
                                            <td style={{padding:"0"}}>
                                                <select
                                                    style={{width:"130px"}}
                                                    value={this.state.localization.textDirection.includes("TopToBottom")?"TopToBottom":"BottomToTop"}
                                                    onChange={(event)=>{this.handleTextDirectionChange(event.target.value, null, this.forceUpdate.bind(this))}}
                                                >
                                                    <option value="TopToBottom">Top to Bottom</option>
                                                    <option value="BottomToTop">Bottom to Top</option>
                                                </select>
                                                <select
                                                    style={{width:"130px", marginLeft:"5px"}}
                                                    value={this.state.localization.textDirection.includes("leftToRight")?"leftToRight":"rightToLeft"} 
                                                    onChange={(event)=>{this.handleTextDirectionChange(null,event.target.value, this.forceUpdate.bind(this))}} 
                                                >
                                                    <option value="leftToRight">Left to Right</option>
                                                    <option value="rightToLeft">Right to Left</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div style={{borderRadius: "0 0 5px 5px", padding:"5px", textAlign:"center", backgroundColor:"#999", cursor:"pointer"}} onClick={()=>{this.createTemplate()}}>Create Template</div>
                </Collapse>     
            </div>
            </Collapse>
            {
                this.state.currentFormTemplate != null && this.state.currentClassProfile != null
                ?
                    <div style={{borderRadius: "5px", backgroundColor: "#15B371",marginTop:"5px",}}>
                        <Collapse isOpen={true}>{/*debug mode*/}
                                <FormTemplateEditPanel 
                                    currentAddressProfile={this.state.currentAddressProfile} 
                                    currentClassProfile={this.state.currentClassProfile} 
                                    currentFormTemplate={this.state.currentFormTemplate}
                                    changeStateHandler={this.state.changeStateHandler}
                                    handleEditFormTemplate={this.handleEditFormTemplate.bind(this)}
                                    updateCurrentClassProfile={this.updateCurrentClassProfile.bind(this)}
                                />
                        </Collapse>
                    </div>
                :<></>
            }
            </>
        )
    }
}

class FormTemplateEditPanel extends React.Component<any, any>{
    constructor(props:any){
        super(props);

        // this.state={
        //     currentAddressProfile: this.props.currentAddressProfile,
        //     currentClassProfile: this.props.currentClassProfile,
        //     currentFormTemplate: this.props.currentFormTemplate,
        // }

        var lines: any[]=[];
        if(this.props.currentFormTemplate.lines.length === 0) {
            //auto fill all component to the array
            this.props.currentClassProfile.componentProfiles.forEach((componentPointer:any)=>{
                this.props.currentAddressProfile.componentProfiles.forEach((componentProfile:any) => {
                    if(componentProfile.key == componentPointer.addressComponentProfileKey) {
                        const newStaticText = componentProfile.key;
                        const newData = componentProfile.example;

                        const newLine = {elements: [
                            {componentKeyBelongTo: componentProfile.key, type: "staticText", element: {value: newStaticText},},
                            {componentKeyBelongTo: componentProfile.key, type: "data", element: {value: newData},},
                        ]};

                        lines.splice(lines.length, 0, newLine);
                    }
                });
            });
        } else {
            lines = this.props.currentFormTemplate.lines;
        }

        // convert to 2d array START
        var lines2d: any[][] = [];
        var rowMax=0;
        var colMax=0;
        lines.forEach(line => {
            var aLine: any[] = [];
            var colCount = 0;
            line.elements.forEach((element:any) => {
                var aElement;
                aElement = element;
                aLine.push(aElement);
                colCount++;
            });
            if(colCount > colMax){
                colMax = colCount;
            }
            lines2d.push(aLine);
            rowMax++;
        });

        //onDragStart Event handler
        const startDrag = (ev:any) => {
            console.log("Start Dragging...");
            console.log("   Dragging ID is => " + ev.target.id);
            ev.dataTransfer.setData("drag-item", ev.target.id);
        }

        // onDragOver Event handler
        const dragOver = (ev:any) => {
            ev.preventDefault();
        }

        // onDrop Event handler
        const drop = (ev:any) => {
            console.log("Dropped...");
            console.log("   Dropped ID is => " + ev.target.id);

            const draggingItemID = ev.dataTransfer.getData("drag-item");
            const droppedID = ev.target.id;

            let newTable = this.state.table.map((x:any)=>x);
            let dragItemI = 0, dragItemJ = 0, dropItemI = 0, dropItemJ = 0, temp = null;

            newTable.forEach((element:any, i:any) => {
                element.props.children.forEach((child:any, j:any) => {
                    // Find their coordinates in state.table first
                    if (draggingItemID === child.props.id) {
                        dragItemI = i;
                        dragItemJ = j;
                    }

                    if (droppedID === child.props.id) {
                        dropItemI = i;
                        dropItemJ = j;
                    }

                });
            });

            // Swap them 
            // let newLines2d = this.state.lines2d.map((x:any)=>x);
            // let tempElement = newLines2d[dragItemI][dragItemJ];
            // // log.info("tempElement:" + tempElement.componentKeyBelongTo);
            // newLines2d[dragItemI][dragItemJ] = newLines2d[dropItemI][dropItemJ];
            // newLines2d[dropItemI][dropItemJ] = tempElement;
            // // console.log("newLines2d:" + newLines2d);

            temp = newTable[dragItemI].props.children[dragItemJ];
            newTable[dragItemI].props.children[dragItemJ] = newTable[dropItemI].props.children[dropItemJ];
            newTable[dropItemI].props.children[dropItemJ] = temp;

            // Update this.state.table
            var dummy = <></>;
            this.setState({table: dummy}, ()=>{this.setState({table: newTable})});
        }

        var table=[];
        for(let i=0; i<rowMax; i++) {
            var row=[];
            const previewTdStyle = {
                padding: "5px 20px",
                borderRadius: "10px",
                textAlign: "center",
                backgroundColor: "white",
                cursor: "grab",
            } as React.CSSProperties;
            
            for(let j=0; j < colMax; j++) {
                const id=(i+1).toString() + "," + (j+1).toString();

                if(lines2d[i][j]!=undefined){
                    let child;
                    let componentKeyBelongTo = lines2d[i][j].componentKeyBelongTo;
                    let type = lines2d[i][j].type;
                    let element = lines2d[i][j].element;

                    if(lines2d[i][j].type == "staticText") {
                        child = <>{lines2d[i][j].element.value}</>;
                    }else if (lines2d[i][j].type == "data") {
                        if (this.getComponentType(lines2d[i][j].componentKeyBelongTo) == "number") {
                            child = <input style={{cursor:"grab"}} type="number" placeholder={lines2d[i][j].element.value} />
                        }else {
                            child = <input style={{cursor:"grab"}} type="text" placeholder={lines2d[i][j].element.value} />
                        }
                    }else {
                        child = <></>;
                    }

                    const newTd = React.createElement("td", {
                        id: id, 
                        children: child, 
                        style: previewTdStyle, 
                        draggable: true, 
                        onDragStart: startDrag, 
                        onDragOver: dragOver, 
                        onDrop: drop,
                        componentKeyBelongTo: componentKeyBelongTo,
                        type: type,
                        element: element,
                    })

                    row.push(newTd);
                } else {
                    row.push(<td id={id} style={previewTdStyle} draggable={true}><pre>    </pre></td>);
                }
            }
           table.push(<tr>{row}</tr>);
        }
        log.info(table);

        // convert to 2d array END

        this.state={
            currentAddressProfile: this.props.currentAddressProfile,
            currentClassProfile: this.props.currentClassProfile,
            currentFormTemplate: {...this.props.currentFormTemplate, lines: lines},
            
            changeStateHandler: this.props.changeStateHandler,
        
            rowMax: rowMax,
            colMax: colMax,

            lines2d: lines2d,
            table: table,
        }
    }

    // componentDidMount() {
    // }

    // componentWillReceiveProps() {
    //     
    // }

    componentDidUpdate(prevProps:any, prevState:any) {
        log.info("updated:"+this.state.currentFormTemplate.lines);

        var lines = JSON.parse(JSON.stringify(this.state.currentFormTemplate.lines));
        var lines2d: any[][] = [];
        var rowMax=0;
        var colMax=0;
        lines.forEach((line:any) => {
            var aLine: any[] = [];
            var colCount = 0;
            line.elements.forEach((element:any) => {
                var aElement;
                aElement = element;
                aLine.push(aElement);
                colCount++;
            });
            if(colCount > colMax){
                colMax = colCount;
            }
            lines2d.push(aLine);
            rowMax++;
        });

         //onDragStart Event handler
         const startDrag = (ev:any) => {
            console.log("Start Dragging...");
            console.log("   Dragging ID is => " + ev.target.id);
            ev.dataTransfer.setData("drag-item", ev.target.id);
        }

        // onDragOver Event handler
        const dragOver = (ev:any) => {
            ev.preventDefault();
        }

        // onDrop Event handler
        const drop = (ev:any) => {
            console.log("Dropped...");
            console.log("   Dropped ID is => " + ev.target.id);

            const draggingItemID = ev.dataTransfer.getData("drag-item");
            const droppedID = ev.target.id;

            let newTable = this.state.table.map((x:any)=>x);
            let dragItemI = 0, dragItemJ = 0, dropItemI = 0, dropItemJ = 0, temp = null;

            newTable.forEach((element:any, i:any) => {
                element.props.children.forEach((child:any, j:any) => {
                    // Find their coordinates in state.table first
                    if (draggingItemID === child.props.id) {
                        dragItemI = i;
                        dragItemJ = j;
                    }

                    if (droppedID === child.props.id) {
                        dropItemI = i;
                        dropItemJ = j;
                    }

                });
            });

            // Swap them 
            // let newLines2d = this.state.lines2d.map((x:any)=>x);
            // let tempElement = newLines2d[dragItemI][dragItemJ];
            // // log.info("tempElement:" + tempElement.componentKeyBelongTo);
            // newLines2d[dragItemI][dragItemJ] = newLines2d[dropItemI][dropItemJ];
            // newLines2d[dropItemI][dropItemJ] = tempElement;
            // // console.log("newLines2d:" + newLines2d);

            temp = newTable[dragItemI].props.children[dragItemJ];
            newTable[dragItemI].props.children[dragItemJ] = newTable[dropItemI].props.children[dropItemJ];
            newTable[dropItemI].props.children[dropItemJ] = temp;

            // Update this.state.table
            var dummy = <></>;
            this.setState({table: dummy}, ()=>{this.setState({table: newTable})});
        }


        var table=[];
        for(let i=0; i<rowMax; i++) {
            var row=[];
            const previewTdStyle = {
                padding: "5px 20px",
                borderRadius: "10px",
                textAlign: "center",
                backgroundColor: "white",
                cursor: "grab",
            } as React.CSSProperties;
            
            for(let j=0; j < colMax; j++) {
                const id=(i+1).toString() + "," + (j+1).toString();

                if(lines2d[i][j]!=undefined){
                    let child;
                    let componentKeyBelongTo = lines2d[i][j].componentKeyBelongTo;
                    let type = lines2d[i][j].type;
                    let element = lines2d[i][j].element;

                    if(lines2d[i][j].type == "staticText") {
                        child = <>{lines2d[i][j].element.value}</>;
                    }else if (lines2d[i][j].type == "data") {
                        if (this.getComponentType(lines2d[i][j].componentKeyBelongTo) == "number") {
                            child = <input style={{cursor:"grab"}} type="number" placeholder={lines2d[i][j].element.value} />
                        }else {
                            child = <input style={{cursor:"grab"}} type="text" placeholder={lines2d[i][j].element.value} />
                        }
                    }else {
                        child = <></>;
                    }

                    const newTd = React.createElement("td", {
                        id: id, 
                        children: child, 
                        style: previewTdStyle, 
                        draggable: true, 
                        onDragStart: startDrag, 
                        onDragOver: dragOver, 
                        onDrop: drop,
                        componentKeyBelongTo: componentKeyBelongTo,
                        type: type,
                        element: element,
                    })

                    row.push(newTd);
                } else {
                    row.push(<td id={id} style={previewTdStyle} draggable={true}><pre>    </pre></td>);
                }
            }
           table.push(<tr>{row}</tr>);
        }
        if(JSON.stringify(prevState.lines2d)!=JSON.stringify(lines2d)){
            this.setState({lines2d: lines2d, table:table});
        }

    }


    handleUpdate(targetComponentKey: string, type: string, data: string) {
        var newFormTemplate = JSON.parse(JSON.stringify(this.state.currentFormTemplate));

        newFormTemplate.lines.forEach((line:any) => {
            line.elements.forEach((lineElement:any)=>{
                if(lineElement.componentKeyBelongTo == targetComponentKey && lineElement.type == type) {
                    lineElement.element.value = data;
                }
            });
        });
        // log.info(newFormTemplate.lines);
        // this.setState({currentFormTemplate: newFormTemplate});
        this.setState({currentFormTemplate: {...this.state.currentFormTemplate, lines: newFormTemplate.lines}}, ()=>{log.info(this.state.currentFormTemplate.lines)});
        // const dummy = {};
        // const newCurrentFormTemplate = {...this.state.currentFormTemplate, lines: newFormTemplate.lines};
        // this.setState({currentFormTemplate: dummy}, ()=>{this.setState({currentFormTemplate: newCurrentFormTemplate})});
    }

    getComponentType(componentKey: string) {
        var result = "string"

        this.props.currentAddressProfile.componentProfiles.forEach((componentProfile:any) => {
            if(componentProfile.key == componentKey) {
                var type = "number";
                componentProfile.attributeProfiles.forEach((attributeProfilePointer:any)=>{
                    this.props.currentAddressProfile.attributeProfiles.forEach((attributeProfile:any) => {
                        if(attributeProfile.name == attributeProfilePointer.attributeProfileName){
                            if(attributeProfile.valueType != "number"){
                                type = "string";
                            }
                        }
                    });
                });
                result = type;
            }
        });
        return result;
    }

    render() {
        const itemStyle = {
            marginTop: "10px",
            borderRadius: "5px",
            background: "#FFFFFF",
        } as React.CSSProperties;
    
        const itemHeadStyle = {
            padding: "7px 5px 30px 5px",
            height: "15px",
            fontSize: "20px",
            width: "100%",
        } as React.CSSProperties;
    
        const itemHeadButtonStyle = {
            padding: "5px",
            float: "right",
        } as React.CSSProperties;
    
        const itemHrStyle = {
            width: "100%",
            margin: "0 0 7px 0",
            clear: "both",
        } as React.CSSProperties;
    
        const itemBodyStyle = {
            padding: "5px",
            width: "100%",
        } as React.CSSProperties;
    
        const rightDivStyle = {
            float: "right",
        } as React.CSSProperties;
    
        const subSubItemSytle = {
            backgroundColor: "#3DCC91",
            marginLeft: "5px",
            marginRight: "5px", 
            // color: "#FFF",
        } as React.CSSProperties;
    
        const subSubItemHeadStyle = {
            padding: "10px 5px 5px",
            fontSize: "15px",
            height: "unset",
        } as React.CSSProperties;
    
        const subSubitemBodyStyle = {
            fontSize: "15px",
        } as React.CSSProperties;

        const previewTdStyle = {
            padding: "5px 20px",
            borderRadius: "10px",
            textAlign: "center",
            backgroundColor: "white",
            cursor: "grab",
        } as React.CSSProperties;

        const startDrag = (ev:any) => {
            console.log("Start Dragging...");
            console.log("   Dragging ID is => " + ev.target.id);
            ev.dataTransfer.setData("drag-item", ev.target.id);
        }

        // onDragOver Event handler
        const dragOver = (ev:any) => {
            ev.preventDefault();
        }

        // onDrop Event handler
        const drop = (ev:any) => {
            console.log("Dropped...");
            console.log("   Dropped ID is => " + ev.target.id);

            const draggingItemID = ev.dataTransfer.getData("drag-item");
            const droppedID = ev.target.id;

            let newTable = this.state.table.map((x:any)=>x);
            let dragItemI = 0, dragItemJ = 0, dropItemI = 0, dropItemJ = 0, temp = null;

            newTable.forEach((element:any, i:any) => {
                element.props.children.forEach((child:any, j:any) => {
                    // Find their coordinates in state.table first
                    if (draggingItemID === child.props.id) {
                        dragItemI = i;
                        dragItemJ = j;
                    }

                    if (droppedID === child.props.id) {
                        dropItemI = i;
                        dropItemJ = j;
                    }

                });
            });

            // Swap them 
            // let newLines2d = this.state.lines2d.map((x:any)=>x);
            // let tempElement = newLines2d[dragItemI][dragItemJ];
            // // log.info("tempElement:" + tempElement.componentKeyBelongTo);
            // newLines2d[dragItemI][dragItemJ] = newLines2d[dropItemI][dropItemJ];
            // newLines2d[dropItemI][dropItemJ] = tempElement;
            // // console.log("newLines2d:" + newLines2d);
            
            temp = newTable[dragItemI].props.children[dragItemJ];
            newTable[dragItemI].props.children[dragItemJ] = newTable[dropItemI].props.children[dropItemJ];
            newTable[dropItemI].props.children[dropItemJ] = temp;

            // Update this.state.table
            var dummy = <></>;
            this.setState({table: dummy}, ()=>{this.setState({table: newTable})});
        }

        const handleAddRow = () => {
            var newRow = [];
            let rowMax = this.state.table.length;
            for(let i = 0; i < this.state.table[0].props.children.length; i++){
                const id = (rowMax + 1).toString() + "," + (i+1).toString()
                newRow.push(React.createElement("td", {id:id, style: previewTdStyle, children: "\xa0\xa0\xa0\xa0\xa0", draggable: true, onDragStart: startDrag, onDragOver: dragOver, onDrop: drop}));
            }
            this.setState({
                table: [...this.state.table, <tr>{newRow}</tr>]
            })

            // let newLines2d = this.state.lines2d.map((x:any)=>x);
            // //todo
        }

        const handleAddCol = () => {

            let newTable = this.state.table.map((x:any)=>x);
            newTable.forEach((element: React.ReactElement<any>, index:any) => {
                let colMax = element.props.children.length;
                const id = (index+1).toString() + "," + (colMax + 1).toString()
                const newTD = React.createElement("td", {id:id, style: previewTdStyle, children: "\xa0\xa0\xa0\xa0\xa0", draggable: true, onDragStart: startDrag, onDragOver: dragOver, onDrop: drop});

                element.props.children.push(newTD);
            })
            console.log(newTable);

            var dummy = <></>;
            this.setState({table: dummy}, ()=>{this.setState({table: newTable})});

            // let newLines2d = this.state.lines2d.map((x:any)=>x);
            // //todo
        }

        const handelSaveChange = () => {
            //scan table
            let newLines: { elements: any[]; }[] = [];
            let rowSize = 0;
            let colSize = 0;
            this.state.table.forEach((tr: React.ReactElement<any>, rowIndex:any) => {
                let newLineElements: { componentKeyBelongTo: any; type: any; element: any; }[] = [];
                colSize = 0;
                tr.props.children.forEach((td: React.ReactElement<any>, colIndex:any)=>{
                    if(td.props.componentKeyBelongTo != undefined) {
                        let componentKeyBelongTo = td.props.componentKeyBelongTo;
                        let type = td.props.type;
                        let element = td.props.element;

                        newLineElements.push({componentKeyBelongTo: componentKeyBelongTo, type: type, element: element});
                    } else {
                        let componentKeyBelongTo = null;
                        let type = "staticText";
                        let element = {value: "\xa0\xa0\xa0\xa0\xa0"};

                        newLineElements.push({componentKeyBelongTo: componentKeyBelongTo, type: type, element: element});
                    }
                    colSize++;
                });
                let newLine = {elements: newLineElements};
                newLines.push(newLine);
                rowSize++;
            });

            let isRowsEmpty = Array(rowSize).fill(true);
            let isColsEmpty = Array(colSize).fill(true);
            newLines.forEach((line, rowIndex)=>{
                let isEmtyRow = true;
                line.elements.forEach((element, colIndex) => {
                    if(element.componentKeyBelongTo != null) {
                        isColsEmpty[colIndex] = false;
                        isEmtyRow = false;
                    }
                });
                isRowsEmpty[rowIndex] = isEmtyRow;
            });

            newLines.forEach((line, rowIndex)=>{
                if(isRowsEmpty[rowIndex])
                newLines.splice(rowIndex, 1);
                line.elements.forEach((element, colIndex) => {
                   if(isColsEmpty[colIndex]) {
                       line.elements.splice(colIndex, 1, {trim: true});
                   } 
                }); 
            }); 
            newLines.forEach((line, rowIndex)=>{
                line.elements.forEach((element, colIndex) => {
                   if(element.trim != undefined) {
                        line.elements.splice(colIndex, 1);
                   } 
                }); 
            });

            
            let newClassProfile = JSON.parse(JSON.stringify(this.state.currentClassProfile));
            let newFormTemplate = null;
            newClassProfile.formTemplates.forEach((formTemplate:any)=>{
                if(formTemplate.id == this.state.currentFormTemplate.id) {
                    formTemplate.lines = newLines;
                    newFormTemplate = formTemplate;
                }
            });

            //trim empyt row and column
            //todo

            console.log("newClassProfile:" + JSON.stringify(newClassProfile, null, 2));

            //update root state
            this.state.changeStateHandler("class", "edit", newClassProfile);
            this.props.updateCurrentClassProfile(newClassProfile);

            //update local state
            this.setState({
                currentClassProfile: newClassProfile,
                currentFormTemplate: newFormTemplate,
            });

            //update ui
            this.props.handleEditFormTemplate();
        }

        return (
            <>
                <div style={{display:"flex"}}>
                    <div style={{flex:"50%", backgroundColor:"orange", borderRadius:"5px"}}>
                        {/* component display */}
                        {
                            this.state.currentClassProfile.componentProfiles.map((componentPointer:any)=>(
                                <EditableFieldItem 
                                    key={componentPointer.addressComponentProfileKey}
                                    componentPointer={componentPointer} 
                                    currentAddressProfile={this.state.currentAddressProfile} 
                                    currentFormTemplate={this.state.currentFormTemplate}
                                    handleUpdate={this.handleUpdate.bind(this)} 
                                />
                            ))
                        }                    
                    </div>
                    <div style={{backgroundColor:"gray", width:"2px", margin:"0 2.5px"}}></div>
                    <div style={{flex:"50%", backgroundColor:"orange", borderRadius:"5px"}}>
                        {/* demo display */}
                        <AnchorButton onClick={handleAddRow} text="Add Row" intent="success" icon="add-row-bottom" />
                        <AnchorButton onClick={handleAddCol} text="Add Column" intent="success" icon="add-column-right" />

                        <br/>

                        <table style={{width: "100%"}}>
                            {
                                this.state.table
                            }
                        </table>
                    </div>
                </div>
                <div>
                    <AnchorButton onClick={handelSaveChange} fill={true} text="Save Change" intent="success" />
                </div>
            </>
        )
    }
}

class EditableFieldItem extends React.Component<any, any>{
    constructor(props:any) {
        super(props);


        var fieldName= "";
        var example=""
        this.props.currentFormTemplate.lines.forEach((line:any) => {
            line.elements.forEach((lineElement:any)=>{
                // log.info(lineElement.componentKeyBelongTo + "|" + this.props.componentPointer.addressComponentProfileKey);
                if(lineElement.componentKeyBelongTo == this.props.componentPointer.addressComponentProfileKey){
                    if(lineElement.type == "staticText"){
                        fieldName = lineElement.element.value;
                    }
                    if(lineElement.type == "data"){
                        example = lineElement.element.value;
                    }
                }
            });
        });


        this.state={
            componentPointer: this.props.componentPointer,
            currentAddressProfile: this.props.currentAddressProfile,
            currentFormTemplate: this.props.currentFormTemplate,
            handleUpdate: this.props.handleUpdate,

            //field data
            // fieldName: "FeildName(should not show)",
            // example: "Example(should not show)",
            fieldName: fieldName,
            example: example,

        };
    }

    componentDidMount() {
        // log.info(this.props.currentFormTemplate.lines);
        // this.props.currentFormTemplate.lines.forEach(line => {
        //     line.elements.forEach((lineElement)=>{
        //         // log.info(lineElement.componentKeyBelongTo + "|" + this.props.componentPointer.addressComponentProfileKey);
        //         if(lineElement.componentKeyBelongTo == this.props.componentPointer.addressComponentProfileKey){
        //             if(lineElement.type == "staticText"){
        //                 this.setState({fieldName: lineElement.element.value});
        //             }
        //             if(lineElement.type == "data"){
        //                 this.setState({example: lineElement.element.value});
        //             }
        //         }
        //     });
        // });
    }

    updateFieldName(data:any) {
        this.state.handleUpdate(this.state.componentPointer.addressComponentProfileKey, "staticText", data);
        this.setState({fieldName: data})
    }

    updateExample(data:any) {
        this.state.handleUpdate(this.state.componentPointer.addressComponentProfileKey, "data", data);
        this.setState({example: data})
    }

    render(){
        const itemStyle = {
            marginTop: "10px",
            borderRadius: "5px",
            background: "#FFFFFF",
        } as React.CSSProperties;
    
        const itemHeadStyle = {
            padding: "7px 5px 30px 5px",
            height: "15px",
            fontSize: "20px",
            width: "100%",
        } as React.CSSProperties;
    
        const itemHeadButtonStyle = {
            padding: "5px",
            float: "right",
        } as React.CSSProperties;
    
        const itemHrStyle = {
            width: "100%",
            margin: "0 0 7px 0",
            clear: "both",
        } as React.CSSProperties;
    
        const itemBodyStyle = {
            padding: "5px",
            width: "100%",
        } as React.CSSProperties;
    
        const rightDivStyle = {
            float: "right",
        } as React.CSSProperties;
    
        const subSubItemSytle = {
            backgroundColor: "#3DCC91",
            marginLeft: "5px",
            marginRight: "5px", 
            // color: "#FFF",
        } as React.CSSProperties;
    
        const subSubItemHeadStyle = {
            padding: "10px 5px 5px",
            fontSize: "15px",
            height: "unset",
        } as React.CSSProperties;
    
        const subSubitemBodyStyle = {
            fontSize: "15px",
        } as React.CSSProperties;
        
        return(
            <div style={{...itemStyle, ...subSubItemSytle, marginBottom: "5px"}}>
                <div style={{...itemHeadStyle, ...subSubItemHeadStyle}}>
                    <span style={{fontWeight: "bold",}}>{this.state.componentPointer.addressComponentProfileKey}</span>
                    <div style={rightDivStyle}>
                            min: {this.state.componentPointer.addressComponentSpecification.minCardinality} | max: {this.state.componentPointer.addressComponentSpecification.maxCardinality}
                    </div>
                </div>
                <hr style={itemHrStyle} />
                <div style={{...itemBodyStyle,...subSubitemBodyStyle}}>
                    <table>
                        <tr>
                            <td style={{fontWeight: "bold",}}>Field Name</td>
                            <td>:</td>
                            <td>
                                <InputGroup value={this.state.fieldName} onChange={(event:any)=>{this.updateFieldName(event.target.value)}} />
                            </td>
                        </tr>
                        <tr>
                            <td style={{fontWeight: "bold",}}>Example</td>
                            <td>:</td>
                            <td>
                                <InputGroup value={this.state.example} onChange={(event:any)=>{this.updateExample(event.target.value)}} />
                            </td>
                        </tr>
                    </table>
                </div>
                {/* <hr style={itemHrStyle} />
                <div style={{...itemHeadStyle, ...subSubItemHeadStyle, padding: "2px 5px 14px"}}>
                    Row: 
                    <select>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                    Order: 
                    <select>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>

                    <div style={rightDivStyle}>
                        <AnchorButton intent="success" text={"Duplicate"}/>
                    </div>
                </div> */}
            </div>
        );
    }
}

class DisplayableFieldItem extends React.Component<any, any>{
    constructor(props:any) {
        super(props);
        this.state={

        };
    }

    render(){
        const itemStyle = {
            marginTop: "10px",
            borderRadius: "5px",
            background: "#FFFFFF",
        } as React.CSSProperties;
    
        const itemHeadStyle = {
            padding: "7px 5px 30px 5px",
            height: "15px",
            fontSize: "20px",
            width: "100%",
        } as React.CSSProperties;
    
        const itemHeadButtonStyle = {
            padding: "5px",
            float: "right",
        } as React.CSSProperties;
    
        const itemHrStyle = {
            width: "100%",
            margin: "0 0 7px 0",
            clear: "both",
        } as React.CSSProperties;
    
        const itemBodyStyle = {
            padding: "5px",
            width: "100%",
        } as React.CSSProperties;
    
        const rightDivStyle = {
            float: "right",
        } as React.CSSProperties;
    
        const subSubItemSytle = {
            backgroundColor: "#3DCC91",
            marginLeft: "5px",
            marginRight: "5px", 
            // color: "#FFF",
        } as React.CSSProperties;
    
        const subSubItemHeadStyle = {
            padding: "10px 5px 5px",
            fontSize: "15px",
            height: "unset",
        } as React.CSSProperties;
    
        const subSubitemBodyStyle = {
            fontSize: "15px",
        } as React.CSSProperties;

        const displayDivStyle = {
            borderRadius: "5px",
            backgroundColor: "white",
            padding: "5px",
            margin: "10px 5px"
        } as React.CSSProperties;

        const classTitleComponent = {
            fontWeight: "bold",
            textAlign: "center",

        } as React.CSSProperties;


        return(
            <div style={displayDivStyle}>
                <div style={classTitleComponent}>
                    {/* Hardcode Data */}
                    Street Address
                </div>
                <hr style={itemHrStyle} />
                <table>
                        <tr>
                            {/* Hardcode Data */}
                            <td style={{fontWeight: "bold",}}>Address Number</td><td>:</td><td>23</td>
                        </tr>
                        <tr>
                            {/* Hardcode Data */}
                            <td style={{fontWeight: "bold",}}>Locality name</td><td>:</td><td>Yuen Long</td>
                        </tr>
                    </table>
            </div>
        );
    }
}

class DisplayTemplatePanel extends React.Component<DisplayTemplateProps, any>{
    constructor(props:any){
        super(props);
        this.state={
            
        }
    }
    render(){
        return(
            <></>
        )
    }
}

export interface LayoutPanelProps{
    currentAddressProfile: AddressProfile,
    changeStateHandler: any,
}

interface FormTemplatePanelProps {
    currentAddressProfile: AddressProfile,
    currentClassProfile: AddressClassProfile,
    changeStateHandler: any,
}

interface DisplayTemplateProps {
    
}