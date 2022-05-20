import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { baseUrl } from '../networkVariable'
import axios from 'axios'
import Overlay from '../Component/Overlay'
import parse from 'html-react-parser'

export default function About() {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [item, setItem] = useState({about_title: '', about_content: ''});

    useEffect(()=>{
        fetchData()
    }, [])

    const fetchData = () =>{
        setLoading(true);
        axios({
            url: baseUrl + "/about"
        })
        .then((response)=>{
            setItem(response.data)
            setLoading(false);
        })
        .catch((error)=>{
            console.log(error);
            setError(error.message);
            setLoading(false);
        })
    }

    return (
        <>
        {isLoading || error !== null ? <Overlay isLoading={isLoading} message={error === null ? "กำลังโหลด": error}/>: ''}
        <div className="content">
            <Container>
                <div className="head-title">{item.about_title}</div>
                <div>
                    {parse(item.about_content)}
                </div>
            </Container>
        </div>
        </>
    )
}
