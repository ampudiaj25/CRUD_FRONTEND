import React from 'react';
import { useForm } from 'react-hook-form';
import '../CSS/App.css';

const FormularioPersona = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:8081/api/personas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      if (response.status === 200) {
        reset();
        alert('Persona registrada');
        console.log(response);

      } else {
        alert('Error al crear persona');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div className='App-header'>
      <h2>Crear Persona</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        <label>Cédula:</label>
        <input 
        type="text"
         {...register('cedula', 
         { required: 'Este campo es requerido',
           pattern: {
            value: /^[0-9]*$/,
            message: 'Debe ser un valor numerico',
           }, 
          })}
          />
        {errors.cedula && <p>{errors.cedula.message}</p>}

        <label>Nombre:</label>
        <input 
        type="text"
        {...register('nombre', 
        { required: 'Este campo es requerido' }
        )} 
        />
        {errors.nombre && <p>{errors.nombre.message}</p>}

        <label>Apellidos:</label>
        <input 
        type="text" 
        {...register('apellidos',
        { required: 'Este campo es requerido' }
        )}
        />
        {errors.apellidos && <p>{errors.apellidos.message}</p>}

        <label>Teléfono:</label>
        <input 
        type="text" 
        {...register('telefono', 
        { required: 'Este campo es requerido',
        pattern: {
         value: /^[0-9]*$/,
         message: 'Debe ser un valor numerico',
        }, 
       })}
        />
        {errors.telefono && <p>{errors.telefono.message}</p>}

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default FormularioPersona;
