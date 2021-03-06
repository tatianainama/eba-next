import { useForm } from 'react-hook-form';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Distributor, getHeadquarters } from 'lib/distributors';
import { FunctionComponent, useState } from 'react';

import Input from 'components/input';
import WhatsappIcon from 'components/whatsapp';

type Inputs = {
  name: string,
  email: string,
  content: string
};

const Contacto: FunctionComponent<InferGetStaticPropsType<typeof getStaticProps>>  = ({ headquarters }) => {
  const { register, handleSubmit, errors, reset } = useForm<Inputs>();
  const onsubmit = (data: Inputs) => {
    const request = new Request('/contact', {method:  'POST', body: JSON.stringify(data)});
    fetch(request)
    .then(response => {
      if (response.ok) {
        setResponse({
          message: 'Su mensaje ha sido en viado, nuestro equipo respondera su consulta a la brevedad',
          show: true,
          error: false,
        });
        reset();
      } else {
        setResponse({
          message: 'Hubo un error al enviar el mensaje. Por favor intente nuevamente. Si el error continua, por favor comuniquese por telefono',
          show: true,
          error: true
        });
      }
    });
  };
  const [response, setResponse] = useState({
    message: 'Su mensaje ha sido en viado, nuestro equipo respondera su consulta a la brevedad',
    show: false,
    error: false,
  });

  return (
    <>
      <div className="eba-contact">
        <div className="eba-contact__banner">
        </div>
        <div className="eba-contact__bg mdl-cell--hide-phone mdl-cell--hide-tablet"></div>
        <div className="eba-contact__form mdl-shadow--2dp">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet mdl-cell--4-col-phone">
              <h4>Contacto directo</h4>
              <div className="">
                <div className="">
                  <h5>Horarios de atencion</h5>
                  <ul>
                    <li>
                      <div>Lunes a Viernes: 9:00hs - 18:00hs</div>
                    </li>
                    <li>
                      <div>Sabado, domingos y feriados: <i>Cerrado</i></div>
                    </li>
                  </ul>
                </div>
                <div className="">
                  <h5>Direccion</h5>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.8647274129094!2d-58.44025004840602!3d-34.60758198036267!2m3!1f0!2f0!3f0!3m2!i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca6c8dad9245%3A0x8985011c07c0b099!2sEspec%C3%ADficos%20Buenos%20Aires!5e0!3m2!1sen!2snl!4v1596700935162!5m2!1sen!2snl"  height="100" frameBorder="0"></iframe>
                  <div>
                    <a target="_blank" href="https://www.google.com/maps/place/Espec%C3%ADficos+Buenos+Aires/@-34.6075338,-58.4378541,17z/data=!4m14!1m8!3m7!1s0x95bcca6c8dad9245:0x8985011c07c0b099!2sEspec%C3%ADficos+Buenos+Aires!8m2!3d-34.607582!4d-58.438056!14m1!1BCgIgAQ!3m4!1s0x95bcca6c8dad9245:0x8985011c07c0b099!8m2!3d-34.607582!4d-58.438056">
                      {headquarters.address}, {headquarters.place} - {headquarters.province}<br/>
                    </a>
                  </div>
                </div>
                <div className="">
                  <h5>Telefonos</h5>
                  <ul className="eba-phones">
                    {
                      headquarters.phone.map((phone, key) => (
                        <li key={key}><a href={`tel:${phone}`}>{phone}</a></li>
                      ))
                    }
                    {headquarters.whatsapp && (<li><WhatsappIcon phone={headquarters.whatsapp} withText/></li>)}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet mdl-cell--4-col-phone">
              <h4>Consultas</h4>
              <p>Un equipo de profesionales esta a su servicio para responder sus consultas.</p>
              
              <form onSubmit={handleSubmit(onsubmit)}>
                <Input name='name' label="Nombre" ref={register({ required: true })} error={!!errors.name}>
                  { errors.name && <span className="eba-error">Campo requerido</span>}
                </Input>

                <Input name='email' type='email' label="Email" ref={register({ required: true })} error={!!errors.email}>
                  { errors.email && <span className="eba-error">Campo requerido</span>}
                </Input>

                <Input name='content' tag='textarea' label='Mensaje' ref={register({required: true})} error={!!errors.content}>
                  { errors.content && <span className="eba-error">Campo requerido</span>}
                </Input>

                { response.show && (
                  <div className={`eba-message ${response.error ? 'eba-error' : 'eba-confirmation'}`}>
                    <p>{response.message}</p>
                  </div>
                )}
                <button className="mdl-button mdl-button--raised mdl-button--accent" type="submit">enviar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .eba-contact {
          position: relative;
          display: flex;
          flex-direction: column;
          flex: 2 0 100vh;
        }
        .eba-contact h4 {
          font-size: 1.5rem;
        }
        .eba-contact h5 {
          font-size: 1rem;
        }
        .eba-contact__banner {
          background-image: url(/contacto.jpg);
          flex: 1 0 50vh;
          background-size: cover;
          background-position: 50% 25%;
        }
        .eba-contact__bg {
          flex: 1 0 50vh;
        }
        .eba-contact__form {
          position: absolute;
          background: white;
          width: 75%;
          top: 25%;
          left: calc((25%/2) - 42px);
          padding: 42px;
        }
        .eba-contact__form ul {
          padding-left: 2rem;
        }
        .eba-contact__form a {
          margin-right: 5px;
          text-transform: capitalize;
        }

        .eba-contact__form .mdl-button {
          margin-top: 1rem;
        }
        .eba-contact__form .eba-message {
          font-weight: 600;
        }
        .eba-contact__form .eba-error {
          color: var(--errorColor);
          font-style: italic;
        }
        .eba-contact__form .eba-confirmation {
          color: var(--successColor);
        }

        @media screen and (max-width: 839px) {
          .eba-contact__form {
            position: static;
            width: auto;
            padding: 16px;
          }
        }
      `}</style>
    </>
  );
}

export const getStaticProps: GetStaticProps<{ headquarters: Distributor}> = async () => {
  return {
    props: {
      headquarters: getHeadquarters()
    }
  }
}

export default Contacto;