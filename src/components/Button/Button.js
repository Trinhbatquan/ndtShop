import React from 'react'
import {AiOutlineDown} from 'react-icons/ai'
import {bgColors} from '../../util/style'



const Button = ({type, text, onClickEvent}) => {


  // const onClickEvent = () => {
    
  // }

  const bgColor = bgColors[Math.floor(Math.random() * bgColors.length)];

  return (
    <button className={`outline-none text-sm rounded-sm 
    ${type === "primary" 
    && "bg-white mr-10 h-8 w-24 text-black hover:opacity-80"} ${type==="danger" 
    && "h-8 mr-10 w-24 bg-red-600 text-white hover:opacity-80"} ${type === "price" 
    && "bg-white text-black mr-10 hover:opacity-80 h-8 w-16 flex items-center justify-center"}`}
    style={type === "others" ? {backgroundColor: bgColor, lineHeight: "16px", height: "40px", padding:'5px 2px', minWidth: "96px",overflow: 'hidden', 
    display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: '2', borderRadius: '3px', marginRight: '30px'} : {}}
    // onClick={() => onClickEvent()}
    >
      {text.length > 20 ? `${text.slice(0,20)}...` : text}
      {type === "price" ? <AiOutlineDown className='text-xs ml-1'/> : undefined}
    </button>
  )
}

export default Button
