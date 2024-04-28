import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import {BiChevronRightSquare} from 'react-icons/bi'
import Header from '../Header/Header'
import TotalStateDetails from '../TotalStateDetails/TotalStateDetails'
import Footer from '../Footer/Footer'
import { Loading } from '../Loading/Loading'
import './Home.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]
class Home extends Component {
  state = {
    isLoading: true,
    totalActiveCases: 0,
    totalConfirmedCases: 0,
    totalRecoveredCases: 0,
    totalDeceasedCases: 0,
    statesInfo: [],
    search: '',
    filteredSearchList: [],
  }

  componentDidMount() {
    this.getTotalData()
  }

  getTotalData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      let nationalWideConfirmedCases = 0
      let nationalWideRecoveredCases = 0
      let nationalWideDeceasedCases = 0
      let nationalWideActiveCases = 0

      statesList.forEach(state => {
        if (data[state.state_code]) {
          const {total} = data[state.state_code]
          nationalWideConfirmedCases += total.confirmed ? total.confirmed : 0
          nationalWideRecoveredCases += total.recovered ? total.recovered : 0
          nationalWideDeceasedCases += total.deceased ? total.deceased : 0
        }
      })
      nationalWideActiveCases +=
        nationalWideConfirmedCases -
        (nationalWideRecoveredCases + nationalWideDeceasedCases)

      const states = statesList.map(each => ({
        stateName: each.state_name,
        stateCode: each.state_code,
        confirmed: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.confirmed),
        recovered: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.recovered),
        deceased: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.deceased),
        active: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.active),
        other: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].total.other),
        population: Object.keys(data)
          .filter(state => state === each.state_code)
          .map(e => data[e].meta.population),
      }))

      this.setState({
        totalActiveCases: nationalWideActiveCases,
        totalRecoveredCases: nationalWideRecoveredCases,
        totalDeceasedCases: nationalWideDeceasedCases,
        totalConfirmedCases: nationalWideConfirmedCases,
        isLoading: false,
        statesInfo: states,
      })
    }
  }

  getSearchResult = event => {
    const searchItem = event.target.value
    const searchResult = statesList.filter(data =>
      data.state_name.toLowerCase().includes(searchItem.toLowerCase()),
    )

    return this.setState({
      search: event.target.value,
      filteredSearchList: searchResult,
    })
  }

  showSearchList = () => {
    const {filteredSearchList} = this.state
    console.log(filteredSearchList)
    return (
      <ul className="filter-ui">
        {filteredSearchList.map(each => (
          <li className="filtered-search-li">
            <p className="each-state-name">{each.state_name}</p>
            <Link className="link-home" to={`/state/${each.state_code}`}>
              <button type="button" className="search-btn">
                <p>{each.state_code}</p>
                <BiChevronRightSquare />
              </button>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  getSearchBar = () => {
    const {filteredSearchList, search} = this.state
    const showSearchList =
      filteredSearchList.length === 0 ? '' : this.showSearchList()
    return (
      <div className="search-div">
        <div className="search-di">
          <BsSearch className="search-icon" />
          <input
            type="search"
            placeholder="Enter the State"
            className="search-input"
            onChange={this.getSearchResult}
          />
        </div>
        {search.length > 0 ? showSearchList : ''}
      </div>
    )
  }

  getTotalNational = () => {
    const {
      totalActiveCases,
      totalConfirmedCases,
      totalDeceasedCases,
      totalRecoveredCases,
    } = this.state
    return (
      <div className="stats-container">
      <div className="confirmed card">
        <p className="stats-type confirmed-cases">Confirmed</p>
        <img
          className='image'
          src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1654438432/Covid19%20Dashboard/check-mark_1_odg0vn.png"
          alt="country wide confirmed cases pic"
        />
        <p className="confirmed-cases cases">{totalConfirmedCases}</p>
      </div>
      <div className="active card">
        <p className="stats-type active-cases">
          Active
        </p>
        <img
          className='image'
          src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1654438417/Covid19%20Dashboard/protection_1_zjqmhw.png"
          alt="country wide active cases pic"
        />
        <p className="active-cases cases">{totalActiveCases}</p>
      </div>
      <div className="recovered card">
        <p
          className="stats-type recovered-cases"
        >
          Recovered
        </p>
        <img
          className='image'
          src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1654438418/Covid19%20Dashboard/recovered_1_qmgv0f.png"
          alt="country wide recovered cases pic"
        />
        <p className="recovered-cases cases">{totalRecoveredCases}</p>
      </div>
      <div className="deceased card">
        <p
          className="stats-type deceased-cases"
        >
          Deceased
        </p>
        <img
          className='image'
          src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1654438420/Covid19%20Dashboard/breathing_1_ctu4mw.png"
          alt="country wide deceased cases pic"
        />
        <p className="deceased-cases cases">{totalDeceasedCases}</p>
      </div>
    </div>
    )
  }

  decClick = () => {
    const {statesInfo} = this.state
    const sortedList = statesInfo.sort((a, b) => {
      const x = a.stateName.toUpperCase()
      const y = b.stateName.toUpperCase()
      return x > y ? 1 : -1
    })
    this.setState({statesInfo: sortedList})
  }

  incClick = () => {
    const {statesInfo} = this.state
    const sortedList = statesInfo.sort((a, b) => {
      const x = a.stateName.toUpperCase()
      const y = b.stateName.toUpperCase()
      return x < y ? 1 : -1
    })
    this.setState({statesInfo: sortedList})
  }

  getTotalStateWise = () => {
    const {statesInfo} = this.state
    return (
      <div className="din">
        <div className="states-table">
          <div className="table-div">
            <div className="table-names">
            <button
                className="order-btn"
                type="button"
                onClick={this.decClick}
              >
                <FcGenericSortingAsc className="order-icon" />
              </button>
              <p className='ut'>States/UT</p>
              <button
                className="order-btn"
                type="button"
                onClick={this.incClick}
              >
                <FcGenericSortingDesc className="order-icon" />
              </button>
            </div>
            <div className="table-para">
              <p>Confirmed</p>
            </div>
            <div className="table-para">
              <p>Active</p>
            </div>
            <div className="table-para">
              <p>Recovered</p>
            </div>
            <div className="table-para">
              <p>Deceased</p>
            </div>
            <div className="table-para">
              <p>Population</p>
            </div>
          </div>
          <hr />
          <ul className="state">
            {statesInfo.map(each => (
              <TotalStateDetails key={each.stateCode} details={each} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
  renderHomeDetails = () =>{
    return(
      <>
       {this.getSearchBar()}
       {this.getTotalNational()}
       { this.getTotalStateWise()}
       <Footer/>
      </>
    )
    
  }
  render() {
    const {isLoading, statesInfo} = this.state
    console.log(isLoading)
    console.log(statesInfo)
    return (
      <>
        <Header/>
        <div className='home-container'>
           {isLoading ? <Loading/> : this.renderHomeDetails()}
        </div>
      </>
    )
  }
}
export default Home