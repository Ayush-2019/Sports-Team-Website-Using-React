import React, { useState, Context } from "react";

import { CircularProgress } from "@mui/material";
import {useNavigate, Navigate} from 'react-router-dom';

import { useFormik } from "formik";
import * as Yup from 'yup';
import { fontWeight } from "@mui/system";
import { firebase } from "../../firebase";
import {showToastError, showToastSuccess} from '../Utils/tools';

export const SignIn = (props) => {

    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues : {
            email:'',
            password:''
        },
        validationSchema : Yup.object({
            email : Yup.string()
                .email('Inavlid email')
                .required('email required'),
                
                password:Yup.string()
                .required('The email is required')
        }),
        onSubmit : (values) =>{
            setLoading(true)
            submitform(values)
        }

    })


    const history = useNavigate();

    const submitform = (values) => {
        firebase.auth()
        .signInWithEmailAndPassword(
            values.email,
            values.password
        )
        .then(()=>{
            showToastSuccess('Signed In')
            history('/dashboard')
        }).catch(error=>{
            showToastError(error.message)
            setLoading(false)
        })
    }

    return(
        <div>
            {!props.user?

    <div className="container">
    <div className="signin_wrapper" style={{margin:'100px'}}>

    <form onSubmit={formik.handleSubmit}>
        <h2>Sign in form</h2>

        <input
            name="email"
            placeholder="email"
            onChange={formik.handleChange}
            onBlur = {formik.handleBlur}
            value = {formik.values.email}
        />

        {formik.touched.email && formik.errors.email? 
        <div className="error_label">
            {formik.errors.email}
        </div>
            :null
            
            }
<input
            name="password"
            type="password"
            placeholder="password"
            onChange={formik.handleChange}
            onBlur = {formik.handleBlur}
            value = {formik.values.password}
        />
        {formik.touched.password && formik.errors.password? 
        <div className="error_label">
            {formik.errors.password}
        </div>
            :null
            
            }

        {loading?
        <CircularProgress color="secondary" className="progress"/>
        :
        <button type="submit">Login</button>
    
    }
    </form>
</div>
</div>
            
            :
            <div>
            <Navigate to={'/dashboard'}/>
            {alert('You\'re already signed in!!' )}
            </div>
            }
            
        </div>
    )
}

