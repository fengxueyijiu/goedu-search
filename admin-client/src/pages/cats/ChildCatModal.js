import React, { Component } from 'react'
import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Select from 'antd/lib/select'
import Button from 'antd/lib/button'
import { connect } from 'react-redux'
import { addCourseCat } from '../../redux/actions/courseCat'

const FormItem = Form.Item
const Option =  Select.Option

class ChildCatModal extends Component {
  state = {
    visible: false,
    cat: '',
    parent: '',
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
      parent: this.state.parent,
    }

    this.props.addCourseCat(data).then(() => {
      this.setState({cat: '', visible: false, parent: '', confirmLoading: false})
    })
  }

  handleNameChange = (e) => {
    this.setState({cat: e.target.value})
  }

  handleParentCat = (value) => {
    this.setState({parent: value})
  }

  optionList = (options) => {
    return options.map((cat, i) => {
      return <Option value={cat.name} key={i}>{cat.name}</Option>
    })
  }

  render = () => {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>添加子类</Button>
        <Modal title='添加子类'
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        >
          <FormItem>
            <Select
              value={this.state.parent}
              style={{ width: 200, marginBottom: 30 }}
              placeholder='请先选择父类'
              onChange={this.handleParentCat}
            >
              {this.optionList(this.props.parents)}
            </Select>
            <Input placeholder='分类名称' value={this.state.cat} onChange={this.handleNameChange} />
          </FormItem>
        </Modal>
      </div>
    )
  }
}

export default connect(null, {addCourseCat})(ChildCatModal)
