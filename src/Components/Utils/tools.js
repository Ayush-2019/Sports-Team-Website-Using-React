import { PowerInputSharp, Repeat } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import {toast} from 'react-toastify';
import mcitylogo from '../../Resources/images/logos/manchester_city_logo.png';
import {firebase} from "../../firebase";
import { FormHelperText } from "@mui/material";

export const CityLogo = (props) =>{

    const template = <div
    
    className="img_cover"

    style={{
        width:props.width,
        height:props.height,
        background:`url(${mcitylogo}) no-repeat`
    }}
    >
    </div>

    if(props.link){
        return(
            <Link className="link_logo" to={props.linkTo}>
                {template}
            </Link>
        )

    }
    else{
        return template;
    }
}

export const showToastError = (msg) =>{
        toast.error(msg, {
            position:toast.POSITION.TOP_LEFT
        })
}

export const showToastSuccess = (msg) =>{
    toast.success(msg, {
        position:toast.POSITION.TOP_LEFT
    })
}

export const logoutHandler = () =>{    
    firebase.auth().signOut()
    .then(() =>{
        showToastSuccess('Logged Out')
    }).catch(error => {
        showToastError(error.message)
    })
}

export const Tag = (props) =>{
    const template = (<div
    
    style={{
            background : props.bck ? props.bck:'white',
            fontSize : props.size ? props.size:'17px',
            color : props.color ? props.color:'#000000',
            padding : '5px 10px',
            display : 'inline-block',
            fontFamily : 'Righteous',
            ...props.add
    }}
    >
            {props.children}
    </div>);

    if(props.link){
        return (<Link to={props.linkTo}>
            {template}
        </Link>)
    }
    else{
        return template;
    }
}

export const Text_err_helper = (formik, values) => ({
    error : formik.errors[values] && formik.touched[values],
    helperText : formik.errors[values] && formik.touched[values] ? formik.errors[values]: null
})

export const Select_pos_helper = (formik, values) => {

    if(formik.errors[values] && formik.touched[values]){
            return (<FormHelperText>{formik.errors[values]}</FormHelperText>)
    }
    else{
            return false
    }
} 

export const SelectisErr = (formik, values) =>{
    return formik.errors[values] && formik.touched[values]
}

export const matches_Validation_schema = (Yup) => {
    const schema = 
    {date:Yup.string()
    .required('Date is required'),
    local:Yup.string()
    .required('This input is required'),
    resultLocal:Yup.number()
    .required('Result is required')
    .min(0, 'Min is 0')
    .max(100, 'Max is 100'),
    away:Yup.string()
    .required('This input is required'),
    resultAway:Yup.number()
    .required('This input is required')
    .min(0, 'Min is 0')
    .max(100, 'Max is 100'),
    referee:Yup.string()
    .required('This input is required'),
    stadium:Yup.string()
    .required('This input is required'),
    result:Yup.mixed()
    .required('This input is required')
    .oneOf(['W','D','L','n/a']),
    final:Yup.mixed()
    .required('This input is required')
    .oneOf(['Yes','No'])}

    return schema;
}