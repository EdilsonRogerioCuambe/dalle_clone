import React, { useState, useEffect } from 'react';

import { Loader, Card, FormField } from '../../components';

const RenderCards = ({ data, name }) => {
    if (data?.length > 0) return data.map((postagem) => <Card key={postagem._id} {...postagem} />);

    return (
        <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>
            {name}
        </h2>
    );
}

const Home = () => {

    const [loading, setLoading] = useState(false);
    const [todosPosts, setTodosPosts] = useState(null);
    const [pesquisa, setPesquisa] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8080/api/v1/postagem', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    setTodosPosts(result.data.reverse());
                }
            } catch (err) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    return (
        <section
            className='max-w-7xl mx-auto'
        >
            <div>
                <h1 className='font-extrabold text-[#222328] text-[32px]'>
                    A Vitrine da Comunidade
                </h1>
                <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
                    Navegue por uma coleção de imagens imaginativas deslumbrantes geradas pela inteligência artificial DALL-E!
                </p>
            </div>
            <div className='mt-16'>
                <FormField />
            </div>
            <div className='mt-10'>
                {
                    loading ? (
                        <div className='flex justify-center items-center'>
                            <Loader />
                        </div>
                    ) : (
                        <>
                            {pesquisa && (
                                <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                                    Mostrando resultados para <span className='text-[#222328]'>{pesquisa}</span>
                                </h2>
                            )}
                            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1 gap-3'>
                                {pesquisa ? (
                                        <RenderCards
                                            data={todosPosts}
                                            name='Nenhum resultado encontrado'
                                        />
                                    ) : (
                                        <RenderCards
                                            data={todosPosts}
                                            name='Nenhum post encontrado'
                                        />
                                    )}
                            </div>
                        </>
                    )}
            </div>
        </section>
    )
}

export default Home;