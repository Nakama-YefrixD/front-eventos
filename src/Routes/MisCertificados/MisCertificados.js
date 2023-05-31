import React from 'react'
import Tablacertificados from './Tablacertificados'
import tableDataComplex from 'views/admin/dataTables/variables/tableDataComplex';

const MisCertificados = () => {
    return (
        <div>
            <br/>
            <br/>
            <br/>
            
            <div
                className='chakra-link css-jw2vrk'
                style={{
                    marginBottom:'15px'
                }}
            >
                Mis Certificados
            </div>
            
            <Tablacertificados tableData={tableDataComplex} />
            
        </div>
    )
}

export default MisCertificados