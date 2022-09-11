import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../Hoc/Adminlayout';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {showToastError, showToastSuccess, Text_err_helper, Select_pos_helper, SelectisErr, matches_Validation_schema} from '../../Utils/tools';
import { TextField, Select, Button, MenuItem, FormControl, CircularProgress } from "@mui/material";

import { match_collection,  teams_collection} from '../../../firebase';

import { useParams, useNavigate } from 'react-router-dom';

const default_values = {
  date:'',
  local:'',
  resultLocal:'',
  away:'',
  resultAway:'',
  referee:'',
  stadium:'',
  result:'',
  final:''
}

const Add_edit_Matches = (props) =>{

  const[loading, setLoading] = useState(false);
  const[formType, setFormType] = useState('');
  const[values, setValues] = useState(default_values);
  const[teams, setTeams] = useState(null);

  const {match_id} = useParams();

  const history = useNavigate()

  const formik = useFormik({
    enableReinitialize:true,
    initialValues:values,
    validationSchema: Yup.object(matches_Validation_schema(Yup)),
    onSubmit: (values) => {
      submitForm(values)
    }
  });

  const submitForm = (values) =>{
    let data = values;

    teams.forEach((team) =>{

      if(team.shortName === data.local){
          data['localThmb'] = team.thmb;
      }
      if(team.shortName === data.away){
        data['awayThmb'] = team.thmb
      }
    })

    setLoading(true);

    if(formType === 'add'){
        match_collection.add(data)
        .then(() =>{
            showToastSuccess('Match Added');
            formik.resetForm();
            history('/admin_matches')

        }).catch(err => {showToastError(err)})
        .finally(() => {setLoading(false)})
    }
    else{
        match_collection.doc(match_id)
        .update(data)
        .then(() => {
          showToastSuccess('Match Details Updated');
          history('/admin_matches')
        })
        .catch(err => {showToastError(err)})
        .finally(() => {setLoading(false)})
    }
  }


  const showTeams = () => (
    teams ?
        teams.map((team) => (
            <MenuItem key={team.id} value = {team.shortName}>{team.shortName}</MenuItem>
        ))
      :
      null
  )

  const showresults = () =>{
    const data = [
      {
          value:'W',
          content:'Win'
      },
      {
        value:'D',
          content:'Draw'
      },
      {
        value:'L',
          content:'Loose'
      },
      {
        value:'n/a',
          content:'Not available'
      }
    ];

    return data.map((item, index) => (
      <MenuItem key={index} value = {item.value}>{item.content}</MenuItem>
    ))
  }

  const showfinal = () =>{
    const data = [
      {
          value:'Yes',
          content:'Yes'
      },
      {
        value:'No',
          content:'No'
      },
    ];

    return data.map((item, index) => (
      <MenuItem key={index} value = {data[index].value}>{data[index].content}</MenuItem>
    ))
  }

  useEffect(() =>{
      if(!teams){
        teams_collection.get()
        .then(snapshot =>{
          const team = snapshot.docs.map(doc => ({
            id:doc.id,
            ...doc.data()
          }))
          setTeams(team);
        }).catch(err => {showToastError(err)})
      }
  }, [teams])

  useEffect(() =>{

      const param = match_id;

      if(param){
          match_collection.doc(param).get()
          .then(snapshot => {
            if(snapshot.data()){
                setFormType('edit');
                setValues(snapshot.data());
            }
            else{
              showToastError('No Data Found')
            }
          }).catch(err => {showToastError(err)})
      }
      else{
        setFormType('add')
        setValues(default_values);
      }
  }, [match_id])

  return(
    <AdminLayout title = {formType === 'add' ? 'Add Match' : 'Edit Match'}>
      <div className='editmatch_dialog_wrapper'>
        
        <div>
          <form onSubmit={formik.handleSubmit}>
              {/*Input Field for date*/ }
              <div>
                <h4>Choose a Date</h4>
                  <FormControl>
                    <TextField
                      id='date'
                      name='date'
                      type='date'
                      variant='outlined'
                      {...formik.getFieldProps('date')}
                      {...Text_err_helper(formik, 'date')}
                    />
                  </FormControl>
              </div>

              <hr/>

              {/* Input for result local*/}

              <div>
                <div style={{fontWeight:'bolder'}}><span style={{marginLeft:'70px'}}>Team 1</span><span style={{marginLeft:'130px'}}>Team 1 Result</span></div>

                <FormControl error = {SelectisErr(formik, 'local')}>
                  <Select
                    id='local'
                    name='local'
                    variant='outlined'
                    displayEmpty
                    {...formik.getFieldProps('local')}
                    >
                      <MenuItem value = "" disabled>Select a Team</MenuItem>
                      {showTeams()}

                  </Select>
                  {Select_pos_helper(formik, 'local')}
                </FormControl>

                
                <FormControl style={{marginLeft:'10px'}}>
                    <TextField
                      id='resultLocal'
                      name='resultLocal'
                      type='number'
                      variant='outlined'
                      {...formik.getFieldProps('resultLocal')}
                      {...Text_err_helper(formik, 'resultLocal')}
                    />
                  </FormControl>
              </div>

              {/* Input for result away */}

              <div>
              <div style={{fontWeight:'bolder', marginTop:'20px'}}><span style={{marginLeft:'70px'}}>Team 2</span><span style={{marginLeft:'130px'}}>Team 2 Result</span></div>
                <FormControl error = {SelectisErr(formik, 'away')}>
                  <Select
                    id='away'
                    name='away'
                    variant='outlined'
                    displayEmpty
                    {...formik.getFieldProps('away')}
                    >
                      <MenuItem value = "" disabled>Select a Team</MenuItem>
                      {showTeams()}

                  </Select>
                  {Select_pos_helper(formik, 'away')}
                </FormControl>

                <FormControl style={{marginLeft:'10px'}}>
                    <TextField
                      id='resultAway'
                      name='resultAway'
                      type='number'
                      variant='outlined'
                      {...formik.getFieldProps('resultAway')}
                      {...Text_err_helper(formik, 'resultAway')}
                    />
                  </FormControl>
              </div>

              <hr/>

                {/* Match Info */}
              <div>
                <h4>MATCH INFO</h4>
                <div className='mb-5'>
                  <h4 style={{marginBottom:'2px', marginLeft:'40px'}}>Referee</h4>
                  <FormControl>
                    <TextField
                      id='referee'
                      name='referee'
                      variant='outlined'
                      placeholder='Type Referee name'
                      {...formik.getFieldProps('referee')}
                      {...Text_err_helper(formik, 'referee')}
                      
                    />
                  </FormControl>
                  </div>

                  <div className='mb-5'>
                  <h4 style={{marginBottom:'2px', marginLeft:'40px'}}>Stadium</h4>
                  <FormControl>
                    <TextField
                      id='stadium'
                      name='stadium'
                      variant='outlined'
                      placeholder='Type Stadium name'
                      {...formik.getFieldProps('stadium')}
                      {...Text_err_helper(formik, 'stadium')}
                    />
                  </FormControl>
                  </div>

                  <div className='mb-5'>
                  <h4 style={{marginBottom:'2px', marginLeft:'40px'}}>Match Result</h4>
                      <FormControl error = {SelectisErr(formik, 'result')}>
                      <Select
                        id='result'
                        name='result'
                        variant='outlined'
                        displayEmpty
                        {...formik.getFieldProps('result')}
                        >
                          <MenuItem value = "" disabled>What is the result</MenuItem>
                          {showresults()}

                      </Select>
                      {Select_pos_helper(formik, 'result')}
                    </FormControl>
                  </div>

                  <div className='mb-5'>
                  <h4 style={{marginBottom:'2px', marginLeft:'20px'}}>Was the match played</h4>
                      <FormControl error = {SelectisErr(formik, 'final')}>
                      <Select
                        id='final'
                        name='final'
                        variant='outlined'
                        displayEmpty
                        {...formik.getFieldProps('final')}
                        >
                          <MenuItem value = "" disabled>Was the match played</MenuItem>
                          {showfinal()}

                      </Select>
                      {Select_pos_helper(formik, 'final')}
                    </FormControl>
                  </div>

                    <div>
                    {loading ?  
                    
                    <div>
                      <CircularProgress 
                      thickness={7}
                      style = {{
                        color : '#98c5e9'
                      }}/>
                    </div>
                  : null}
                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    disabled = {loading}
                >
                  {formType === 'add' ?  

                      'Add Match'
                  
                  :  
                      'Edit Match'
                  
                  }
                </Button>
                    </div>

              </div>

          </form>
        </div>
      </div>
    </AdminLayout>
  )
}


export default Add_edit_Matches;

