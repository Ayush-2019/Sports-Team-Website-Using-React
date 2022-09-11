import React, {Component} from "react";
import {firebase} from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import { CircularProgress } from "@mui/material";
import {showToastError, showToastSuccess} from '../Utils/tools'

class FileUpload extends Component{

        state = {
            name:'', 
            isUploading:false,
            fileURL:''
        }

        handleUploadStart = () =>{
            this.setState({
                isUploading:true
            })
        }

        handleUploadError = (err) =>{
            showToastError(err)
            this.setState({
                isUploading:false
            })
        }

        handleUploadSuccess = (filename) =>{
            this.setState({
                name:filename,
                isUploading:false
            });
            firebase.storage().ref(this.props.dir)
            .child(filename).getDownloadURL()
            .then(url => {
                this.setState({
                    fileURL:url
                })
            });
            this.props.filename(filename);
        }

        static getDerivedStateFromProps (props, state){
                if(props.defaultImg){
                    return state = {
                        name: props.default_name,
                        fileURL:props.defaultImg
                    }
                }
                return null;
        }

        uploadAgain = () =>{
            this.setState({name:'', 
            isUploading:false,
            fileURL:''});
            this.props.resetImg();
        }

    render(){
        return(

            <div>

                {!this.state.fileURL ?

                    <div>
                    <FileUploader
                        accept = "image/*"
                        name = "image"
                        randomizeFilename
                        storageRef = {firebase.storage().ref(this.props.dir)}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                    />
                    </div>
                
                :null}

                {this.state.isUploading ?
                    <div className="progress"
                        style={{
                            textAlign:'center',
                            margin:'30px 0px'
                        }}
                    >
                        <CircularProgress style={{color:'#98c5e9'}} thickness = {7}/>
                    </div>
                :null}

                {this.state.fileURL ?
                <div className="image_upload_container">
                    <img style={{
                        width : '100%'
                    }}
                    src = {this.state.fileURL}
                    alt = {this.state.name}></img>

                    <div className="remove" onClick={() => this.uploadAgain()}>
                        REMOVE
                        </div>
                        </div>
            
            :null}
            </div>
        )
    }
}

export default FileUpload;