import React, {useState} from 'react'
import { 
    Box, AlertIcon, Alert, Input, Select, 
    RadioGroup , Radio, SimpleGrid,
    Button
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useHistory } from "react-router-dom";
import {
    RegistrarUsuarioReducer
} from '../../Redux/Actions/Administrador/GestionUsuarios'
import { useSelector, useDispatch } from 'react-redux'

const RegistrarUsuario = () => {

    const dispatch = useDispatch()

    const [selectTipoDocumento, setSelectTipoDocumento] = useState(1)
    const [txtRpta, setTxtRpta] = useState({})
    const [txtTipoDocumento, setTxtTipoDocumento] = useState("DNI")
    const [txtNumeroDocumento, setTxtNumeroDocumento] = useState("")
    const [in_nombre, setIn_nombre] = useState("")
    const [in_apellpater, setIn_apellpater] = useState("")
    const [in_apellmater, setIn_apellmater] = useState("")
    const [in_contrasenia, setIn_contrasenia] = useState("")
    const [in_coducs, setIn_coducs] = useState("")
    const [in_correo, setIn_correo] = useState("")
    const [in_fechanac, setIn_fechanac] = useState("")
    const [in_celular, setIn_celular] = useState("")
    const [in_rol, setIn_rol] = useState("")
    const [in_tipousuario, setIn_tipousuario] = useState("")
    const [cargandoBtn, setCargandoBtn] = useState(false)
    const [mostrarAlert, setMostrarAlert] = useState("0")
    const history = useHistory();

    return (
        <div>
            <br/>
            <br/>
            <br/>
            
            <Card>
            
            <div
                className='chakra-link css-jw2vrk'
                style={{
                    marginBottom:'15px',
                    display: 'flex'
                }}
            >
                <div
                    style={{
                        marginRight: '10px',
                        fontSize:'20px',
                        cursor: 'pointer',
                        marginTop: '-3px'
                    }}
                    onClick={() => {
                        history.push('/otros/gestion-usuarios');
                    }}
                >
                    <ArrowBackIcon />
                </div>
                Registrar Usuario
            </div>
            
            <SimpleGrid 
                columns={{ base: 1, md: 3 }} gap='20px'
                style={{
                    marginBottom: '40px'
                }}
            >
                <div></div>
                <div></div>
                <div></div>
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap='20px'>
                
                <div>
                    
                    <div>
                        <SimpleGrid columns={{ base: 1, md: 2 }} gap='20px'>
                            <div
                                style={{
                                    display: 'flex',
                                    marginBottom: '30px'
                                }}
                            >
                                <RadioGroup 
                                    style={{
                                        display: 'flex'
                                    }}
                                    onChange={(e) => {
                                        setSelectTipoDocumento(e)
                                        if(e == 1){
                                            setTxtTipoDocumento("DNI")
                                        }else{
                                            setTxtTipoDocumento("Carnet de Extranjeria")
                                        }
                                    }}
                                    value={selectTipoDocumento}
                                >
                                    <div
                                        style={{
                                            textAlign: 'center',
                                            justifyContent: 'center',
                                            display: 'flex'
                                        }}
                                    >
                                        <div
                                            style={
                                                selectTipoDocumento == 1
                                                ?{
                                                    borderRadius:'8px',
                                                    border: '1px solid #FF7435',
                                                    background: '#FFDED2',
                                                    paddingLeft:'40px',
                                                    paddingRight: '40px',
                                                    paddingTop:'8px',
                                                    paddingBottom: '8px',
                                                    display: "flex"
                                                }
                                                :{
                                                    borderRadius:'8px',
                                                    border: '1px solid black',
                                                    background: 'white',
                                                    paddingLeft:'40px',
                                                    paddingRight: '40px',
                                                    paddingTop:'8px',
                                                    paddingBottom: '8px',
                                                    display: "flex"
                                                }
                                            }
                                        >
                                            <Radio 
                                                size='sm' name='1' colorScheme='red'
                                                value='1'
                                            >
                                                DNI
                                            </Radio>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            textAlign: 'center',
                                            justifyContent: 'center',
                                            display: 'flex',
                                            marginLeft:'20px'
                                        }}
                                    >
                                        <div
                                            style={
                                                selectTipoDocumento == 2
                                                ?{
                                                    borderRadius:'8px',
                                                    border: '1px solid #FF7435',
                                                    background: '#FFDED2',
                                                    paddingTop:'8px',
                                                    paddingBottom: '8px',
                                                    display: "flex",
                                                    width: '180px',
                                                    justifyContent: "center"
                                                }
                                                :{
                                                    borderRadius:'8px',
                                                    border: '1px solid black',
                                                    background: 'white',
                                                    paddingTop:'8px',
                                                    paddingBottom: '8px',
                                                    display: "flex",
                                                    width: '180px',
                                                    justifyContent: "center"
                                                }
                                            }
                                        >
                                            <Radio 
                                                size='sm' name='1' colorScheme='red'
                                                value='2'
                                            >
                                                Carnet de extranjería
                                            </Radio>
                                        </div>
                                    </div>
                                </RadioGroup>
                            </div>
                        </SimpleGrid>
                    </div>
                    <div>
                        <div>
                            {
                                selectTipoDocumento == 1
                                ?<>
                                    Número DNI
                                </>
                                :<>
                                    Número Carnet
                                </>
                            }
                        </div>
                        <div
                            style={{
                                marginBottom: '10px'
                            }}
                        >
                            <Input 
                                variant='filled' placeholder='Número de DNI' 
                                onChange={(e) => {
                                    setTxtNumeroDocumento(e.target.value)
                                }}
                            />
                        </div>

                        <div>
                            Nombres
                        </div>
                        <div
                            style={{
                                marginBottom: '10px'
                            }}
                        >
                            <Input 
                                variant='filled' placeholder='Nombres' 
                                onChange={(e) => {
                                    setIn_nombre(e.target.value)
                                }}
                                value={in_nombre}
                            />
                        </div>

                        <div>
                            Apellido Paterno
                        </div>
                        <div
                            style={{
                                marginBottom: '10px'
                            }}
                        >
                            <Input 
                                variant='filled' placeholder='Apellido Paterno' 
                                onChange={(e) => {
                                    setIn_apellpater(e.target.value)
                                }}
                                value={in_apellpater}
                            />
                        </div>

                        <div>
                            Apellido Materno
                        </div>
                        <div
                            style={{
                                marginBottom: '10px'
                            }}
                        >
                            <Input 
                                variant='filled' placeholder='Apellido Materno' 
                                onChange={(e) => {
                                    setIn_apellmater(e.target.value)
                                }}
                                value={in_apellmater}
                            />
                        </div>
                    </div>

                    <div>
                        Contraseña
                    </div>
                    <div
                        style={{
                            marginBottom: '10px'
                        }}
                    >
                        <Input 
                            variant='filled' placeholder='Contraseña' type='password' 
                            onChange={(e) => {
                                setIn_contrasenia(e.target.value)
                            }}
                            value={in_contrasenia}
                        />
                    </div>

                </div>

                <div>
                    <div>
                        Código UCS
                    </div>
                    <div
                        style={{
                            marginBottom: '10px'
                        }}
                    >
                        <Input 
                            variant='filled' placeholder='Código UCS' 
                            onChange={(e) => {
                                setIn_coducs(e.target.value)
                            }}
                            value={in_coducs}
                        />
                    </div>

                    <div>
                        Correo
                    </div>
                    <div
                        style={{
                            marginBottom: '10px'
                        }}
                    >
                        <Input 
                            variant='filled' placeholder='Correo' 
                            onChange={(e) => {
                                setIn_correo(e.target.value)
                            }}
                            value={in_correo}
                        />
                    </div>

                    <div>
                        Fecha de Nacimiento
                    </div>
                    <div
                        style={{
                            marginBottom: '10px'
                        }}
                    >
                        <Input 
                            variant='filled' placeholder='Fecha de Nacimiento' 
                            onChange={(e) => {
                                setIn_fechanac(e.target.value)
                            }}
                            value={in_fechanac}
                        />
                    </div>

                    <div>
                        Celular
                    </div>
                    <div
                        style={{
                            marginBottom: '10px'
                        }}
                    >
                        <Input 
                            variant='filled' placeholder='Celular' 
                            onChange={(e) => {
                                setIn_celular(e.target.value)
                            }}
                            value={in_celular}
                        />
                    </div>

                    <div>
                        Rol
                    </div>
                    <div
                        style={{
                            marginBottom: '10px'
                        }}
                    >
                        <Select 
                            placeholder='Seleccionar Rol'
                            style={{
                                background: 'white'
                            }}
                            onChange={(e) => {
                                setIn_rol(e.target.value)
                            }}
                        >
                            <option value='Ponente'>Ponente</option>
                            <option value='Estudiante'>Estudiante</option>
                        </Select>
                    </div>

                    <div
                    >
                        <div>
                            Tipo de Usuario
                        </div>
                        <div>
                        <Select 
                            placeholder='Seleccionar Rol'
                            style={{
                                background: 'white'
                            }}
                            onChange={(e) => {
                                setIn_tipousuario(e.target.value)
                            }}
                        >
                            <option value="1">Admin</option>
                            <option value="2">Estudiante</option>
                            <option value="3">Ponente</option>
                        </Select>
                        </div>
                    </div>
                </div>
            </SimpleGrid>
            {
                
                mostrarAlert == "1"
                ?<Alert 
                    status="success" variant="subtle" 
                    flexDirection="row" alignItems="center" justifyContent="center"
                >
                    <AlertIcon boxSize={4} mr={2} />
                    {
                        txtRpta.mensaje
                    }
                </Alert>
                :mostrarAlert == "2"
                    ?<Alert 
                        status="warning" variant="subtle" 
                        flexDirection="row" alignItems="center" justifyContent="center"
                    >
                        <AlertIcon boxSize={4} mr={2} />
                        {
                            txtRpta.mensaje
                        }
                    </Alert>
                    :null
            }
            <SimpleGrid columns={{ base: 1, md: 1 }} gap='20px'>
                <div
                    style={{
                        textAlignLast: "center",
                        display: "flex",
                        justifyContent: "center",
                        marginTop:'40px'
                    }}
                >
                    <Button
                        style={{
                            background: '#4F4F4F',
                            borderRadius: '8px',
                            paddingLeft:'45px',
                            paddingRight:'45px',
                            paddingTop:'10px',
                            paddingBottom:'10px',
                            color:'white',
                            cursor: 'pointer'
                        }}
                        onClick={async () => {
                            
                            setCargandoBtn(true)
                            const rpta = await dispatch(RegistrarUsuarioReducer({
                                "req_tpuid" : in_tipousuario,
                                "req_tipo_documento_identididad" : txtTipoDocumento,
                                "req_numero_dni" : txtNumeroDocumento,
                                "req_codigo_ucs" : in_coducs,
                                "req_correo" : in_correo,
                                "req_fecha_nacimiento" : in_fechanac,
                                "req_celular" : in_celular,
                                "req_rol" : in_rol,
                                "req_nombre" : in_nombre,
                                "req_apell_paterno" : in_apellpater,
                                "req_apell_materno" : in_apellmater,
                                "req_contrasenia" : in_contrasenia,
                            }))
                            setTxtRpta(rpta)

                            if(rpta.respuesta == true){
                                setTxtNumeroDocumento("")
                                setIn_nombre("")
                                setIn_apellpater("")
                                setIn_apellmater("")
                                setIn_contrasenia("")
                                setIn_coducs("")
                                setIn_correo("")
                                setIn_fechanac("")
                                setIn_celular("")
                                setMostrarAlert("1")
                            }else{
                                setMostrarAlert("2")
                            }

                            setCargandoBtn(false)
                        }}
                        isLoading={cargandoBtn}
                    >
                        Registrar Usuario
                    </Button>
                </div>
            </SimpleGrid>
            </Card>
        </div>
    )
}

export default RegistrarUsuario