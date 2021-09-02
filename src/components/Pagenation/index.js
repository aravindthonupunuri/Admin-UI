import {Component} from 'react'
import ReactPaginate from 'react-paginate'
// import CheckBox from '../Checkbox';

import './index.css'
import AdminItem from '../AdminItem'

export default class Pagenation extends Component {
  state = {
    offset: 0,
    perPage: 10,
  }

  handlePageClick = e => {
    const selectedPage = e.selected
    const {perPage} = this.state
    const {setCurrentPage} = this.props
    const offset = selectedPage * perPage

    this.setState(
      {
        offset,
      },
      () => {
        setCurrentPage(selectedPage)
      },
    )
  }

  render() {
    const {offset, perPage} = this.state
    const {adminData, deleteUser, toggleSelection,changeUserDetails} = this.props
    const slice = adminData.slice(offset, offset + perPage)

    const postData = slice.map(pd => (
      <AdminItem
        key={pd.id}
        admin={pd}
        deleteUser={deleteUser}
        toggleSelection={toggleSelection}
        changeUserDetails = {changeUserDetails}
      />
    ))
    return (
      <div>
        {postData}
        <ReactPaginate
          previousLabel="prev"
          nextLabel="next"
          pageCount={Math.ceil(adminData.length / perPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName="pagination"
          previousLinkClassName="pagination__link"
          nextLinkClassName="pagination__link"
          activeClassName="pagination__link--active"
        />
      </div>
    )
  }
}
