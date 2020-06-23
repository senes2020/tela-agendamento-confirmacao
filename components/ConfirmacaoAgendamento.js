import React, {useState, useEffect}  from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
const ConfirmacaoAgendamento = ( {navigation}, props) =>{

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('ConfirmacaoAgendamento')
        }, 3000)
    })
    
    const conclusaoAgendamento = () => {
      navigation.navigate('ConclusaoAgendamento');
    }

  //Fonte de letra
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  //Datetimepicker
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
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
        <Text style={styles.text_title}>CONFIRMAÇÃO</Text>
        <Text style={styles.text_card}> 
          Confirme se as informações estão corretas.
        </Text>
        <Text style={styles.text_nome}>
            Nome do (a) Companheiro(a):  
          </Text>
          <Text style={styles.text_profissional}>
          Stephanie Toledo
          </Text>
        <View style={styles.container_information}>
          <Text style={styles.text_information}>
            Início
          </Text>
          <Image
            style={styles.image}
            source={require('../assets/images/inicio.png')}
          />
        <View style={styles.datepicker}>
          <Button
          onPress={showDatepicker} title="Escolha a data para o início" />
        </View>
        <View style={styles.datepicker_fim}>
          <Button onPress={showTimepicker} title="Escolha o horário para o início" />
        </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}

        <Text style={styles.text_information_fim}>
            Fim
        </Text>
          <Image
            style={styles.image_fim}
            source={require('../assets/images/fim.png')}
          />
           <View style={styles.datepicker}>
        <Button
          onPress={showDatepicker} title="Escolha a data para o término" />
      </View>
      <View style={styles.datepicker_fim}>
        <Button onPress={showTimepicker} title="Escolha o horário para o término" />
      </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            format="DD/MM/YYYY"
            onChange={onChange}
          />
        )}

        <Text style={styles.text_carro}>
          Carro?
        </Text>  
        <Text style={styles.text_valor}>
          Valor Total: R$ 
        </Text>
      </View>
    </View>
      <TouchableOpacity
        style={styles.button_agendar}
        onPress={conclusaoAgendamento}
        >
        <Text style={styles.text_agendar}>CONFIRMAR</Text>
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
    paddingTop: 10,
    color: '#005E80',
  },

  text_card: {
    fontSize: 18,
    fontFamily: 'montserrat-negrito',
    textAlign: 'center',    
    height: 60,
  },

  text_information: {
    fontSize: 20,
    fontFamily: 'montserrat-regular-texto',
    textAlign: 'center',
    color: '#005E80',
    letterSpacing: 1,
    marginTop: 5,
  },

  text_information_fim: {
    fontSize: 20,
    fontFamily: 'montserrat-regular-texto',
    textAlign: 'center',
    color: '#005E80',
    letterSpacing: 1,
  },

  text_nome: {
    fontSize: 18,
    fontFamily: 'montserrat-regular-texto',
    textAlign: 'center',
    color: 'black',
    letterSpacing: 1,
    marginBottom: 10,
  },

  text_profissional: {
    fontSize: 21,
    fontFamily: 'montserrat-negrito',
    textAlign: 'center',
    color: '#005E80',
    letterSpacing: 1,
    marginBottom: 10,
  },

  text_carro: {
    fontSize: 20,
    fontFamily: 'montserrat-regular-texto',
    marginLeft: 50,
    color: '#005E80',
    letterSpacing: 1,
    marginTop: 10,
  },

  text_valor: {
    fontSize: 20,
    fontFamily: 'montserrat-negrito',
    marginLeft: 20,
    color: 'black',
    letterSpacing: 1,
    marginTop: 15,
  },

  container_card: {
    backgroundColor: "#fff",
    height: 540,
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

image_fim: {
  width: 35,
  height: 35,
  marginLeft: 180,
  marginVertical: -30,
},

text_agendar: {
  fontSize: 18,
  fontFamily: 'montserrat-regular-texto',
  textAlign: "center",
  color: '#005E80',
  letterSpacing: 1,
  marginTop: 10,
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

datepicker: {
  width: 260,
  marginTop: 30,
  marginBottom: 10,
  alignSelf: "center",
},

datepicker_fim: {
  width: 280,
  marginBottom: 10,
  alignSelf: "center",
},

});

export default ConfirmacaoAgendamento;