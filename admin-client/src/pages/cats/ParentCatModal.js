import React, { Component } from 'react'
import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import { connect } from 'react-redux'
import { addCourseCat } from '../../redux/actions/courseCat'

const FormItem = Form.Item

class ParentCatModal extends Component {
  state = {
    visible: false,
    cat: '',
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  handleOk = (e) => {
    this.setState({
      confirmLoading: true,
    })
    const data = {
      cat: this.state.cat,
      parent: this.props.group,
    }

    this.props.addCourseCat(data).then(() => {
      this.setState({cat: '', visible: false, confirmLoading: false})
    })
  }

  handleNameChange = (e) => {
    this.setState({cat: e.target.value})
  }

  render = () => {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>添加父类</Button>
        <Modal title={`${this.props.group}组父类`}
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        >
          <FormItem>
            <Input placeholder='分类名称' value={this.state.cat} onChange={this.handleNameChange} />
          </FormItem>
        </Modal>
      </div>
    )
  }
}

export default connect(null, {addCourseCat})(ParentCatModal)
