import React from 'react';
import { Switch } from 'react-router-dom';
import User from "../../views/user/index";
import Add from "../../views/user/add";
import Bmadd from "../../views/bmgl/bmadd";
import BmList from "../../views/bmgl/bmlist";
import zwadd from "../../views/zwgl/zwadd";
import zwList from "../../views/zwgl/zwlist";
import PrivateRouter from '../privateRouter/index';


class ContainerMain extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
          <Switch>
            <PrivateRouter exact path="/index/user/list" component={User} />
            <PrivateRouter exact path="/index/user/add" component={Add} />
            <PrivateRouter exact path="/index/bmgl/bmlist" component={BmList} />
            <PrivateRouter exact path="/index/bmgl/bmadd" component={Bmadd} />
            <PrivateRouter exact path="/index/zwgl/zwlist" component={zwList} />
            <PrivateRouter exact path="/index/zwgl/zwadd" component={zwadd} />
          </Switch>
      </div>

    );
  }
}


export default ContainerMain;
