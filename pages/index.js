import Head from 'next/head';
import React from 'react';
import Image from 'next/image';
import {Container, Col, Row, Form, Button, Modal } from 'react-bootstrap';
import styles from '../styles/Home.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import { AiFillHeart } from 'react-icons/ai';
import 'swiper/css';
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Home() {

  const [show, setShow] = React.useState(false);
  const [valueField, setValueField] = React.useState('');
  const [dados, setDados] = React.useState('');

  React.useEffect(() => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    } 
        
    today = yyyy + '-' + mm + '-' + dd;

    document.getElementById("datefield").setAttribute("max", today);
    document.getElementById("datefield").setAttribute("value", today);
  });

  function handleChange(e){
    setValueField(e.target.value);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleSubmit(e){
    e.preventDefault();

    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=9vFUPdpIcXIE0H2VsTXDs6JSFATkzXH7hDZ6mkdT&date=${valueField}`);
    const json = await response.json();
    setDados(json);

    handleShow();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Descubra que foto a NASA tirou no dia do seu aniversário</title>
        <meta name="description" content="Descubra que foto a NASA tirou no dia do seu aniversário" />
      </Head>

      <main>
          <div className='box-conteudo'>
            <Swiper
              spaceBetween={30}
              effect={"fade"}
              loop={true}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, EffectFade, Navigation, Pagination]}
              className="mySwiper"
            >
              <SwiperSlide>
                <div className="img-slider" style={{backgroundImage:'url(/slider1.jpg)'}}></div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="img-slider" style={{backgroundImage:'url(/slider2.jpg)'}}></div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="img-slider" style={{backgroundImage:'url(/slider3.jpg)'}}></div>
              </SwiperSlide>
              <SwiperSlide>
              <div className="img-slider" style={{backgroundImage:'url(/slider4.jpg)'}}></div>
              </SwiperSlide>
            </Swiper>
            <div className='box-textos'>
              <Container>
                <Row className='justify-content-center'>
                  <Col xs="11" md='8'>
                    <h1>Descrubra qual foto foi tirada pela NASA no dia do seu aniversário</h1>
                    <p>Para revelar a foto, insira sua data de aniversário ou a data que preferir..</p>

                    <Form onSubmit={handleSubmit} className="form-style">
                      <Form.Group controlId="formBasicEmail">
                        <Form.Control id="datefield" type="date" placeholder="Enter email" min="1995-06-16" onChange={handleChange} />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Descobrir
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
      </main>

      <Modal show={show} onHide={handleClose} className='modal-style'>
        <Modal.Body>
          <h3 className='title-modal'>Aqui está a foto tirada na data: {valueField} pela NASA</h3>
          <img src={dados.url} className='img-fluid'/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button 
          href={dados.url}
          variant="primary"
          target="_blank"
          download>
            Baixar Imagem
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="copyright">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >Desenvolvido com <AiFillHeart className="icon"/> por <span>LBoarro</span>
        </a>
      </div>
    </div>
  )
}
