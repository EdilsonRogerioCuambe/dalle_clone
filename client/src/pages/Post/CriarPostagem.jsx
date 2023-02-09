import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../../assets';
import { getRandomPrompt } from '../../utils';
import { FormField, Loader } from '../../components';

const CriarPostagem = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: '',
    });

    const [gerando, setGerando] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.prompt && form.photo) {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8080/api/v1/postagem', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                });

                await response.json();

                navigate('/');
            } catch (err) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        } else {
            alert('Por favor, preencha todos os campos!');
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({
            ...form,
            prompt: randomPrompt,
        });
    }

    const gerarImagem = async () => {
        if (form.prompt) {
            try {
                setGerando(true);
                const response = await fetch('http://localhost:8080/api/v1/dalle', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prompt: form.prompt }),
                });

                const data = await response.json();

                setForm({
                    ...form,
                    photo: `data:image/jpeg;base64,${data.photo}`
                });
            } catch (err) {
                alert(err.message)
            } finally {
                setGerando(false);
            }
        } else {
            alert('Por favor, digite um prompt valido!');
        }
    };

    return (
        <section
            className='max-w-7xl mx-auto'
        >
            <div>
                <h2 className='font-extrabold text-[#222328] text-[32px]'>
                    Crie
                </h2>
                <p
                    className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'
                >
                    Crie sua própria postagem com a ajuda da inteligência artificial DALL-E.
                </p>
            </div>
            <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-5'>
                    <FormField
                        labelName="Seu nome"
                        type="text"
                        name="name"
                        placeholder="Ex. Edilson Cuambe"
                        value={form.name}
                        handleChange={handleChange}
                    />
                    <FormField
                        label='Descrição'
                        name='prompt'
                        value={form.prompt}
                        placeholder='A modern, sleek Cadillac drives along the Gardiner expressway with downtown Toronto in the background, with a lens flare, 50mm photography'
                        type='text'
                        handleChange={handleChange}
                        isSupriseMe
                        handleSurpriseMe={handleSurpriseMe}
                    />
                    <div className='relative bg-gray-50 border border-gray-300 
                        text-gray-900 text-sm rounded-lg focus:ring-blue-500
                        focus:border-blue-500 w-64 p-2 h-64 flex justify-center items-center'
                    >
                        {form.photo ? (
                            <img
                                src={form.photo}
                                alt={form.prompt}
                                className='w-full h-full object-contain'
                            />
                        ) : (
                            <img
                                src={preview}
                                alt='preview'
                                className='w-9/12 h-9/12 object-contain opacity-40'
                            />
                        )}
                        {gerando && (
                            <div className='absolute inset-0 z-0 flex justify-center 
                                items-center bg-black/[.5] rounded-lg'>
                                <Loader />
                            </div>
                        )}
                    </div>
                </div>
                <div className='mt-5 flex gap-5'>
                    <button
                        onClick={gerarImagem}
                        type='button'
                        className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5'
                    >
                        {
                            gerando ? 'Gerando...' : 'Gerar'
                        }
                    </button>
                </div>
                <div className='mt-10'>
                    <p className='mt-2 text-[#666e75] text-[16px]'>
                        Uma vez criada a photo, voce pode compartilhar com a comunidade!
                    </p>
                    <button
                        className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5'
                        type='submit'
                    >
                        {
                            loading ? 'Carregando...' : 'Compartilhar'
                        }
                    </button>
                </div>
            </form>
        </section>
    )
}

export default CriarPostagem;