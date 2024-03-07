import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function ForgotPass() {
    let [errmsg, setErr] = useState("")
    let nav = useNavigate()
    let [changForm, setChangeForm] = useState(true)
    let validationSchema = Yup.object({
        email: Yup.string().required("email Required").email("enter Valid Email"),
    })
    let validationSchema2 = Yup.object({
        resetCode: Yup.string().required("resetCode Required").matches(/^[0-9]{4,6}$/),
    })

    let form1 = useFormik({
        initialValues: {
            email: ""
        },
        onSubmit: forgotPasswordsAPi,
        validationSchema
    })
    let form2 = useFormik({
        initialValues: {
            resetCode: ""
        },
        onSubmit: verifyResetCode,
        validationSchema: validationSchema2
    })

    async function verifyResetCode(Val) {

        let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', Val).catch((err) => {
            setErr(err.response.data.message)
        })
        if (req.data.status == 'Success') {
            nav('/ResetPassword')
        }
        console.log(req);
    }
    async function forgotPasswordsAPi(value) {
        let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', value).catch((err) => {
            console.log(err);
            setErr(err.response.data.message)
        })
        if (req.data.statusMsg == 'success') {
            setChangeForm(false)
            setErr("")
        }
        console.log(req);
    }
    return (
        <div className='w-75 mx-auto my-5'>
         
            {errmsg != '' ? <div className='alert alert-danger'>{errmsg}</div> : ""}
            {changForm ? <form onSubmit={form1.handleSubmit}>
                <label htmlFor="email">Enter Your Email  to Send Code</label>
                <input className='form-control mt-3' onChange={form1.handleChange} onBlur={form1.handleBlur} type="text" name="email" id="email" />
                {form1.errors.email && form1.touched.email ? <p className='text-danger'>{form1.errors.email}</p> : ""}
                <button type='submit' className='btn bg-main text-white mt-3'>send Code </button>
            </form> :
                <form onSubmit={form2.handleSubmit}>


                    <label htmlFor="resetCode">Enter Verify Code</label>
                    <input value={form2.values.resetCode} onChange={form2.handleChange} onBlur={form2.handleBlur} type="text" className='form-control mt-2' name="resetCode" id="resetCode" />
                    {form2.errors.resetCode && form2.touched.resetCode ? <p className='text-danger'>{form2.errors.resetCode}</p> : ""}


                    <button type="submit" className='btn bg-main mt-3'>confirm Code</button>

                </form>}


        </div>
    )
}
