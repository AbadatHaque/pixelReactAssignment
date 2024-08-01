
import { useForm,useFieldArray } from "react-hook-form";
import {regexData} from "../../env/index"
import {postApi} from '../../Sheared/http'
import { useEffect, useState } from "react";
import Loader from 'react-spinner-loader';
import {  useDispatch,useSelector } from 'react-redux'
import {addData,updateData} from '../../Reducer/userReducer'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './style.css'
import {  toast } from 'react-toastify';




const AddEdit = () => {
  const [isCheckPan, setIsCheckPan]=useState(false)
  const [isLoaderPan, setIsPanLoader] = useState(false)
  const [isLoaderPincode, setIsLoaderPincode] = useState(false)
  let { id } = useParams();
  const navigate = useNavigate();
  const availableData = useSelector(state => state.userData.availableData)
  const dispatch = useDispatch()
  const addressData = {addressLine1:'',addressLine2:'',postcode:'',state:'',city:'' }
  const { register,setValue, handleSubmit,control,watch,reset,  formState: { errors } } = useForm({mode: 'onChange'
    ,defaultValues: {
      allAddress: [{address1:{...addressData} }],
      fullName:'',email:'',panNum:"",number:''
    }
  });
    const { fields, append,remove } = useFieldArray({
      name: "allAddress",
      control,
      });
    useEffect(()=>{
      // handleAddAddress()
      if(id && availableData.length){
        setIsCheckPan(true)
      const userData =   availableData.find((item)=> item.id == id);
      const {fullName,email,panNum,number,allAddress} = userData;
      reset({
        fullName,email,panNum,number,allAddress
      });
      }
    },[])

      const handleAddAddress=()=>{
        const keyName = 'address'+fields.length
        if(fields.length <10){
          append({[keyName]:{...addressData}})
        }else{
          toast.error("you  can't put more then 10 address")
        }
      }

      const handelChangePan=(e)=>{
        const value = e.target.value;
        setIsCheckPan(false)
        if(value.length === 10 &&  regexData.regPan.test(value)){
          setIsPanLoader(true)
          postApi('https://lab.pixel6.co/api/verify-pan.php',{panNumber: value}).then(res=>{
            if(res.statusCode == 200){
              setIsCheckPan(true)
            }
          }).catch(err=> {console.error(err)
            setIsCheckPan(false)
          }).finally(()=>{
            setIsPanLoader(false)
          })
        }
      }

      
      const handelChangePincode=(e,index)=>{
        const value = e.target.value;
        setValue(`allAddress.${index}.address${index+1}.city`, '')
        setValue(`allAddress.${index}.address${index+1}.state`, '')
        if(value.length == 6){
          setIsLoaderPincode(true)
          postApi('https://lab.pixel6.co/api/get-postcode-details.php',{postcode: value}).then(res=>{
            if(res.statusCode == 200){
              setValue(`allAddress.${index}.address${index+1}.city`, res.city[0].name)
              setValue(`allAddress.${index}.address${index+1}.state`, res.state[0].name)
            }
          }).catch(err=> {console.error(err)
            // setIsCheckPan(false)
          }).finally(()=>{
            setIsLoaderPincode(false)
          })
        }

      }
      const onSubmit = (data) =>{ 
        if(id){
          dispatch(updateData({...data,id}))
        }else{
          dispatch(addData({...data,id:Math.random()}))
        }
        navigate('/')
      }

    return (
        <form className={'form-container'}  onSubmit={handleSubmit(onSubmit)}>  
        {/* //PAN NUMBER */}
        <div className={`form-control ${(errors.panNum || ( (!isCheckPan && !!watch('panNum')) && !isLoaderPan )) && 'errMsg'} `}>
        <label>Enter your pan number:</label>
       <input {...register("panNum", { required: "Pan number is require",  pattern: {
        value: regexData.regPan,
        message: "Pan number is not valid."
        },
        onChange:handelChangePan, })} />
           <Loader show = {isLoaderPan}/>

       {(errors.panNum || (!isCheckPan && !!watch('panNum')) && !isLoaderPan )&& (
            <p className="errorMsg">{errors?.panNum?.message || 'Invalid Pan Number'}</p>
          )}
      </div>
           
           {/* Name full */}
      <div className={`form-control ${errors.fullName && 'errMsg'}`}>
        <label>Enter your name: </label>
        <input {...register("fullName", { required: "Name is require", maxLength: { value: 140, message: "Name should be under 140 words" } })} />
        {errors.fullName && (
              <span className="errorMsg">{errors.fullName.message}</span>
            )}
       </div>

       {/* Email */}
       <div className={`form-control ${errors.email && 'errMsg'}`}>
        <label>Enter your email: </label>
        <input {...register("email", { required: "Email is require", maxLength: { value: 255, message: "Email should be under 255 words" }, pattern: {
        value: regexData.regEmail,
        message: "Email is not valid."
    } })} />
        {errors.email && (
          <span className="errorMsg">{errors.email.message}</span>
        )}
       </div>

       {/*MOBILE Number */}
       <div className={`form-control ${errors.number && 'errMsg'}`}>
        <label>Enter your mobile number: </label>
        <div>
        <span>+91</span>
        <input type="number"{...register("number", { required: "Number is require", pattern: {
        value: regexData.regMobile,
        message: "Number is not valid."
    } })} />
        </div>
        {errors.number && (
            <span className="errorMsg">{errors.number.message}</span>
          )}
        </div>

        {/* //ADDRESS FIELDS */}
        <button  type="button" className="actionBtn" onClick={handleAddAddress}> Add Address</button>
        {
          fields.map((item,index)=>{
            return <div key={index} className="Heading">Address{index+1}
            {index > 0 &&  <button className="actionBtn deleteBtn" type="button" onClick={()=>{remove(index)}}>Delete Address</button>}
             {/* //ADDRESS 1 */}
             <div className={`form-control ${errors?.allAddress?.[index]?.[`address${index+1}`]?.addressLine1 && 'errMsg'}`}>
                  <label>Address Line 1</label>
                  <input {...register(`allAddress.${index}.address${index+1}.addressLine1`,{required: "Address Line 1 is require"} ) } />
                  {errors?.allAddress?.[index]?.[`address${index+1}`]?.addressLine1 && (
                    <span className="errorMsg">{errors?.allAddress?.[index]?.[`address${index+1}`]?.addressLine1.message}</span>
                  )}
              </div>
               {/* //ADDRESS 2 */}
              <div className="form-control">
                <label>Address Line 2</label>
                <input {...register(`allAddress.${index}.address${index+1}.addressLine2`) } />
              </div>
               {/* //PIN CODE */}
               <div className={`form-control ${errors?.allAddress?.[index]?.[`address${index+1}`]?.postcode && 'errMsg'}`}>
                <label>Pin Code</label>
                <input type="number" {...register(`allAddress.${index}.address${index+1}.postcode`,
                 { onChange:(e)=>handelChangePincode(e,index), required: "Pin Code is require",  maxLength: { value: 6, message: "Please put valid pin code." },
                 minLength: { value: 6, message: "Please put valid pin code." }}) } />
               <Loader show = {isLoaderPincode}/>
                {errors?.allAddress?.[index]?.[`address${index+1}`]?.postcode && (
                    <p className="errorMsg">{errors?.allAddress?.[index]?.[`address${index+1}`]?.postcode.message}</p>
                  )}
             </div>
                {/* //State */}
              <div className="form-control">
                <label>State</label>
                <input  readOnly {...register(`allAddress.${index}.address${index+1}.state`) } />
              </div>
              {/* //City */}
              <div className="form-control">
                <label>City</label>
                <input readOnly {...register(`allAddress.${index}.address${index+1}.city`) } />
              </div>

            
            </div>
          })
        }
       
        <button type='submit' className="submitBtn">Submit</button>                                             
      </form>
    );
}

export default AddEdit;
