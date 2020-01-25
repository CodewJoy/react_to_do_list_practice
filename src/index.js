/* eslint-disable prefer-const */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable no-useless-return */
/* eslint-disable react/prop-types */
/* eslint-disable lines-between-class-members */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable indent */
/* eslint-disable react/no-unknown-property */
import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import './img/close.svg'

class CompleteStatus extends React.Component {
  constructor (props) {
    super(props)
    this.ChangeToAll = this.ChangeToAll.bind(this)
    this.ChangeToActive = this.ChangeToActive.bind(this)
    this.ChangeToCompleted = this.ChangeToCompleted.bind(this)
  }

  ChangeToAll () {
    this.props.StatusChosen('all')
    console.log(this.props)
  }

  ChangeToActive () {
    this.props.StatusChosen('active')
    console.log(this.props)
  }

  ChangeToCompleted () {
    this.props.StatusChosen('completed')
    console.log(this.props)
  }

  render () {
    return (
      <div className="complete-status">
        <button onClick={this.ChangeToAll}>All</button>
        <button onClick={this.ChangeToActive}>Active</button>
        <button onClick={this.ChangeToCompleted}>Completed</button>
      </div>
    )
  }
}

class List extends React.Component {
  constructor (props) {
    super(props)
    // this.state = { items: [], text: '' }
    this.HandleClick = this.HandleClick.bind(this)
    this.ClicktoClose = this.ClicktoClose.bind(this)
  }

  HandleClick (event) {
    // console.log(this.props)
    // console.log(this.props.items)
    // console.log(event.target.checked)
    this.props.CompleteStatus(event.target.id)
  }

  ClicktoClose (event) {
    this.props.CloseItem(event.target.id)
  }

  render () {
    let items = this.props.items
    let newItem = []
    console.log(this.props)
    if (this.props.status === 'completed') {
      console.log('completed ya')
      for (let i = 0; i < this.props.items.length; i++) {
        if (items[i].completed === true) {
          newItem.push(items[i])
        }
      }
      console.log(items)
      console.log(newItem)
    } else if (this.props.status === 'active') {
      console.log('active ya')
      console.log(this.props.items)
      for (let i = 0; i < this.props.items.length; i++) {
        if (items[i].completed === false) {
          newItem.push(items[i])
        }
      }
      console.log(items)
      console.log(newItem)
    } else {
      console.log('all ya')
      newItem = this.props.items
      console.log(newItem)
    }
    return (
      <form className="to-do-list">
        {newItem.map(newItem => (
          <label className="to-do-item" key={newItem.id}>
            <span>{newItem.text}</span>
            <input type="checkbox" checked={newItem.completed} onChange={this.HandleClick} id={newItem.id}/>
            <span className="checkmark"></span>
            <div className="close" onClick={this.ClicktoClose} id={newItem.id}></div>
          </label>
        ))}
      </form>
    )
  }
}

class ToDoApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = { items: [], text: '', status: 'all', itemsSelect: [] }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({ text: event.target.value })
  }

  handleSubmit (event) {
    console.log(this.state.text)
    // 如果事件可以被取消，就取消事件（即取消事件的預設行為）。不會影響事件傳遞
    event.preventDefault()
    if (this.state.text.length === 0) {
      return
    }
    const newItem = {
      text: this.state.text,
      id: Date.now(),
      completed: false
    }
    console.log(newItem)
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }))
  }
  CompleteStatus (id) {
    for (let i = 0; i < this.state.items.length; i++) {
      if (id === String(this.state.items[i].id)) {
        this.setState((prevState) => {
          const checkedItem = prevState.items[i]
          checkedItem.completed = checkedItem.completed === true ? false : true
          return { items: prevState.items }
        })
      }
    }
    console.log(this.state)
  }

  CloseItem (id) {
    for (let i = 0; i < this.state.items.length; i++) {
      if (id === String(this.state.items[i].id)) {
        this.setState((prevState) => {
          const closeItem = prevState.items
          return closeItem.splice(i, 1)
        })
      }
    }
    console.log(this.state)
  }

  StatusChosen (statusChosen) {
    console.log(statusChosen)
    if (statusChosen === 'active') {
      this.setState({ status: 'active' }, () => {
        console.log(this.state.status)
      })
    } else if (statusChosen === 'completed') {
      this.setState({ status: 'completed' }, () => {
        console.log(this.state.status)
      })
    } else {
      this.setState({ status: 'all' }, () => {
        console.log(this.state.status)
      })
    }
  }

  render () {
    return (
      <div className="to-dos">
        <h1>To Dos</h1>
        <List
          items = {this.state.items}
          status = {this.state.status}
          CompleteStatus = {this.CompleteStatus.bind(this)}
          CloseItem = {this.CloseItem.bind(this)}
        />
        <div className="content">
          <input type="text" className="key-in" value={this.state.text} onChange={this.handleChange} />
          <button onClick={this.handleSubmit}>Enter</button>
        </div>
        <CompleteStatus
          // no need to pass items & status, in case you want to check items & status value
          // items={this.state.items}
          // status={this.state.status}
          StatusChosen = {this.StatusChosen.bind(this)}
        />
      </div>
    )
  }
}

ReactDOM.render(<ToDoApp />, document.querySelector('#root'))
