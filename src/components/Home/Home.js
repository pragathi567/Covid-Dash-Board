import React, { Component } from 'react'
import Header from '../Header/Header'
import './Home.css'
import SearchBar from '../SearchBar/SearchBar'
import IndiaStats from '../IndiaStats/IndiaStats'
const statesList = [
  {
    stateCode: 'AN',
    stateName: 'Andaman and Nicobar Islands',
  },
  {
    stateCode: 'AP',
    stateName: 'Andhra Pradesh',
  },
  {
    stateCode: 'AR',
    stateName: 'Arunachal Pradesh',
  },
  {
    stateCode: 'AS',
    stateName: 'Assam',
  },
  {
    stateCode: 'BR',
    stateName: 'Bihar',
  },
  {
    stateCode: 'CH',
    stateName: 'Chandigarh',
  },
  {
    stateCode: 'CT',
    stateName: 'Chhattisgarh',
  },
  {
    stateCode: 'DN',
    stateName: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    stateCode: 'DL',
    stateName: 'Delhi',
  },
  {
    stateCode: 'GA',
    stateName: 'Goa',
  },
  {
    stateCode: 'GJ',
    stateName: 'Gujarat',
  },
  {
    stateCode: 'HR',
    stateName: 'Haryana',
  },
  {
    stateCode: 'HP',
    stateName: 'Himachal Pradesh',
  },
  {
    stateCode: 'JK',
    stateName: 'Jammu and Kashmir',
  },
  {
    stateCode: 'JH',
    stateName: 'Jharkhand',
  },
  {
    stateCode: 'KA',
    stateName: 'Karnataka',
  },
  {
    stateCode: 'KL',
    stateName: 'Kerala',
  },
  {
    stateCode: 'LA',
    stateName: 'Ladakh',
  },
  {
    stateCode: 'LD',
    stateName: 'Lakshadweep',
  },
  {
    stateCode: 'MH',
    stateName: 'Maharashtra',
  },
  {
    stateCode: 'MP',
    stateName: 'Madhya Pradesh',
  },
  {
    stateCode: 'MN',
    stateName: 'Manipur',
  },
  {
    stateCode: 'ML',
    stateName: 'Meghalaya',
  },
  {
    stateCode: 'MZ',
    stateName: 'Mizoram',
  },
  {
    stateCode: 'NL',
    stateName: 'Nagaland',
  },
  {
    stateCode: 'OR',
    stateName: 'Odisha',
  },
  {
    stateCode: 'PY',
    stateName: 'Puducherry',
  },
  {
    stateCode: 'PB',
    stateName: 'Punjab',
  },
  {
    stateCode: 'RJ',
    stateName: 'Rajasthan',
  },
  {
    stateCode: 'SK',
    stateName: 'Sikkim',
  },
  {
    stateCode: 'TN',
    stateName: 'Tamil Nadu',
  },
  {
    stateCode: 'TG',
    stateName: 'Telangana',
  },
  {
    stateCode: 'TR',
    stateName: 'Tripura',
  },
  {
    stateCode: 'UP',
    stateName: 'Uttar Pradesh',
  },
  {
    stateCode: 'UT',
    stateName: 'Uttarakhand',
  },
  {
    stateCode: 'WB',
    stateName: 'West Bengal',
  },
]
class Home extends Component {
  state={
    covidData : [],
    isLoading : true,
    searchInput : ''
  }
  componentDidMount(){
    this.getCovidData()
  }
  getCovidData = async() =>{
    const url = 'https://apis.ccbp.in/covid19-state-wise-data';
    const options = {
      method : 'GET'
    }
    const response = await fetch(url,options)
    const data = response.json()
    //console.log(data)
    this.setState({covidData:data,isLoading:false})
  }
  onChangeSearchInput = event =>{
    this.setState({searchInput: event.target.value})
  }
  renderHome = () => {
    const {searchInput,covidData} = this.state
    if(searchInput === ''){
      return (
        <>
        <SearchBar value={searchInput} onChangeSearchInput={this.onChangeSearchInput}/>
        <IndiaStats covidData={covidData} statesList={statesList}/>
        </>
      )
    }
  }
  render() {
    return (
     <>
      <Header/>
      <main className='home-container'>
          {this.renderHome()}
      </main>
     </>
    )
  }
}

export default Home