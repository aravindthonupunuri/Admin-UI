import {Component} from 'react'
import './index.css'

import {MdEdit, MdDelete} from 'react-icons/md'
import {BiSave} from 'react-icons/bi'

class AdminItem extends Component {
  state = {
    editMode: false,
    newName: '',
    newEmail: '',
    newRole: '',
  }

  componentDidMount() {
    const {admin} = this.props
    this.setState({
      newEmail: admin.email,
      newName: admin.name,
      newRole: admin.role,
    })
  }

  onDelete = () => {
    const {admin, deleteUser} = this.props
    deleteUser(admin.id)
  }

  name = event => {
    const {value} = event.target
    this.setState({newName: value})
  }

  email = event => {
    const {value} = event.target
    this.setState({newEmail: value})
  }

  role = event => {
    const {value} = event.target
    this.setState({newRole: value})
  }

  render() {
    const {admin, toggleSelection,changeUserDetails} = this.props
    const {editMode, newName, newEmail, newRole} = this.state
    return (
      <div className="admin-item-container">
        <input
          className="checkbox-item"
          type="checkbox"
          onChange={() => {
            toggleSelection(admin.id)
          }}
          checked={admin.selected || false}
        />
        {editMode ? (
          <input type="text" value = {newName} className="input" onChange={this.name} />
        ) : (
          <p className="admin-name">{newName}</p>
        )}

        {editMode ? (
          <input type="text" value = {newEmail} className="input" onChange={this.email} />
        ) : (
          <p className="admin-email">{newEmail}</p>
        )}
        {editMode ? (
          <input type="text" value = {newRole} className="input" onChange={this.role} />
        ) : (
          <p className="admin-role">{newRole}</p>
        )}
        <div className="action-items">
          {editMode ? (
            <BiSave
              className="edit"
              onClick={() => {
                this.setState({editMode: !editMode})
                changeUserDetails(newName,newEmail,newRole,admin.id)
              }}
            />
          ) : (
            <MdEdit
              className="edit"
              onClick={() => {
                this.setState({editMode: !editMode})
              }}
            />
          )}

          <MdDelete className="delete" key={admin.id} onClick={this.onDelete} />
        </div>
      </div>
    )
  }
}

export default AdminItem
