import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCourseCats } from '../../redux/actions/courseCat'
import './cats.css'
import GroupCats from './GroupCats'

class CourseCats extends Component {
  componentWillMount = () => {
    if(this.props.getCourseCats.length === 0) {
      this.props.getCourseCats()
    }
  }

  groupCats = (parent) => {
    return this.props.courseCats.filter(cat => {
      return cat.ancestors.length !== 0 && (cat.ancestors.filter(el => el.name === parent).length !==0)
    })
  }

  render = () => (
    <div className='cat-page page'>
      <GroupCats cats={this.groupCats('艺术')} group='艺术' />
      <GroupCats cats={this.groupCats('文化')} group='文化' />
      <GroupCats cats={this.groupCats('幼教')} group='幼教' />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    courseCats: state.courseCats,
  }
}


export default connect(mapStateToProps, {getCourseCats})(CourseCats)
