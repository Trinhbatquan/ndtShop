import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Loading from './../../loadingToast/Loading';
import { getNewsById } from '../../../api';
import { GetDataToContext } from '../../../context/ProviderContext';
import { setNewId } from '../../../context/reducer';

const DetailNews = () => {
  const [loading, setLoading] = useState(false)

  const {state, dispatch} = GetDataToContext()
  const {newId} = state;
  console.log(newId)

    const id = useParams();
    useEffect(() => {
      getNewsById(id.id).then((New) => {
        dispatch(setNewId(New))
        setLoading(true)
      })
    }, [])

  return (
    <div className='w-4/5 border border-gray-300 rounded-lg shadow-lg backdrop-blur-lg mx-auto'>

    {
      loading ? (<>
                <div className='flex flex-col p-2 bg-slate-200'>
                    <p className='text-lg font-semibold'>{newId?.title}</p>
                    <img src={newId?.imageUrl}  alt="None" className='w-3/5 object-cover mx-auto mt-2 mb-2'/>
                    <p className='text-headingColor px-3 mt-2 text-sm'>
                        {newId?.content}
                    </p>
                        
                </div>
      </>) : <Loading />
    }
    </div>
  )
}

export default DetailNews
