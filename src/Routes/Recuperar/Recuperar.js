import React, {useState} from "react";
import { useHistory, useParams } from "react-router-dom";

// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useSelector, useDispatch } from 'react-redux'
import {
    CambiarContraseniaReducer
} from '../../Redux/Actions/Recuperar/Recuperar'
import cogoToast from 'cogo-toast';

function SignIn() {

    const { urltoken } = useParams();
    const dispatch = useDispatch()
    const history = useHistory();
    // Chakra color mode
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
    const textColorBrand = useColorModeValue("brand.500", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
    const googleText = useColorModeValue("navy.700", "white");
    const googleHover = useColorModeValue(
        { bg: "gray.200" },
        { bg: "whiteAlpha.300" }
    );
    const googleActive = useColorModeValue(
        { bg: "secondaryGray.300" },
        { bg: "whiteAlpha.200" }
    );
    const [show, setShow] = React.useState(false);
    const [loadingButton, setLoadingButton] = React.useState(false);
    const [txtContrasenia, setTxtContrasenia] = React.useState("");
    const [txtContraseniaDos, setTxtContraseniaDos] = React.useState("");

    const handleClick = () => setShow(!show);
    return (
        <DefaultAuth illustrationBackground={illustration} image={illustration}>
        <Flex
            maxW={{ base: "100%", md: "max-content" }}
            w='100%'
            mx={{ base: "auto", lg: "0px" }}
            me='auto'
            h='100%'
            alignItems='start'
            justifyContent='center'
            mb={{ base: "30px", md: "60px" }}
            px={{ base: "25px", md: "0px" }}
            mt={{ base: "40px", md: "14vh" }}
            flexDirection='column'>
            <Box me='auto'>
            <Heading color={textColor} fontSize='36px' mb='10px'>
                Recuperar
            </Heading>
            <Text
                mb='36px'
                ms='4px'
                color={textColorSecondary}
                fontWeight='400'
                fontSize='md'>
                Ingresa tu nueva contraseña
            </Text>
            </Box>
            <Flex
            zIndex='2'
            direction='column'
            w={{ base: "100%", md: "420px" }}
            maxW='100%'
            background='transparent'
            borderRadius='15px'
            mx={{ base: "auto", lg: "unset" }}
            me='auto'
            mb={{ base: "20px", md: "auto" }}>
            <FormControl>
                <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
                Contraseña<Text color={brandStars}>*</Text>
                </FormLabel>
                <InputGroup size='md'>
                    <Input
                        isRequired={true}
                        variant='auth'
                        fontSize='sm'
                        ms={{ base: "0px", md: "0px" }}
                        type={show ? "text" : "password"}
                        placeholder='Min. 8 caracteres'
                        mb='24px'
                        fontWeight='500'
                        size='lg'
                        // style={{
                        //     borderColor : 'red'
                        // }}
                        onChange={(e) => {
                            setTxtContrasenia(e.target.value)
                        }}
                        value={txtContrasenia}
                    />
                    <InputRightElement display='flex' alignItems='center' mt='4px'>
                        <Icon
                        color={textColorSecondary}
                        _hover={{ cursor: "pointer" }}
                        as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                        onClick={handleClick}
                        />
                    </InputRightElement>
                </InputGroup>
                <FormLabel
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                display='flex'>
                Repite tu contraseña<Text color={brandStars}>*</Text>
                </FormLabel>
                <InputGroup size='md'>
                <Input
                    isRequired={true}
                    fontSize='sm'
                    placeholder='Min. 8 caracteres'
                    mb='24px'
                    size='lg'
                    type={show ? "text" : "password"}
                    variant='auth'
                    onChange={(e) => {
                        setTxtContraseniaDos(e.target.value)
                    }}
                    style={ txtContrasenia && txtContrasenia != txtContraseniaDos ?{
                        borderColor : 'red'
                    }:{}}
                    value={txtContraseniaDos}
                />
                <InputRightElement display='flex' alignItems='center' mt='4px'>
                    <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                    />
                </InputRightElement>
                </InputGroup>
                <Button
                    fontSize='sm'
                    variant='brand'
                    fontWeight='500'
                    w='100%'
                    h='50'
                    mb='24px'
                    onClick={async() => {
                        console.log(urltoken);
                        setLoadingButton(true)
                        const rpta = await dispatch(CambiarContraseniaReducer(urltoken, txtContrasenia))
                        setLoadingButton(false)
                        if(rpta.respuesta == true){
                            cogoToast.success(
                                rpta.message,
                                {
                                    position: 'top-right',
                                    heading: 'Contraseña reiniciada'
                                },
                            );

                            history.push('/auth/sign-in/default');
                        }
                    }}
                    isLoading={loadingButton}
                    loadingText='Cambiando'
                >
                    Cambiar Contraseña
                </Button>
            </FormControl>
            </Flex>
        </Flex>
        </DefaultAuth>
    );
}

export default SignIn;
