import React, {useState, useEffect, Component}  from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const Proposta = ( {route, navigation}, props) => {

const confirmacao = () => {

  navigation.navigate('ConfirmacaoAgendamento',
  {
    dataInicio: date
           
  });
}

const datecal = () => {
  navigation.navigate('DateCal');
}

  //Fonte de letra
  const [isLoadingComplete, setLoadingComplete, isDatePickerVisible, 
            setDatePickerVisibility] = useState(false);

  //Datetimepicker
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (selectedDate) => {
    //Variável que guarda a data e horário em formato de objeto Date
    const currentDate = new Date(selectedDate.nativeEvent.timestamp);
    setShow(Platform.OS === 'ios');
    
    //Atualiza o state  
    setDate(currentDate);

    //mostra no console o que foi selecionado
    console.log(currentDate)
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };         

  //Fonte
    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setLoadingComplete)}
            />
        );
    }

    async function loadResourcesAsync() {
      await Promise.all([
          Font.loadAsync({
              'montserrat-regular-texto': require('../assets/montserrat/Montserrat-Regular.ttf'),
              'montserrat-titulo': require('../assets/montserrat/Montserrat-Light.ttf'),
              'montserrat-titulo-magro': require('../assets/montserrat/Montserrat-Thin.ttf'),
              'montserrat-negrito': require('../assets/montserrat/Montserrat-SemiBold.ttf')
          }),
      ]);
  }

    function handleLoadingError(error) {
      console.warn(error);
    }

    function handleFinishLoading(setLoadingComplete) {
      setLoadingComplete(true);
    }

  //Iniciando visual
  return (
    <View style={styles.container}>
      <View style={styles.container_card}>
        <Text style={styles.text_title}>QUASE LÁ</Text>
        <Text style={styles.text_card}> 
          Nos informe a data e horário de início e término do acompanhamento.
        </Text>
  
        <View style={styles.container_information}>
        <TouchableOpacity
         style={styles.button_agendar}
          onPress={datecal}>
          <Text style={styles.text_information}>
            Selecionar data e horário.
          </Text>
        </TouchableOpacity>
        <Text style={styles.text_pagamento}>
          Forma de Pagamento
        </Text>
        <Image
            style={styles.image_money}
            source={require('../assets/images/money.png')}
          />
           <Image
            style={styles.image_card}
            source={require('../assets/images/card.png')}
          />
        </View>
        <Text style={styles.text_valor}>
          Valor Total: R$ 
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button_agendar}
        onPress={confirmacao}
        >
        <Text style={styles.text_agendar}>AGENDAR</Text>
      </TouchableOpacity>
    </View>
  );
}

//Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textTitle: {
    fontSize: 27,
    fontFamily: 'montserrat-regular-texto',
    paddingBottom: 20,
  },

  text_title: {
    fontSize: 21,
    paddingBottom: 20,
    fontFamily: 'montserrat-negrito',
    textAlign: 'center',
    paddingTop: 20,
    color: '#005E80',
  },

  text_card: {
    fontSize: 18,
    fontFamily: 'montserrat-titulo',
    textAlign: 'center',    
    height: 60, 
  },

  text_information: {
    fontSize: 20,
    fontFamily: 'montserrat-regular-texto',
    textAlign: 'center',
    color: '#005E80',
    letterSpacing: 1,
    marginTop: 20,
  },

  text_fim: {
    fontSize: 20,
    fontFamily: 'montserrat-regular-texto',
    textAlign: 'center',
    color: '#005E80',
    letterSpacing: 1,
    marginBottom: 30,
    paddingTop: 10,
  },

  text_pagamento: {
    fontSize: 20,
    fontFamily: 'montserrat-regular-texto',
    textAlign: 'center',
    color: '#005E80',
    letterSpacing: 1,
    marginTop: 20,
  },

  text_valor: {
    fontSize: 20,
    fontFamily: 'montserrat-regular-texto',
    marginLeft: 50,
    color: '#005E80',
    letterSpacing: 1,
    marginTop: 10,
  },

  text_agendar: {
    fontSize: 18,
    fontFamily: 'montserrat-regular-texto',
    textAlign: "center",
    color: '#005E80',
    letterSpacing: 1,
    marginTop: 10,
  },

  container_card: {
    backgroundColor: "#fff",
    height: 530,
    width: 380,
    borderWidth: 1,
    borderColor: '#005E80',
    marginTop: 30,
  },

  container_information: {
    height: 350,
    width: 300,
    alignSelf: 'center',
  },

  container_btn: {
    width: 300,
    top: 20,
    borderRadius: 80,
  },

  image: {
    width: 20,
    height: 20,
    marginLeft: 190,
    marginVertical: -20,
},

image_money: {
  width: 70,
  height: 70,
  marginLeft: 80,
},

image_card: {
  width: 70,
  height: 70,
  marginLeft: 180,
  marginVertical: -70,
},

image_fim: {
  width: 35,
  height: 35,
  marginLeft: 180,
  marginVertical: -60,
  marginBottom: -5,
},

datepicker: {
  marginTop: 30,
  marginBottom: 10,
},

datepicker_fim: {
  width: 280,
  alignSelf: "center",
  paddingTop: 10,
},

button_agendar: {
  width: 300,
  height: 50,
  borderColor: '#005E80',
  borderWidth: 2,
  borderRadius: 20,
  marginTop: 20,
  textAlign: "center",
},

});

export default Proposta;