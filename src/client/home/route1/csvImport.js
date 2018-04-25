import React from 'react';
import {connect} from 'react-redux';
import ACTION from '../../common/action_constants';
import {Link} from 'react-router-dom';
import '../../common/common.less';
import './csvImport.less';

class CsvImport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            csvFile:null,
            fileName:null
        };
    }


    fileUploaded=(event)=>{
        const self = this;
        const fileObject = event.target.files[0];
        const reader  = new FileReader();
        this.setState({fileName:fileObject.name});
        if(fileObject.type.indexOf('csv')>0 ||fileObject.type.indexOf('CSV')>0){
            this.setState({error:null});
            this.setState({csvFile:event.target.files[0]});
        }
        else{
          const err='Please upload a valid .csv file';
          this.setState({error:err});
        }
        reader.onload = (e)=> {
        };
        reader.readAsDataURL(fileObject);
    }

    submitCSV=()=>{
      if(this.state.csvFile){
        let formData = new FormData();
        this.setState({error:null});
        formData.append('file', this.state.csvFile);
        this.props.importCSV(formData,this.state.selectedCategory.value);
        this.props.toggleUploadPopup();
      }
      else{
        const err='Please select a .csv file';
        if(!this.state.error)
          this.setState({error:err});
      }
    }

    render() {
        return (
            <div>
                <div className="content-root">
                    <h1>upload CSV</h1>
                    <div className="head-text-holder">
                          <button className="button-choose-file">Choose file</button>
                          <input className="choose-file" type="file" onChange={this.fileUploaded}/>
                          <span className="file-name">{this.state.fileName}</span>
                    </div>
                    <button className="add-button" onClick={this.submitCSV}>Upload</button>
                </div>
            </div>
        );
    }
    componentDidMount() {
    }

}


export default CsvImport;