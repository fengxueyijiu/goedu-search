import React from 'react'
import Sidebar from './sidebar/Sidebar'
import { Route, Switch } from 'react-router-dom'

import Schools from './schools/Schools'
import HotSchools from './schools/HotSchools'
import StarSchools from './schools/StarSchools'
import School from './school/School'
import CourseCats from './cats/CourseCats'
import './dashboard.css'

import Courses from './courses/Courses'
import HotCourses from './courses/HotCourses'
import Course from './course/Course'

import Advices from './advices/Advices'

import Shops from './shops/Shops'
import Shop from './shop/Shop'
import HotGoods from './goods/HotGoods'
import SingleGoods from './goods/SingleGoods'
import GoodsCats from './cats/GoodsCats'

import Activities from './activities/Activities'


const Dashboard = ({match, history}) => (
  <div className='dashboard'>
    <Sidebar selectedIndex={history.location.pathname}/>
    <div className='main'>
      <div className='top-header'></div>
      <div className='content'>
        <Switch>
          <Route exact path={`${match.url}`} component={Schools} />
          <Route path={`${match.url}/schools/hot`} component={HotSchools} />
          <Route path={`${match.url}/schools/star`} component={StarSchools} />
          <Route path={`${match.url}/schools/:schoolId`} component={School} />
          <Route exact path={`${match.url}/courses`} component={Courses} />
          <Route path={`${match.url}/courses/hot`} component={HotCourses} />
          <Route path={`${match.url}/courses/cats`} component={CourseCats} />
          <Route path={`${match.url}/courses/:courseId`} component={Course} />
          <Route exact path={`${match.url}/advices`} component={Advices} />
          <Route exact path={`${match.url}/shops`} component={Shops} />
          <Route path={`${match.url}/shops/:shopId`} component={Shop} />
          <Route path={`${match.url}/goods/hot`} component={HotGoods} />
          <Route path={`${match.url}/goods/cats`} component={GoodsCats} />
          <Route path={`${match.url}/goods/:goodsId`} component={SingleGoods} />
          <Route exact path={`${match.url}/activities`} component={Activities} />
        </Switch>
      </div>
    </div>
  </div>
)

export default Dashboard
