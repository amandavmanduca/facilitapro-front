import React, {useCallback, useState } from 'react'
import {useDropzone} from 'react-dropzone'
import './style.css';
import { FiUpload, FiWind } from 'react-icons/fi';
import { useEffect } from 'react';



const Dropzone = ({ onFileUploaded }) => {

    
  const[selectedFileUrl, setSelectedFileUrl] = useState('');
  

  const onDrop = useCallback(acceptedFiles => {
    
    const file = acceptedFiles[0];

    const fileUrl = URL.createObjectURL(file);

    setSelectedFileUrl(fileUrl);
    onFileUploaded(file);

  }, [onFileUploaded])

  const {getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: 'image/*'
    })


  return (
    <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} accept="image/*" />
        
        { selectedFileUrl ? 
        
          <img src={selectedFileUrl} alt="Point thumbnail" style={{maxWidth: 150 ,maxHeight: 150}} />

        : (
            <p><FiUpload /> Insira uma Foto Estilo 3X4 <br /> (Opcional)</p>
        )
        }
        
    </div>
    
  )
}

export default Dropzone;

