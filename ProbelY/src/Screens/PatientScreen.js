import React, {Component} from 'react';
import {Text, StyleSheet, View, FlatList} from 'react-native';
import PatientBanner from '../Components/PatientBanner';
import DropDownPicker from 'react-native-dropdown-picker';


export default class PatientScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    patients: [],
    patientsDetail: [],
    isLoading: true,
    pickerValue: 'Tüm',
  };
  getPatientsWithId = () => {
    fetch(
      `http://192.168.1.38:3000/patients/serviceId/${this.props.route.params.id}`,
    )
      .then(response => response.json())
      .then(data => {
        // console.log('Data******' + JSON.stringify(data));
        this.setState({
          patients: data,
          isLoading: false,
        });
        //  console.log("Son state dsd++" + this.state.patients);
      }).catch(err=>{
        alert(err);
      });
  };



  getPatientsWithdoktorId = () => {
    fetch(
      `http://192.168.1.38:3000/patients/doktorId/${this.props.route.params.drId}/${this.props.route.params.id}`,
    )
      .then(response => response.json())
      .then(data => {
        // console.log('Data******' + JSON.stringify(data));
        this.setState({
          patients: data,
          isLoading: false,
        });
        // console.log("Son state ++" + this.state.data);  
      }).catch(err=>{
        console.log("Hata"+err);
        alert(err);
      });
  };

  componentDidMount() {
    console.log(JSON.stringify(this.props));
    this.getPatientsWithId();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.pickerValue !== this.state.pickerValue) {
      if (this.state.pickerValue == 'Dr') {
        this.getPatientsWithdoktorId();
      } else {
        this.getPatientsWithId();
      }
    }
  }

  render() {
    let list;
      list = (
        <FlatList
          data={this.state.patients}
          renderItem={({item}) => (
            <PatientBanner
              ad={item[3]}
              soyad={item[4]}
              ptNo={item[1]}
              age={item[7]}
              patientS={item[5]}
              rNo={item[8]}
              weight={item[6]}
              dr={item[2]}
              yatisId={item[9]}
              heat={item.patientSıcaklık}
              hb={item.patientHB}
              lung={item.patientLung}
              picture={
                'https://www.bhsu.edu/directory/_files/images/no-image-directory.png'
              }></PatientBanner>
          )}
          keyExtractor={item => item[0]}></FlatList>
      );
    
  
    
    return (
      <View>
        <DropDownPicker
          items={[
            {label: 'Kendi Hastalarım', value: 'Dr'},
            {label: 'Servis Hastaları', value: 'Tüm'},
          ]}
          defaultValue={this.state.pickerValue}
          containerStyle={{height: 40,margin:5}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={item =>
            this.setState({
              pickerValue: item.value,
            })
          }
        />
        {list}
      </View>
    );
  }
}

const styles = StyleSheet.create({});
