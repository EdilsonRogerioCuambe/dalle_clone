import React from 'react';
import { download } from '../assets';
import { downloadImage } from '../utils';

const Card = ({ _id, name, prompt, photo }) => {
    return (
        <div
            className='rounded-xl relative shadow-card group hover:shadow-card-hover card'
        >
            <img
                className='w-full h-auto object-cover rounded-xl'
                src={photo}
                alt={name}
            />
            <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute 
                bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md'>
                <p className='text-white text-md overflow-y-auto prompt'>
                    {prompt}
                </p>
                <div className='mt-5 flex justify-between items-center gap-2'>
                    <div className='flex items-center gap-2'>
                        <div className='w-7 h-7 flex justify-center rounded-full 
                            object-cover bg-green-700 items-center text-white text-xs font-bold'>
                            {name[0]}
                        </div>
                        <p className='text-white text-sm'>
                            {name}
                        </p>
                    </div>
                    <button
                        className='outline-none bg-transparent border-none'
                        onClick={() => downloadImage(_id, photo)}
                    >
                        <img
                            className='w-6 h-6 object-contain invert'
                            src={download}
                            alt='download'
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card