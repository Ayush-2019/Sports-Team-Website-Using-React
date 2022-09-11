import React, { useEffect, useState } from "react";
import AdminLayout from "../../../Hoc/Adminlayout";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { showToastError, showToastSuccess, Text_err_helper, Select_pos_helper, SelectisErr } from "../../Utils/tools";
import { TextField, Select, Button, MenuItem, FormControl } from "@mui/material";
import { player_collection, firebase } from "../../../firebase";
import {useNavigate, useParams} from 'react-router-dom';
import FileUpload from "../../Utils/fileUpload";
const default_values = {
    name:'',
    lastname:'',
    number:'',
    position:'',
    image:''
}
const Add_editPlayer = (props) => {

    const {player_id} = useParams();

    const [values, setValues] = useState(default_values);
    const [form_type, setForm_type] = useState('');
    const[loading, setLoading] = useState(false);
    const[def_img, setDef_img] = useState('');
    const formik = useFormik({
        enableReinitialize:true,
        initialValues:  values,
        validationSchema: Yup.object({
            name:Yup.string().required('Name is Required'),
            lastname:Yup.string().required('Lastname is required'),
            number:Yup.number()
            .required('Number is required')
            .min(0, 'Minimum is zero')
            .max(99, 'Max is 99'),
            position:Yup.string().required('position     is required'),
            image:Yup.string().required('Image is required')
        }),
        onSubmit : (values) =>{
            submitForm(values);
        }
    });

    const history = useNavigate();

    const submitForm = (values) =>{

        if(form_type === 'add'){
                player_collection.add(values)
                .then(() =>{
                    showToastSuccess('Player added');
                    formik.resetForm();
                    history('/admin_players')

                }).catch(err => showToastError(err))
        }
        else{
                player_collection.doc(player_id).update(values)
                .then(() =>{
                        showToastSuccess('Player Updated');
                        history('/admin_players');
                }).catch(err => showToastError(err))
                .finally(() =>{
                        setLoading(false)
                })
        }
    }

    useEffect(() => {
        

            const param = player_id;

            if(param){

                player_collection.doc(param).get().then(snapshot =>{
                    if(snapshot.data()){

                        firebase.storage().ref('player')
                        .child(snapshot.data().image).getDownloadURL()
                        .then(url => {
                            updateImg_name(snapshot.data().image);
                            setDef_img(url);
                        });

                        setForm_type('edit');
                        setValues(snapshot.data());
                    }
                    else{
                        showToastError('Sorry, nothing found')
                    }
                }).catch(err => showToastError(err))

                

            }
            else{
                setForm_type('add');
                setValues(default_values);
            }
    }, [player_id])

    const updateImg_name = (filename ) =>{
        formik.setFieldValue('image', filename);   
    }
    const resetImage = () =>{
        formik.setFieldValue('image', '');
        setDef_img('')
    }


  return (
    <AdminLayout title = {form_type === 'add' ? 'Add Player' : 'Edit Player'}>
            <div className="edit_players_dialog_wrapper">
                <div>
                    <form onSubmit={formik.handleSubmit}>
                    <FormControl error = {SelectisErr(formik, 'image')}>
                        <FileUpload
                            dir = "player"
                            filename = {(filename) => updateImg_name(filename)}
                            defaultImg = {def_img}
                            default_name = {formik.values.image}
                            resetImg = {() => resetImage()}
                        />
                        {Select_pos_helper(formik, 'image')}
                    </FormControl>
                        <hr/>
                    <div className="mb-5">
                    <FormControl>
                            <TextField
                                id="id"
                                name="name"
                                variant="outlined"
                                placeholder="Add name"
                                {...formik.getFieldProps('name')}
                                {...Text_err_helper(formik, 'name')}
                                
                            >

                            </TextField>

                            
                        </FormControl>

                    </div>

                    <div className="mb-5">
                    <FormControl>
                            <TextField
                                id="id"
                                name="lastname"
                                variant="outlined"
                                placeholder="Add lastname"
                                {...formik.getFieldProps('lastname')}
                                {...Text_err_helper(formik, 'lastname')}
                                
                            >

                            </TextField>

                            
                        </FormControl>

                    </div>

                    <div className="mb-5">
                    <FormControl>
                            <TextField
                                type="number"
                                id="id"
                                name="number"
                                variant="outlined"
                                placeholder="Add number"
                                {...formik.getFieldProps('number')}
                                {...Text_err_helper(formik, 'number')}
                                
                            >

                            </TextField>

                            
                        </FormControl>

                    </div>

                    <div className="mb-5">
                    <FormControl error = {SelectisErr(formik, 'position')}>
                            <Select
                                id="id"
                                name="position"
                                variant="outlined"
                                displayEmpty
                                {...formik.getFieldProps('position')}
                                
                            >

                            <MenuItem value = "" disabled>Select a Position</MenuItem>
                            <MenuItem value = "Keeper">Keeper</MenuItem>
                            <MenuItem value = "Defence">Defence</MenuItem>
                            <MenuItem value = "Midfield">Midfield</MenuItem>
                            <MenuItem value = "Striker">Striker</MenuItem>
                            </Select>

                            {Select_pos_helper(formik, 'position')}
                        </FormControl>

                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled = {loading}
                    >
                            {form_type === 'add' ?
                                'Add Player'
                                :
                                'Edit Player'
                        }
                    </Button>
                        
                    </form>
                </div>
            </div>
    </AdminLayout>
  );
}

export default Add_editPlayer;
