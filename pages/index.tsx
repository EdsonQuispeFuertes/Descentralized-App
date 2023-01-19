import type { NextPage } from 'next'
import Head from 'next/head'
import { VStack, HStack, Heading, Text, Button, Input, Box, Spacer, Spinner } from '@chakra-ui/react'
import React from 'react'
import { load } from '../src/funcs';

const Home: NextPage = () => {
  const [origen, setOrigen] = React.useState<string>('');
  const [destino, setDestino] = React.useState<string>('');
  const [refresh, setRefresh] = React.useState<boolean>(true);
  const [addressAccount, setAddresAccount] = React.useState<any>(null);
  const [contract, setContract] = React.useState<any>(null);
  const [viajes, setViajes] = React.useState<any[]>([]);

  // Handlers
  
  const handleOrigenChange = (e:any) => setOrigen(e.currentTarget.value);
  const handleDestinoChange = (e:any) => setDestino(e.currentTarget.value);

  const handleAddViaje = async () => {
    console.log(contract)
    await contract.createViaje(origen, destino, {from: addressAccount});
    setOrigen('');
    setDestino('');
    setRefresh(true);
  };

  const handleToggled = async (id: number) => {
    await contract.toggleCompleted(id, {from: addressAccount});
    setRefresh(true);
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  


  // React useEffect

  React.useEffect(() => {
    if (!refresh) return;
    setRefresh(false);
    load().then((e) => {
      console.log(e)
      setAddresAccount(e.addressAccount);
      setViajes(e.viajes);
      setContract(e.todoContract);
    });
  });

  return (
    <VStack>
        <Head>
          <title>Crea tu Viaje</title>
          <meta name="description" content="Blockchain Taxi." />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <HStack w='full'>
          <Spacer />
          <VStack>
            <Heading>Blockchain Safe Taxi</Heading>
            <Box h='30px'/>
            <HStack w='md'>
              <Input
              type='text'
              size='md'
              placeholder='Ubicacion Origen...'
              onChange={handleOrigenChange}
              value={origen}
              />
              <Input
              type='text'
              size='md'
              placeholder='Ubicacion Destino...'
              onChange={handleDestinoChange}
              value={destino}
              />
              <Button onClick={handleAddViaje} bg='green.200'>ADD</Button>
            </HStack>

            <Box h='30px' />
            <Text>Viajes</Text>
            {
              viajes == null ? <Spinner />
              : viajes.map((viaje, idx) => !viaje[3] ?
              <HStack key={idx} w='md' bg='gray.100' borderRadius={7}>
                <Box w='5px' />
                <Text>{viaje[2]}</Text>
                <Spacer />
                <Button bg='green.300' onClick={ () => handleToggled(viaje[0].toNumber()) }>Finalizar</Button>
              </HStack> : null
              )
            }
            <Box h='10px' />
            <Text>Viajes finalizados</Text>
            {
              viajes == null ? <Spinner /> :
              viajes.map((viaje, idx) => viaje[3] ?
              <HStack key={idx} w='md' bg='gray.100' borderRadius={7}>
                <Box w='5px' />
                <Text>{viaje[2]}</Text>
                <Spacer />
                <Button bg='red.300' onClick={ () => handleToggled(viaje[0].toNumber() ) }>Finalizado</Button>
              </HStack> : null
              )
            }
          </VStack>

          <Spacer />
        </HStack>
    </VStack>
  )
}

export default Home