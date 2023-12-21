import React, {useEffect, useState} from 'react'
import { Avatar, Space } from 'antd';
import { UserOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import {
    LoginReducer
} from '../../Redux/Actions/Login/Login'

const Top = () => {

    const disptach = useDispatch()

    const [showCerrar, setShowCerrar] = useState(false)
    
    useEffect(() => {
        disptach(
            LoginReducer(
                localStorage.getItem('req_usucorreo'),
                localStorage.getItem('req_usucontrasenia')
            )
        )
    },[])

    const {
		rex_usuario_seleccionado
    } = useSelector(({login}) => login)

    return (
        <div
            style={{
                display: 'flex',
                alignItems: "center",
                width: "100%",
                justifyContent: "right",
                position: 'relative'
            }}
        >
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            <div 
                style={{marginLeft:'10px', display:'flex', cursor: 'pointer'}}
                onClick={() => {
                    setShowCerrar(!showCerrar)
                }}
            >
                <div>
                    {/* Cerrar Sesión */}
                    {rex_usuario_seleccionado?.usunombre}
                </div>
                <div
                    style={{
                        marginLeft:'5px'
                    }}
                >
                    <CaretDownOutlined />
                </div>
            </div>

            {
                showCerrar
                ?<div
                    style={{
                        width: '120px',
                        height: '40px',
                        background: 'white',
                        position: 'absolute',
                        top : '40px',
                        right: '0',
                        boxShadow: "0px 2px 12px 0px rgba(180, 192, 234, 0.40)",
                        borderRadius:'8px',
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <div
                        style={{
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            localStorage.clear()
                            window.location.reload()
                        }}
                    >
                        Cerrar Sesión
                    </div>
                </div>
                :null
            }
        </div>
    )
}

export default Top