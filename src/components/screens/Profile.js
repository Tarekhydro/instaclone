import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from '../../App';

const Profile = () => {
    const [profile, setProfile] = useState([])
    const [photos, setPhoto] = useState([])
    const {state, dispatch} = useContext(UserContext)
    
    useEffect(()=>{
        fetch('/mypost', {
        headers:{
            "Authorization": "Bearer " + localStorage.getItem('jwt')
        }
        }).then(res => res.json())
        .then(result=>{
            setProfile(result.resallpost)
        })
    },[])
    useEffect(()=>{
        fetch('/userphoto', {
            headers:{
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
        .then(result=>{
            const localstore = localStorage.getItem('user')
            const storage = JSON.parse(localstore)
            result.map((res)=>{
                if(res.id === storage.id && res.name===storage.name){
                    setPhoto(res)
                }
            })
            //setPhoto(result)
        })
    }, [])

    return(
        <div className="profileclass">
            <div style={{
                display:"flex", 
                justifyContent:"space-around",
                margin: "18px 0px",
                borderBottom:"1px solid grey"
                }}>
                <div>
                    <img alt="persona" style={{width:"160px", height:"160px", borderRadius:"80px"}} 
                    src={photos.url}/>
                </div>
                <div>
                    <h4>{state?state.name:"loading"}</h4>
                    <div style={{
                        display:"flex",
                        justifyContent:"space-between",
                        width:"110%"
                    }}>
                        <h6>40 posts</h6>
                        <h6>40 followers</h6>
                        <h6>40 following</h6>
                    </div>
                </div>
            </div>
                    
            <div className="gallery">
                {
                    profile.map(userprofile => {
                        return(
                            <img key={userprofile.id} className="item" alt={userprofile.title} src={userprofile.photo} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Profile;