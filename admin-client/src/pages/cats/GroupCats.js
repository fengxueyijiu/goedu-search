import React, { Component } from 'react'

import CourseCat from './CourseCat'
import ParentCatModal from './ParentCatModal'
import ChildCatModal from './ChildCatModal'

class GroupCats extends Component {
  getParentList = () => {
    return this.props.cats.filter(el => el.ancestors.length === 1)
  }

  getChildList = (parent) => {
    return this.props.cats.filter(cat => {
      return cat.ancestors.length !== 0 && cat.ancestors[0].name === parent
    }).map(cat => {
      return <CourseCat category={cat} key={cat._id} />
    })
  }

  getCatList = () => {
    if(this.props.group === '幼教') {
      const catList = this.getParentList().map(cat => {
        return <CourseCat category={cat} key={cat._id} />
      })
      return <div className='cat-list'>{catList}</div>
    } else {
      return this.getParentList().map((p, i) => {
        return (
          <div key={i}>
            <div className='parent'><div className='wrapper'><CourseCat category={p} key={p._id} /></div></div>
            <div className='cat-list'>{this.getChildList(p.name)}</div>
          </div>
        )
      })
    }
  }

  render = () => {
    return (
      <div className='white-block'>
        <div className='title'>{this.props.group}</div>
        {this.getCatList()}
        <div className='modals'>
          <ParentCatModal group={this.props.group} />
          {this.props.group !== '幼教' ? <ChildCatModal parents={this.getParentList(this.props.group)} /> : ''}
        </div>
      </div>
    )
  }
}

export default GroupCats
