import React, { useState,useEffect } from 'react';

const Home = () => {
    const [data, setData] = useState([]);
    useEffect(()=>{
        fetch('https://tarek-bg.com/instaclone/allpost', {
            headers:{
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
        .then(result=>{
            setData(result.resallpost)
        })
    }, []) 
    return(
        <div className="home">
            {
                data.map((item)=> {
                    return(
                        <div className="card home-card" key={item.id}>
                            <h5 className="title-home">{item.username}</h5>
                            <div className="card-image">
                                <img alt={item.id} src={item.photo}/>
                            </div>
                            <div className="card-content">
                                <i className="material-icons" style={{color:"red", cursor:"pointer"}}>favorite</i>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home;
