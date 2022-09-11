import { useFormik } from "formik";
import React, { useState } from "react";
import {promotions_collection} from '../../../firebase';
import *  as Yup from 'yup';
import { Fade } from "react-awesome-reveal";
import { CircularProgress } from "@mui/material";
import {showToastError, showToastSuccess} from '../../Utils/tools';

const Enroll = () => {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues : {email:''},
        validationSchema: Yup.object({
            email:Yup.string()
            .email('Invalid Email')
            .required('Email required')
        }),
        onSubmit : (values, {resetForm}) =>{
            setLoading(true)
            submitForm(values);
            
        }
    })

    const submitForm = async (values) =>{
            try{
                    const isEnrolled = await promotions_collection.where('email','==',values.email).get();

                    if(isEnrolled.docs.length == 1){
                        showToastError('You are already enrolled');
                        setLoading(false)
                        return false
                    }
                    else{
                            await promotions_collection.add({email:values.email})
                            formik.resetForm();
                            setLoading(false);
                            showToastSuccess('Congratulations :)')
                    }
            } catch(err){
                    showToastError(err)
            }
    }

  return (
    <Fade>
        <div className="enroll_wrapper">
            <form onSubmit={formik.handleSubmit}>
                <div className="enroll_title">
                    Enter the email:
                </div>
                <div className="enroll_input">
                    <input
                            name="email"
                            onChange={formik.handleChange}
                            onBlur = {formik.handleBlur}
                            value = {formik.values.email}
                            placeholder = "Email Please"


                    />
                    {formik.touched.email && formik.errors.email?
                    
                        <div className="error_label">
                                {formik.errors.email}
                        </div>
                            :
                            null

                    }

                    {loading?
                        <CircularProgress
                            color="secondary"
                            className="progress"
                        />
                        :
                        <button
                            type="submit"
                        >
                             Enroll
                        </button>
                }

                <div className="enroll_discl">
                    Enroll to win a new Jersey. Sign In required
                </div>
                </div>
            </form>
        </div>
    </Fade>
  );
}

export default Enroll;
