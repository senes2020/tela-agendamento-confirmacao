import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import FloatingLabelInput from './tools/FloatingLabelInputBlue';
import { parseISO, format } from "date-fns";
import { TextInput } from "react-native-gesture-handler";

class DateCal extends Component {
  statetime = {
    yourValue: '',
  };
 
  constructor(props) {
    super();
    this.state = {
      data: new Date("2020/06/29"),
      confirmDisabled: true,
      showDatePicker: true,
    };
    this.isIos = Platform.OS === "ios";
  }
  validado = () => {
    const { data } = this.state;
    if (!data) {
      Alert.alert("Ops...", "Preencha a data");
      return false;
    }
    return true;
  };
  validarData = async () => {
    if (!this.validado()) return;
    let aluno = this.props.navigation.getParam("aluno");
    const { data } = this.state;
    try {
      const response = await validarDataNascimento(
        aluno.cpf,
        format(data, "yyyy-MM-dd")
      );
      if (!response.ok)
        return Alert.alert("Ops...", "Data de nascimento incorreta");
      const retornoApi = await response.json();
      aluno.nome = retornoApi.aluno.nome;
      this.props.navigation.navigate("DefinirSenha", { aluno: aluno });
    } catch (e) {
      console.log(e);
    }
  };
  handlerData = (e, dataSel) => {
    if (dataSel) {
      const formatedData = format(dataSel, "dd/MM/yyyy");
      console.log(formatedData);
      this.setState({
        showDatePicker: this.isIos ? true : false,
        data: dataSel,
        confirmDisabled: false,
      });
    }
    console.log(dataSel);
  };
  render() {
    const { showDatePicker } = this.state;
    const { navigation } = this.props;
    return (
      <KeyboardAvoidingView
        behavior={this.isIos ? "padding" : "height"}
        enabled
      >
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => navigation.pop(1)}
            >
              <Icon name={"close"} size={30} color="#FFF" />
            </TouchableOpacity>
            <Text>
              Ok, só para termos certeza que é você
            </Text>
            <Text>
              Selecione sua data de nascimento:
            </Text>
            {!this.isIos && (
              <TouchableOpacity
                style={{ flexDirection: "row", marginTop: 16 }}
                onPress={() => {
                  this.setState({ showDatePicker: true });
                }}
              >
                <Icon
                  style={{ alignSelf: "center" }}
                  name={"calendar"}
                  size={30}
                  color="#FFF"
                />
              </TouchableOpacity>
            )}
             <View />
            {showDatePicker && (
             
               <DateTimePicker
                style={{ width: "100%", color: "#FFF" }}
                textColor="#FFFFFF"
                value={this.state.data}
                locale="pt-BR"
                mode="date"
                is24Hour={true}
                display="spinner"
                onChange={this.handlerData}
               />
            )}
            <Text onPress={() => {
                this.setState({ showDatePicker: true });
              }}
            >
              {format(this.state.data, "dd/MM/yyyy")}
            </Text>
            <TouchableOpacity
              text="Continuar"
              disabled={this.state.confirmDisabled}
              onPress={this.validarData}
              msgDisabled="Por favor, preencha a data"
            />
            <TextInput
               underlineColorAndroid = "transparent"
               placeholder = "Digite um horário para início"
               placeholderTextColor = "#fff"
               autoCapitalize = "none">
            </TextInput>

            <TextInput
               underlineColorAndroid = "transparent"
               placeholder = "Digite um horário para término"
               placeholderTextColor = "#fff"
               autoCapitalize = "none">
            </TextInput>
          </View>
      </KeyboardAvoidingView>
    );
  }
}

//Estilização
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#005E80',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default DateCal;